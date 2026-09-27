import AsyncStorage from '@react-native-async-storage/async-storage';

const DECKS_KEY = '@flashcard_app_decks';

// Get all decks
export async function getDecks() {
  try {
    const json = await AsyncStorage.getItem(DECKS_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Failed to load decks', e);
    return [];
  }
}

// Save the entire decks array (overwrites everything)
export async function saveDecks(decks) {
  try {
    await AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks));
  } catch (e) {
    console.error('Failed to save decks', e);
  }
}

// Add a new deck
export async function addDeck(deck) {
  const decks = await getDecks();
  const updated = [...decks, deck];
  await saveDecks(updated);
  return updated;
}

// Delete a deck by id
export async function deleteDeck(deckId) {
  const decks = await getDecks();
  const updated = decks.filter((d) => d.id !== deckId);
  await saveDecks(updated);
  return updated;
}

// Update high score for a specific deck
export async function updateHighScore(deckId, newScore) {
  const decks = await getDecks();
  const updated = decks.map((d) => {
    if (d.id === deckId) {
      const currentBest = d.highScore || 0;
      return { ...d, highScore: Math.max(currentBest, newScore) };
    }
    return d;
  });
  await saveDecks(updated);
  return updated;
}