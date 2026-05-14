import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { MotiView, MotiText } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontFamily, FontSize } from '../theme/typography';
import { AuthStackParamList } from '../navigation/types';
import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';

const { width, height } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Splash'>;
};

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { isDark, colors } = useThemeStore();
  const { skipAuth } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      skipAuth();
    }, 1800);
    return () => clearTimeout(timer);
  }, [skipAuth]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
        <Image
          source={
            isDark
              ? require('../../assets/logo-dark.png')
              : require('../../assets/logo-light.png')
          }
          style={styles.logoImage}
        />
      </MotiView>

      {/* Tagline */}
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600, delay: 1100 }}
        style={styles.taglineContainer}
      >
        <MotiText style={[styles.tagline, { color: colors.textSecondary }]}>
          Grow every day.
        </MotiText>
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
            style={[
              styles.dot,
              { backgroundColor: i === 1 ? colors.primaryBlue : colors.textMuted },
              i === 1 && styles.dotActive,
            ]}
          />
        ))}
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 10,
  },
  logoImage: {
    width: 220,
    height: 65,
    resizeMode: 'contain',
  },
  taglineContainer: {
    marginTop: 14,
  },
  tagline: {
    fontFamily: FontFamily.bodyRegular,
    fontSize: FontSize.base,
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
  },
  dotActive: {
    width: 20,
  },
});
