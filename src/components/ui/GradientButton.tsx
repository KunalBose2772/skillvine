import React, { useCallback } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../theme/colors';
import { Radius } from '../../theme/radius';
import { Spacing } from '../../theme/spacing';
import { Shadows } from '../../theme/shadows';
import { AppText } from './AppText';
import { FontFamily, FontSize } from '../../theme/typography';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'surface';
type ButtonSize = 'sm' | 'md' | 'lg';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'lg',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  fullWidth = true,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 400 });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  }, [scale]);

  const sizeStyles = {
    sm: { height: 44, paddingHorizontal: Spacing.lg },
    md: { height: 52, paddingHorizontal: Spacing.xl },
    lg: { height: 60, paddingHorizontal: Spacing['2xl'] },
  };

  const textSizeStyles = {
    sm: FontSize.sm,
    md: FontSize.base,
    lg: FontSize.md,
  };

  if (variant === 'primary') {
    return (
      <Animated.View
        style={[
          animatedStyle,
          fullWidth && styles.fullWidth,
          Shadows.glowBlue,
          style,
        ]}
      >
        <AnimatedTouchable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          activeOpacity={1}
          style={styles.buttonBase}
        >
          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.gradient, sizeStyles[size], disabled && styles.disabled]}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} size="small" />
            ) : (
              <View style={styles.content}>
                {icon && <View style={styles.iconLeft}>{icon}</View>}
                <AppText
                  variant="body"
                  style={[
                    styles.primaryText,
                    { fontSize: textSizeStyles[size], fontFamily: FontFamily.bodySemiBold },
                    textStyle,
                  ]}
                >
                  {title}
                </AppText>
              </View>
            )}
          </LinearGradient>
        </AnimatedTouchable>
      </Animated.View>
    );
  }

  if (variant === 'outline') {
    return (
      <Animated.View style={[animatedStyle, fullWidth && styles.fullWidth, style]}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          activeOpacity={0.9}
          style={[styles.outlineButton, sizeStyles[size], disabled && styles.disabled]}
        >
          {loading ? (
            <ActivityIndicator color={Colors.primaryBlue} size="small" />
          ) : (
            <View style={styles.content}>
              {icon && <View style={styles.iconLeft}>{icon}</View>}
              <AppText
                variant="body"
                style={[
                  styles.outlineText,
                  { fontSize: textSizeStyles[size], fontFamily: FontFamily.bodySemiBold },
                  textStyle,
                ]}
              >
                {title}
              </AppText>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  if (variant === 'surface') {
    return (
      <Animated.View style={[animatedStyle, fullWidth && styles.fullWidth, style]}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled || loading}
          activeOpacity={0.85}
          style={[styles.surfaceButton, sizeStyles[size], disabled && styles.disabled]}
        >
          {loading ? (
            <ActivityIndicator color={Colors.textPrimary} size="small" />
          ) : (
            <View style={styles.content}>
              {icon && <View style={styles.iconLeft}>{icon}</View>}
              <AppText
                variant="body"
                style={[
                  { fontSize: textSizeStyles[size], fontFamily: FontFamily.bodySemiBold, color: Colors.textPrimary },
                  textStyle,
                ]}
              >
                {title}
              </AppText>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // Ghost
  return (
    <Animated.View style={[animatedStyle, fullWidth && styles.fullWidth, style]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.7}
        style={[styles.ghostButton, sizeStyles[size]]}
      >
        <AppText
          variant="body"
          style={[
            styles.ghostText,
            { fontSize: textSizeStyles[size], fontFamily: FontFamily.bodySemiBold },
            textStyle,
          ]}
        >
          {title}
        </AppText>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fullWidth: { width: '100%' },
  buttonBase: { borderRadius: Radius.button, overflow: 'hidden' },
  gradient: {
    borderRadius: Radius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: { marginRight: Spacing.sm },
  primaryText: {
    color: Colors.white,
    letterSpacing: 0.2,
  },
  outlineButton: {
    borderRadius: Radius.button,
    borderWidth: 1.5,
    borderColor: Colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineText: {
    color: Colors.primaryBlue,
  },
  surfaceButton: {
    borderRadius: Radius.button,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostText: {
    color: Colors.textSecondary,
  },
  disabled: {
    opacity: 0.5,
  },
});
