import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f0f2f7',
    justifyContent: 'center',
  },
  progress: {
    textAlign: 'center',
    fontSize: 13,
    color: '#888',
    marginBottom: 20,
    fontWeight: '600',
  },
  cardWrapper: {
    minHeight: 220,
    marginBottom: 28,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    minHeight: 220,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 5,
  },
  cardFace: {
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#6c9a8b',
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6c9a8b',
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  cardText: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#2c3e50',
  },
  tapHint: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 16,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  navButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    marginHorizontal: 6,
    alignItems: 'center',
    backgroundColor: '#4a6fa5',
  },
  navButtonDisabled: {
    backgroundColor: '#c7ced9',
  },
  navButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  doneButton: {
    marginTop: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#4a6fa5',
    fontWeight: '600',
    fontSize: 14,
  },
});