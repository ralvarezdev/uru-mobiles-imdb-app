import { spacing, colors } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  message: {
    marginTop: spacing.md,
    color: colors.text.secondary,
    textAlign: 'center',
    // textAlignVertical: 'top'
  },
});
