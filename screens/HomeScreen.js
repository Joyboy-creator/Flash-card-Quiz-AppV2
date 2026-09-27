import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/HomeScreen.styles';

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#4a6fa5', '#6c9a8b']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.iconBadge}>
          <Text style={styles.iconText}>📚</Text>
        </View>

        <Text style={styles.title}>Flashcard Quiz</Text>
        <Text style={styles.subtitle}>
          Create custom study decks, flip cards to reveal answers, and beat your high score.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DeckList')}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>📖 My Decks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('CreateDeck')}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryButtonText}>+ Create New Deck</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Tap a deck to start studying</Text>
      </View>
    </LinearGradient>
  );
}