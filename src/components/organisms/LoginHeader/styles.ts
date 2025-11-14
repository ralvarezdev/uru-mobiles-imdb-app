import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DF3D36',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  clapperboard: {
    fontSize: 64,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
  },
});
