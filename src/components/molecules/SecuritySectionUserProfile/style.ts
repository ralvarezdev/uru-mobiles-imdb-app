import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  
  icon: {
    fontSize: 20,
  },
  
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  
  securityCard: {
    backgroundColor: '#f8f9fa',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  securityInfo: {
    flex: 1,
    paddingHorizontal: 5,
  },
  
  securityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  
  securityValue: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  
  changeButton: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  
  changeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});