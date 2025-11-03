import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e74c3c',
    paddingTop: 30,
    paddingBottom: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  headerTitle: {
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: '#fff',
    opacity: 0.9,
  }
});