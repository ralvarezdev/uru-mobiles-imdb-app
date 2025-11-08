import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  profileCard: {
    marginHorizontal: 20,
    marginTop: -50,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarIcon: {
    fontSize: 50,
  },
  badge: {
    backgroundColor: '#e74c3c',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 15,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileName: {
    color: '#2c3e50',
    marginBottom: 5,
  },
  profileUsername: {
    color: '#95a5a6',
    marginBottom: 5,
  },
  profileEmail: {
    color: '#7f8c8d',
    marginBottom: 15,
  },
});