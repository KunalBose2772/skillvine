import React from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { MotiView } from 'moti';
import { Colors } from '../../theme/colors';
import { Radius } from '../../theme/radius';
import { Spacing } from '../../theme/spacing';
import { Shadows } from '../../theme/shadows';

interface AnimatedCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  delay?: number;
  onPress?: () => void;
  glow?: boolean;
  elevated?: boolean;
  noPad?: boolean;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  style,
  delay = 0,
  onPress,
  glow = false,
  elevated = false,
  noPad = false,
}) => {
  const cardContent = (
    <MotiView
      from={{ opacity: 0, translateY: 18, scale: 0.97 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 200,
        delay,
      }}
      style={[
        styles.card,
        elevated && styles.elevated,
        glow && Shadows.glowBlue,
        !noPad && styles.padded,
        style,
      ]}
    >
      {children}
    </MotiView>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        {cardContent}
      </Pressable>
    );
  }

  return cardContent;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    overflow: 'hidden',
  },
  elevated: {
    backgroundColor: Colors.surfaceElevated,
  },
  padded: {
    padding: Spacing.xl,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
});
