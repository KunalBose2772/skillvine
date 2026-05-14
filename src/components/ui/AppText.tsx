import React from 'react';
import {
  Text as RNText,
  TextStyle,
  StyleProp,
  TextProps as RNTextProps,
} from 'react-native';
import { FontFamily, FontSize, LetterSpacing } from '../../theme/typography';
import { useThemeStore } from '../../store/themeStore';

type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'subtitle'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label'
  | 'badge';

interface AppTextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  align?: 'left' | 'center' | 'right';
  gradient?: boolean;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color,
  align = 'left',
  style,
  children,
  ...props
}) => {
  const { colors } = useThemeStore();

  const variantStyles: Record<TextVariant, TextStyle> = {
    display: {
      fontFamily: FontFamily.heading,
      fontSize: FontSize['5xl'],
      letterSpacing: LetterSpacing.tight,
      lineHeight: FontSize['5xl'] * 1.1,
      color: colors.textPrimary,
    },
    h1: {
      fontFamily: FontFamily.heading,
      fontSize: FontSize['4xl'],
      letterSpacing: LetterSpacing.tight,
      lineHeight: FontSize['4xl'] * 1.15,
      color: colors.textPrimary,
    },
    h2: {
      fontFamily: FontFamily.heading,
      fontSize: FontSize['3xl'],
      letterSpacing: LetterSpacing.tight,
      lineHeight: FontSize['3xl'] * 1.2,
      color: colors.textPrimary,
    },
    h3: {
      fontFamily: FontFamily.heading,
      fontSize: FontSize['2xl'],
      letterSpacing: -0.3,
      lineHeight: FontSize['2xl'] * 1.25,
      color: colors.textPrimary,
    },
    h4: {
      fontFamily: FontFamily.heading,
      fontSize: FontSize.xl,
      letterSpacing: -0.2,
      lineHeight: FontSize.xl * 1.3,
      color: colors.textPrimary,
    },
    subtitle: {
      fontFamily: FontFamily.bodySemiBold,
      fontSize: FontSize.lg,
      letterSpacing: LetterSpacing.normal,
      lineHeight: FontSize.lg * 1.4,
      color: colors.textSecondary,
    },
    body: {
      fontFamily: FontFamily.bodyRegular,
      fontSize: FontSize.base,
      letterSpacing: LetterSpacing.normal,
      lineHeight: FontSize.base * 1.6,
      color: colors.textPrimary,
    },
    bodySmall: {
      fontFamily: FontFamily.bodyRegular,
      fontSize: FontSize.sm,
      letterSpacing: LetterSpacing.normal,
      lineHeight: FontSize.sm * 1.6,
      color: colors.textSecondary,
    },
    caption: {
      fontFamily: FontFamily.bodyRegular,
      fontSize: FontSize.xs,
      letterSpacing: LetterSpacing.wide,
      lineHeight: FontSize.xs * 1.5,
      color: colors.textMuted,
    },
    label: {
      fontFamily: FontFamily.bodySemiBold,
      fontSize: FontSize.xs,
      letterSpacing: LetterSpacing.wider,
      textTransform: 'uppercase',
      color: colors.textSecondary,
    },
    badge: {
      fontFamily: FontFamily.bodyBold,
      fontSize: FontSize.xs,
      letterSpacing: LetterSpacing.wide,
      color: colors.textPrimary,
    },
  };

  return (
    <RNText
      style={[
        variantStyles[variant],
        align !== 'left' && { textAlign: align },
        color ? { color } : null,
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};
