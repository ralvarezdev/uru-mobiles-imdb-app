import { colors, typography } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  base: {
    color: colors.text.primary,
  },
  title: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
  },
  subtitle: {
    fontSize: typography.subtitle.fontSize,
    fontWeight: typography.subtitle.fontWeight,
    color: colors.text.secondary,
  },
  body: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.body.fontWeight,
  },
  label: {
    fontSize: typography.label.fontSize,
    fontWeight: typography.label.fontWeight,
  },
});
