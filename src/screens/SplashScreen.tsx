import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { MotiView, MotiText } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../theme/colors';
import { FontFamily, FontSize } from '../theme/typography';
import { AuthStackParamList } from '../navigation/types';

const { width, height } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Splash'>;
};

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2800);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Background glow */}
      <MotiView
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1.8 }}
        transition={{ type: 'timing', duration: 1800, delay: 200 }}
        style={styles.glowContainer}
      >
        <LinearGradient
          colors={['rgba(0,102,255,0.35)', 'transparent']}
          style={styles.glow}
        />
      </MotiView>

      {/* Second glow */}
      <MotiView
        from={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 0.6, scale: 1.4 }}
        transition={{ type: 'timing', duration: 2000, delay: 400 }}
        style={styles.glowContainer2}
      >
        <LinearGradient
          colors={['rgba(0,184,255,0.25)', 'transparent']}
          style={styles.glow}
        />
      </MotiView>

      {/* Logo mark */}
      <MotiView
        from={{ opacity: 0, scale: 0.7, translateY: 20 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 180, delay: 300 }}
        style={styles.logoContainer}
      >
        {/* Icon mark */}
        <MotiView
          from={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 16, stiffness: 200, delay: 500 }}
        >
          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconMark}
          >
            <MotiText
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: 400, delay: 800 }}
              style={styles.iconLetter}
            >
              S
            </MotiText>
          </LinearGradient>
        </MotiView>

        {/* Wordmark */}
        <MotiView
          from={{ opacity: 0, translateX: -10 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200, delay: 700 }}
          style={styles.wordmark}
        >
          <MotiText style={styles.wordmarkText}>
            Skill<MotiText style={styles.wordmarkAccent}>Vine</MotiText>
          </MotiText>
        </MotiView>
      </MotiView>

      {/* Tagline */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600, delay: 1100 }}
        style={styles.taglineContainer}
      >
        <MotiText style={styles.tagline}>Grow every day.</MotiText>
      </MotiView>

      {/* Bottom pulse dots */}
      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 400, delay: 1600 }}
        style={styles.dotsContainer}
      >
        {[0, 1, 2].map((i) => (
          <MotiView
            key={i}
            from={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              type: 'timing',
              duration: 1000,
              delay: i * 200,
              loop: true,
            }}
            style={[styles.dot, i === 1 && styles.dotActive]}
          />
        ))}
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowContainer: {
    position: 'absolute',
    top: height * 0.2,
    left: width * 0.1,
  },
  glowContainer2: {
    position: 'absolute',
    bottom: height * 0.15,
    right: width * 0.05,
  },
  glow: {
    width: 280,
    height: 280,
    borderRadius: 140,
  },
  logoContainer: {
    alignItems: 'center',
  },
  iconMark: {
    width: 72,
    height: 72,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconLetter: {
    fontFamily: FontFamily.heading,
    fontSize: 36,
    color: '#FFFFFF',
    lineHeight: 42,
  },
  wordmark: {
    flexDirection: 'row',
  },
  wordmarkText: {
    fontFamily: FontFamily.heading,
    fontSize: FontSize['3xl'],
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  wordmarkAccent: {
    fontFamily: FontFamily.heading,
    fontSize: FontSize['3xl'],
    color: Colors.accentBlue,
    letterSpacing: -0.5,
  },
  taglineContainer: {
    marginTop: 14,
  },
  tagline: {
    fontFamily: FontFamily.bodyRegular,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    letterSpacing: 0.3,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.textMuted,
  },
  dotActive: {
    width: 20,
    backgroundColor: Colors.primaryBlue,
  },
});
