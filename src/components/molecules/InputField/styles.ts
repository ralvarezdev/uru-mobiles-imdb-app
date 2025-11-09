import { spacing, colors } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    
  },
  label: {
    marginBottom: spacing.sm,
    color: colors.text.secondary,
  },
  inputContainer: {
    position: 'relative',
    gap: 1
  },
  icon: {
    position: 'absolute',
    left: spacing.md,
    top: 15,
    fontSize: 18,
    zIndex: 1,
  },
  error: {
    marginTop: spacing.xs,
    color: colors.error,
    fontSize: 12,
  },
});
