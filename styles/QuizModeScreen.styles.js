import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f0f2f7',
    justifyContent: 'center',
  },
  deckTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 36,
  },
  modeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 22,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  modeIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  modeTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 13,
    color: '#888',
    lineHeight: 18,
  },
  multipleChoiceCard: {
    borderColor: '#4a6fa5',
  },
  identificationCard: {
    borderColor: '#6c9a8b',
  },
});