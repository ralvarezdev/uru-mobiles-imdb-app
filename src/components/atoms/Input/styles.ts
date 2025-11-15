// src/components/atoms/Input/styles.ts
import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';

export const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 8,
    fontSize: 14,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
