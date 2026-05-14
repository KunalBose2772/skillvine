import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Radius } from '../../theme/radius';
import { useThemeStore } from '../../store/themeStore';

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  animated?: boolean;
  style?: ViewStyle;
  showTrack?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 6,
  animated = true,
  style,
  showTrack = true,
}) => {
  const width = useSharedValue(0);
  const { colors } = useThemeStore();

  useEffect(() => {
    if (animated) {
      width.value = withSpring(progress, {
        damping: 18,
        stiffness: 120,
      });
    } else {
      width.value = withTiming(progress, {
        duration: 600,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [progress, animated, width]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View
      style={[
        showTrack && styles.track,
        { backgroundColor: colors.surfaceBorder, height },
        style,
      ]}
    >
      <Animated.View style={[styles.fill, animatedStyle, { borderRadius: height / 2 }]}>
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    overflow: 'hidden',
  },
});
