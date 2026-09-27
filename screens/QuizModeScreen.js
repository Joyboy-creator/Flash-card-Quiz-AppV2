import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/QuizModeScreen.styles';

export default function QuizModeScreen({ route, navigation }) {
  const { deck } = route.params;

  function selectMode(mode) {
    navigation.navigate('Quiz', { deck, mode });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.deckTitle}>{deck.title}</Text>
      <Text style={styles.subtitle}>How do you want to be quizzed?</Text>

      <TouchableOpacity
        style={[styles.modeCard, styles.multipleChoiceCard]}
        onPress={() => selectMode('multiple')}
      >
        <Text style={styles.modeIcon}>🔘</Text>
        <Text style={styles.modeTitle}>Multiple Choice</Text>
        <Text style={styles.modeDescription}>
          Pick the correct answer from 4 options. Quick and easy.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.modeCard, styles.identificationCard]}
        onPress={() => selectMode('identification')}
      >
        <Text style={styles.modeIcon}>⌨️</Text>
        <Text style={styles.modeTitle}>Identification</Text>
        <Text style={styles.modeDescription}>
          Type the answer yourself. Tests your recall, not just recognition.
        </Text>
      </TouchableOpacity>
    </View>
  );
}