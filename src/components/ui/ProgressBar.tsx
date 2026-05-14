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
import { Colors } from '../../theme/colors';
import { Radius } from '../../theme/radius';

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
        { height },
        style,
      ]}
    >
      <Animated.View style={[styles.fill, animatedStyle, { borderRadius: height / 2 }]}>
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
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
    backgroundColor: Colors.surfaceBorder,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    overflow: 'hidden',
  },
});
