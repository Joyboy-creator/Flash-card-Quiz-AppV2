import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import DeckListScreen from './screens/DeckListScreen';
import CreateDeckScreen from './screens/CreateDeckScreen';
import QuizScreen from './screens/QuizScreen';
import ScoreScreen from './screens/ScoreScreen';
import StudyScreen from './screens/StudyScreen';
import QuizModeScreen from './screens/QuizModeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Flashcard Quiz App' }}
        />
        <Stack.Screen
          name="DeckList"
          component={DeckListScreen}
          options={{ title: 'My Decks' }}
        />
        <Stack.Screen
          name="CreateDeck"
          component={CreateDeckScreen}
          options={{ title: 'Create Deck' }}
        />
        <Stack.Screen
         name="QuizMode"
         component={QuizModeScreen}
        options={{ title: 'Choose Quiz Mode' }}
         />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: 'Quiz' }}
        />
        
        <Stack.Screen
          name="Score"
          component={ScoreScreen}
          options={{ title: 'Results' }}
        />
        <Stack.Screen
          name="Study"
          component={StudyScreen}
          options={{ title: 'Study Mode' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}