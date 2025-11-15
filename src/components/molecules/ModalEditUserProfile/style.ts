import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
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
  },
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
  statsGrid: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 20,
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#e74c3c',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoIcon: {
    fontSize: 20,
  },
  infoLabelText: {
    color: '#7f8c8d',
  },
  infoValue: {
    fontWeight: '600',
    color: '#2c3e50',
  },
  actionButtons: {
    gap: 12,
    marginBottom: 20,
  },
  criticPromoCard: {
    backgroundColor: '#fff5f5',
    borderWidth: 2,
    borderColor: '#c0392b',
    borderRadius: 12,
    padding: 20,
  },
  criticPromoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 15,
  },
  criticPromoIcon: {
    fontSize: 40,
  },
  criticPromoText: {
    flex: 1,
  },
  criticPromoTitle: {
    color: '#2c3e50',
    marginBottom: 5,
  },
  criticPromoSubtitle: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});