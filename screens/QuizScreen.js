import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles from '../styles/QuizScreen.styles';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

// Builds 4 shuffled options (1 correct + up to 3 wrong) for the given card
function generateOptions(cards, currentIndex) {
  const correctAnswer = cards[currentIndex].answer;

  const otherAnswers = cards
    .filter(
      (c, idx) =>
        idx !== currentIndex &&
        c.answer.trim().toLowerCase() !== correctAnswer.trim().toLowerCase()
    )
    .map((c) => c.answer);

  const uniqueWrongAnswers = [...new Set(otherAnswers)];
  const shuffledWrong = uniqueWrongAnswers.sort(() => Math.random() - 0.5).slice(0, 3);

  const allOptions = [...shuffledWrong, correctAnswer];
  return allOptions.sort(() => Math.random() - 0.5);
}

function isMatch(a, b) {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

export default function QuizScreen({ route, navigation }) {
  const { deck, mode } = route.params; // mode: 'multiple' | 'identification'

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // multiple choice
  const [typedAnswer, setTypedAnswer] = useState(''); // identification
  const [isSubmitted, setIsSubmitted] = useState(false); // identification
  const [score, setScore] = useState(0);

  const currentCard = deck.cards[currentIndex];
  const isLastCard = currentIndex === deck.cards.length - 1;
  const progressPercent = ((currentIndex + 1) / deck.cards.length) * 100;

  const options = useMemo(
    () => (mode === 'multiple' ? generateOptions(deck.cards, currentIndex) : []),
    [currentIndex, mode]
  );

  const isAnswered = mode === 'multiple' ? selectedOption !== null : isSubmitted;
  const isCorrect =
    mode === 'multiple'
      ? isAnswered && isMatch(selectedOption, currentCard.answer)
      : isAnswered && isMatch(typedAnswer, currentCard.answer);

  function handleSelectOption(option) {
    if (isAnswered) return;
    setSelectedOption(option);
    if (isMatch(option, currentCard.answer)) {
      setScore(score + 1);
    }
  }

  function handleSubmitTyped() {
    if (isSubmitted || !typedAnswer.trim()) return;
    setIsSubmitted(true);
    if (isMatch(typedAnswer, currentCard.answer)) {
      setScore(score + 1);
    }
  }

  function handleNext() {
    if (isLastCard) {
      navigation.replace('Score', { deck, score, total: deck.cards.length, mode });
    } else {
      setSelectedOption(null);
      setTypedAnswer('');
      setIsSubmitted(false);
      setCurrentIndex(currentIndex + 1);
    }
  }

  function getOptionStyle(option) {
    if (!isAnswered) return styles.optionButton;
    const isCorrectAnswer = isMatch(option, currentCard.answer);
    const isSelected = option === selectedOption;
    if (isCorrectAnswer) return [styles.optionButton, styles.optionCorrect];
    if (isSelected) return [styles.optionButton, styles.optionIncorrect];
    return styles.optionButton;
  }

  function getOptionTextStyle(option) {
    if (!isAnswered) return styles.optionText;
    const isCorrectAnswer = isMatch(option, currentCard.answer);
    const isSelected = option === selectedOption;
    if (isCorrectAnswer) return [styles.optionText, styles.optionTextCorrect];
    if (isSelected) return [styles.optionText, styles.optionTextIncorrect];
    return styles.optionText;
  }

  function getInputStyle() {
    if (!isSubmitted) return styles.inputBox;
    return isCorrect
      ? [styles.inputBox, styles.inputBoxCorrect]
      : [styles.inputBox, styles.inputBoxIncorrect];
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.progressBarTrack}>
        <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
      </View>
      <Text style={styles.progress}>
        Question {currentIndex + 1} of {deck.cards.length}
      </Text>

      <View style={styles.questionCard}>
        <Text style={styles.questionLabel}>QUESTION</Text>
        <Text style={styles.questionText}>{currentCard.question}</Text>
      </View>

      {mode === 'multiple' ? (
        options.map((option, idx) => {
          const isCorrectAnswer = isAnswered && isMatch(option, currentCard.answer);
          const isSelected = isAnswered && option === selectedOption;

          let badgeStyle = [styles.optionLetterBadge];
          let letterTextStyle = [styles.optionLetterText];

          if (isCorrectAnswer) {
            badgeStyle.push(styles.optionLetterBadgeCorrect);
            letterTextStyle.push(styles.optionLetterTextSelected);
          } else if (isSelected) {
            badgeStyle.push(styles.optionLetterBadgeIncorrect);
            letterTextStyle.push(styles.optionLetterTextSelected);
          }

          return (
            <TouchableOpacity
              key={idx}
              style={getOptionStyle(option)}
              onPress={() => handleSelectOption(option)}
              disabled={isAnswered}
            >
              <View style={badgeStyle}>
                <Text style={letterTextStyle}>{OPTION_LETTERS[idx]}</Text>
              </View>
              <Text style={getOptionTextStyle(option)}>{option}</Text>
            </TouchableOpacity>
          );
        })
      ) : (
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

      {isAnswered && (
        <Text
          style={[
            styles.feedbackText,
            isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect,
          ]}
        >
          {isCorrect ? '✓ Correct!' : `✗ Incorrect — the answer was "${currentCard.answer}"`}
        </Text>
      )}

      {isAnswered && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {isLastCard ? 'See Results' : 'Next Question'}
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.scoreTracker}>Score so far: {score}</Text>
    </ScrollView>
  );
}