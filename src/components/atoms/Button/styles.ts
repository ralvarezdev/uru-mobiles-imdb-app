import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../../theme';

export const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
  },
});
