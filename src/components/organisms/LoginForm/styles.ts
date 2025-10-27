import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  welcomeText: {
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  registerText: {
    textAlign: 'center',
    marginTop: spacing.lg,
    color: colors.text.secondary,
    fontSize: 14,
  },
  registerLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});
