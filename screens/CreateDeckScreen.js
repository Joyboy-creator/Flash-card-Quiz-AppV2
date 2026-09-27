import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { addDeck } from '../storage/deckStorage';
import styles from '../styles/CreateDeckScreen.styles';

export default function CreateDeckScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [cards, setCards] = useState([{ id: '1', question: '', answer: '' }]);

  function handleAddCard() {
    const newCard = { id: Date.now().toString(), question: '', answer: '' };
    setCards([...cards, newCard]);
  }

  function handleCardChange(id, field, value) {
    setCards(cards.map((card) => (card.id === id ? { ...card, [field]: value } : card)));
  }

  function handleRemoveCard(id) {
    setCards(cards.filter((card) => card.id !== id));
  }

  async function handleSaveDeck() {
    if (!title.trim()) {
      Alert.alert('Missing title', 'Please give your deck a name.');
      return;
    }

    const validCards = cards.filter((c) => c.question.trim() && c.answer.trim());

    if (validCards.length === 0) {
      Alert.alert('No cards', 'Add at least one complete question/answer pair.');
      return;
    }

    const newDeck = {
      id: Date.now().toString(),
      title: title.trim(),
      cards: validCards,
      highScore: 0,
    };

    await addDeck(newDeck);
    Alert.alert('Deck saved!', `"${newDeck.title}" has been created.`);
    navigation.navigate('DeckList');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Deck Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Spanish Vocabulary"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.sectionLabel}>Cards</Text>

      {cards.map((card, index) => (
        <View key={card.id} style={styles.cardBox}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardNumber}>Card {index + 1}</Text>
            {cards.length > 1 && (
              <TouchableOpacity onPress={() => handleRemoveCard(card.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Question"
            value={card.question}
            onChangeText={(text) => handleCardChange(card.id, 'question', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Answer"
            value={card.answer}
            onChangeText={(text) => handleCardChange(card.id, 'answer', text)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
        <Text style={styles.addButtonText}>+ Add Another Card</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveDeck}>
        <Text style={styles.saveButtonText}>Save Deck</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}