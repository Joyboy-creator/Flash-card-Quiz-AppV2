import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getDecks, deleteDeck } from '../storage/deckStorage';
import styles from '../styles/DeckListScreen.styles';

export default function DeckListScreen({ navigation }) {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadDecks();
    }, [])
  );

  async function loadDecks() {
    setLoading(true);
    const data = await getDecks();
    setDecks(data);
    setLoading(false);
  }

  function confirmDelete(deck) {
    Alert.alert(
      'Delete Deck',
      `Are you sure you want to delete "${deck.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updated = await deleteDeck(deck.id);
            setDecks(updated);
          },
        },
      ]
    );
  }

  function renderDeck({ item }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.cardAccent} />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>
              {item.cards.length} card{item.cards.length !== 1 ? 's' : ''} · High Score: {item.highScore || 0}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => confirmDelete(item)}
          >
            <Text style={styles.deleteText}>🗑️</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => navigation.navigate('QuizMode', { deck: item })}
          >
            <Text style={styles.playButtonText}>▶ Play</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.studyButton}
            onPress={() => navigation.navigate('Study', { deck: item })}
          >
            <Text style={styles.studyButtonText}>📖 Study</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <Text>Loading decks...</Text>
      </View>
    );
  }

  if (decks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🗂️</Text>
        <Text style={styles.emptyText}>No decks yet.{'\n'}Create your first one to get started.</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateDeck')}
        >
          <Text style={styles.createButtonText}>+ Create Your First Deck</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Decks</Text>
        <Text style={styles.headerSubtitle}>
          {decks.length} deck{decks.length !== 1 ? 's' : ''} saved
        </Text>
      </View>

      <FlatList
        data={decks}
        keyExtractor={(item) => item.id}
        renderItem={renderDeck}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateDeck')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}