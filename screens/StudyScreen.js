import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import styles from '../styles/StudyScreen.styles';

export default function StudyScreen({ route, navigation }) {
  const { deck } = route.params;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const flipAnim = useRef(new Animated.Value(0)).current;

  const currentCard = deck.cards[currentIndex];
  const isFirstCard = currentIndex === 0;
  const isLastCard = currentIndex === deck.cards.length - 1;

  function handleFlip() {
    Animated.spring(flipAnim, {
      toValue: showAnswer ? 0 : 1,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setShowAnswer(!showAnswer);
  }

  function resetFlip() {
    flipAnim.setValue(0);
    setShowAnswer(false);
  }

  function handleNext() {
    if (!isLastCard) {
      resetFlip();
      setCurrentIndex(currentIndex + 1);
    }
  }

  function handlePrevious() {
    if (!isFirstCard) {
      resetFlip();
      setCurrentIndex(currentIndex - 1);
    }
  }

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = { transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }] };
  const backAnimatedStyle = { transform: [{ perspective: 1000 }, { rotateY: backInterpolate }] };

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Card {currentIndex + 1} of {deck.cards.length}
      </Text>

      <TouchableOpacity activeOpacity={0.9} onPress={handleFlip}>
        <View style={styles.cardWrapper}>
          <Animated.View style={[styles.card, styles.cardFace, frontAnimatedStyle]}>
            <Text style={styles.cardLabel}>QUESTION</Text>
            <Text style={styles.cardText}>{currentCard.question}</Text>
            <Text style={styles.tapHint}>Tap card to flip</Text>
          </Animated.View>

          <Animated.View style={[styles.card, styles.cardFace, styles.cardBack, backAnimatedStyle]}>
            <Text style={[styles.cardLabel, { color: '#fff' }]}>ANSWER</Text>
            <Text style={[styles.cardText, { color: '#fff' }]}>{currentCard.answer}</Text>
            <Text style={[styles.tapHint, { color: 'rgba(255,255,255,0.7)' }]}>Tap card to flip</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>

      <View style={styles.navRow}>
        <TouchableOpacity
          style={[styles.navButton, isFirstCard && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={isFirstCard}
        >
          <Text style={styles.navButtonText}>← Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, isLastCard && styles.navButtonDisabled]}
          onPress={handleNext}
          disabled={isLastCard}
        >
          <Text style={styles.navButtonText}>Next →</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.doneButton} onPress={() => navigation.goBack()}>
        <Text style={styles.doneButtonText}>Done Studying</Text>
      </TouchableOpacity>
    </View>
  );
}