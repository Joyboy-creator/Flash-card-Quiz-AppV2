import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles from '../styles/QuizScreen.styles';

const LETTERS = ['A', 'B', 'C', 'D'];

// Gumawa ng 4 na choices: 1 tamang sagot + 3 maling sagot mula sa ibang cards
function generateOptions(cards, currentIndex) {
  const correctAnswer = cards[currentIndex].answer;

  const wrongAnswers = [];
  for (let i = 0; i < cards.length; i++) {
    if (i !== currentIndex && cards[i].answer.toLowerCase() !== correctAnswer.toLowerCase()) {
      wrongAnswers.push(cards[i].answer);
    }
  }

  // Alisin ang duplicates, kumuha lang ng 3, tapos ihalo sa tamang sagot
  const uniqueWrong = [...new Set(wrongAnswers)].slice(0, 3);
  const allOptions = [...uniqueWrong, correctAnswer];

  // I-shuffle para random ang pagkakasunod-sunod
  return allOptions.sort(() => Math.random() - 0.5);
}

// Ito ang gamit sa pag-check kung tama ang sagot (hindi case sensitive)
function isMatch(a, b) {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

export default function QuizScreen({ route, navigation }) {
  const { deck, mode } = route.params; // mode: 'multiple' o 'identification'
  const cards = deck.cards;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState(() =>
    mode === 'multiple' ? generateOptions(cards, 0) : []
  );

  const currentCard = cards[currentIndex];
  const isLastCard = currentIndex === cards.length - 1;
  const progressPercent = ((currentIndex + 1) / cards.length) * 100;

  const isAnswered = mode === 'multiple' ? selectedOption !== null : isSubmitted;
  const userAnswer = mode === 'multiple' ? selectedOption : typedAnswer;
  const isCorrect = isAnswered && isMatch(userAnswer, currentCard.answer);

  // Multiple choice: pagpili ng sagot
  function handleSelectOption(option) {
    if (isAnswered) return;
    setSelectedOption(option);
    if (isMatch(option, currentCard.answer)) {
      setScore(score + 1);
    }
  }

  // Identification: pag-submit ng typed answer
  function handleSubmitTyped() {
    if (isSubmitted || !typedAnswer.trim()) return;
    setIsSubmitted(true);
    if (isMatch(typedAnswer, currentCard.answer)) {
      setScore(score + 1);
    }
  }

  // Pagpunta sa next question o pag-finish ng quiz
  function handleNext() {
    if (isLastCard) {
      navigation.replace('Score', { deck, score, total: cards.length, mode });
      return;
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setSelectedOption(null);
    setTypedAnswer('');
    setIsSubmitted(false);

    if (mode === 'multiple') {
      setOptions(generateOptions(cards, nextIndex));
    }
  }

  // Kinukuha ang tamang style ng bawat option (normal, tama, o mali)
  function getOptionColors(option) {
    if (!isAnswered) return { box: styles.optionButton, text: styles.optionText, badge: styles.optionLetterBadge, badgeText: styles.optionLetterText };

    const correct = isMatch(option, currentCard.answer);
    const selected = option === selectedOption;

    if (correct) {
      return {
        box: [styles.optionButton, styles.optionCorrect],
        text: [styles.optionText, styles.optionTextCorrect],
        badge: [styles.optionLetterBadge, styles.optionLetterBadgeCorrect],
        badgeText: [styles.optionLetterText, styles.optionLetterTextSelected],
      };
    }
    if (selected) {
      return {
        box: [styles.optionButton, styles.optionIncorrect],
        text: [styles.optionText, styles.optionTextIncorrect],
        badge: [styles.optionLetterBadge, styles.optionLetterBadgeIncorrect],
        badgeText: [styles.optionLetterText, styles.optionLetterTextSelected],
      };
    }
    return { box: styles.optionButton, text: styles.optionText, badge: styles.optionLetterBadge, badgeText: styles.optionLetterText };
  }

  function getInputStyle() {
    if (!isSubmitted) return styles.inputBox;
    return isCorrect
      ? [styles.inputBox, styles.inputBoxCorrect]
      : [styles.inputBox, styles.inputBoxIncorrect];
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Progress bar sa taas */}
      <View style={styles.progressBarTrack}>
        <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
      </View>
      <Text style={styles.progress}>
        Question {currentIndex + 1} of {cards.length}
      </Text>

      {/* Ang tanong */}
      <View style={styles.questionCard}>
        <Text style={styles.questionLabel}>QUESTION</Text>
        <Text style={styles.questionText}>{currentCard.question}</Text>
      </View>

      {/* Multiple choice options */}
      {mode === 'multiple' &&
        options.map((option, idx) => {
          const colors = getOptionColors(option);
          return (
            <TouchableOpacity
              key={idx}
              style={colors.box}
              onPress={() => handleSelectOption(option)}
              disabled={isAnswered}
            >
              <View style={colors.badge}>
                <Text style={colors.badgeText}>{LETTERS[idx]}</Text>
              </View>
              <View style={styles.optionTextWrapper}>
                <Text style={colors.text}>{option}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

      {/* Identification text input */}
      {mode === 'identification' && (
        <>
          <TextInput
            style={getInputStyle()}
            placeholder="Type your answer..."
            value={typedAnswer}
            onChangeText={setTypedAnswer}
            editable={!isSubmitted}
            autoCapitalize="none"
          />
          {!isSubmitted && (
            <TouchableOpacity
              style={[styles.submitButton, !typedAnswer.trim() && styles.submitButtonDisabled]}
              onPress={handleSubmitTyped}
              disabled={!typedAnswer.trim()}
            >
              <Text style={styles.submitButtonText}>Submit Answer</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {/* Feedback pagkatapos sumagot */}
      {isAnswered && (
        <Text style={[styles.feedbackText, isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect]}>
          {isCorrect ? '✓ Correct!' : `✗ Incorrect — the answer was "${currentCard.answer}"`}
        </Text>
      )}

      {/* Next Question / See Results button */}
      {isAnswered && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>{isLastCard ? 'See Results' : 'Next Question'}</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.scoreTracker}>Score so far: {score}</Text>
    </ScrollView>
  );
}