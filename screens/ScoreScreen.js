import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { updateHighScore, getDecks } from '../storage/deckStorage';
import styles from '../styles/ScoreScreen.styles';

export default function ScoreScreen({ route, navigation }) {
  const { deck, score, total, mode } = route.params;

  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [displayedHighScore, setDisplayedHighScore] = useState(deck.highScore || 0);
  const [saving, setSaving] = useState(true);

  useEffect(() => {
    saveScoreIfBetter();
  }, []);

  async function saveScoreIfBetter() {
    const previousBest = deck.highScore || 0;
    if (score > previousBest) {
      setIsNewHighScore(true);
      setDisplayedHighScore(score);
      await updateHighScore(deck.id, score);
    }
    setSaving(false);
  }

  const percentage = Math.round((score / total) * 100);

  function getMessage() {
    if (percentage === 100) return 'Perfect score! 🎉';
    if (percentage >= 80) return 'Great job! 🌟';
    if (percentage >= 50) return 'Not bad — keep practicing!';
    return "Keep studying, you'll get there!";
  }

  function getGradientColors() {
    if (percentage >= 80) return ['#27ae60', '#6c9a8b'];
    if (percentage >= 50) return ['#4a6fa5', '#6c9a8b'];
    return ['#5c6b7a', '#8a95a3'];
  }

 async function handlePlayAgain() {
  const decks = await getDecks();
  const freshDeck = decks.find((d) => d.id === deck.id) || deck;
  navigation.replace('Quiz', { deck: freshDeck, mode });
}
  function handleBackToDecks() {
    navigation.navigate('DeckList');
  }

  return (
    <LinearGradient
      colors={getGradientColors()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.deckTitle}>{deck.title}</Text>

      <View style={styles.scoreCircle}>
        <Text style={styles.scoreText}>
          {score}/{total}
        </Text>
        <Text style={styles.percentText}>{percentage}%</Text>
      </View>

      <Text style={styles.message}>{getMessage()}</Text>

      {!saving && isNewHighScore && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🏆 New High Score!</Text>
        </View>
      )}

      <Text style={styles.highScoreLabel}>
        Best Score: {displayedHighScore}/{total}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handlePlayAgain}>
        <Text style={styles.buttonText}>Play Again</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleBackToDecks}>
        <Text style={styles.secondaryButtonText}>Back to My Decks</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}