import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    fontSize: 80,
  },
  mainText: {
    fontSize: 15,
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
  benefitsList: {
    backgroundColor: '#fff5f5',
    borderLeftWidth: 4,
    borderLeftColor: '#c0392b',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkmark: {
    fontSize: 16,
    marginRight: 10,
    marginTop: 2,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
  },
  footerText: {
    fontSize: 13,
    color: '#7f8c8d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});