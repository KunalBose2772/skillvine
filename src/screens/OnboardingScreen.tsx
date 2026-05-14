import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView, MotiText } from 'moti';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../theme/colors';
import { FontFamily, FontSize } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { Radius } from '../theme/radius';
import { GradientButton } from '../components/ui/GradientButton';
import { AppText } from '../components/ui/AppText';
import { ONBOARDING_SLIDES } from '../constants/onboarding';
import { AuthStackParamList } from '../navigation/types';
import { useOnboardingStore } from '../store/onboardingStore';

const { width, height } = Dimensions.get('window');

type SlideType = (typeof ONBOARDING_SLIDES)[number];
type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Onboarding'>;
};

const SlideItem: React.FC<{ item: SlideType; index: number }> = ({ item, index }) => {
  return (
    <View style={styles.slide}>
      {/* Card */}
      <MotiView
        from={{ opacity: 0, scale: 0.88, translateY: 30 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 160, delay: 100 }}
        style={styles.cardOuter}
      >
        <LinearGradient
          colors={[item.gradientColors[0] + '22', item.gradientColors[1] + '11']}
          style={styles.cardBackground}
        >
          {/* Glow orb */}
          <LinearGradient
            colors={[item.accentColor + '60', 'transparent']}
            style={styles.glowOrb}
          />
          {/* Emoji */}
          <MotiView
            from={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 250 }}
            style={styles.emojiWrapper}
          >
            <LinearGradient
              colors={item.gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.emojiGradient}
            >
              <MotiText style={styles.emoji}>{item.emoji}</MotiText>
            </LinearGradient>
          </MotiView>

          {/* Tag */}
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 400, delay: 350 }}
            style={[styles.tag, { borderColor: item.accentColor + '50' }]}
          >
            <AppText variant="label" color={item.accentColor}>
              {item.tag}
            </AppText>
          </MotiView>
        </LinearGradient>
      </MotiView>

      {/* Text */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 180, delay: 300 }}
        style={styles.textBlock}
      >
        <AppText variant="h2" align="center" style={styles.headline}>
          {item.headline}
        </AppText>
        <AppText variant="subtitle" align="center" style={styles.subtext}>
          {item.subtext}
        </AppText>
      </MotiView>
    </View>
  );
};

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef<FlatList>(null);
  const { setHasSeenOnboarding } = useOnboardingStore();

  const handleNext = () => {
    if (activeIndex < ONBOARDING_SLIDES.length - 1) {
      flatRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
      setActiveIndex(activeIndex + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = () => {
    setHasSeenOnboarding(true);
    navigation.replace('Login');
  };

  const isLast = activeIndex === ONBOARDING_SLIDES.length - 1;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatRef}
        data={ONBOARDING_SLIDES as unknown as SlideType[]}
        keyExtractor={(item) => String(item.id)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / width);
          setActiveIndex(idx);
        }}
        renderItem={({ item, index }: ListRenderItemInfo<SlideType>) => (
          <SlideItem item={item} index={index} />
        )}
        scrollEventThrottle={16}
      />

      {/* Bottom section */}
      <View style={styles.bottom}>
        {/* Dots */}
        <View style={styles.dots}>
          {ONBOARDING_SLIDES.map((_, i) => (
            <MotiView
              key={i}
              animate={{
                width: i === activeIndex ? 28 : 8,
                opacity: i === activeIndex ? 1 : 0.4,
              }}
              transition={{ type: 'spring', damping: 18, stiffness: 250 }}
              style={[
                styles.dotIndicator,
                i === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* CTA */}
        <GradientButton
          title={isLast ? 'Get Started' : 'Continue'}
          onPress={handleNext}
          size="lg"
          style={styles.cta}
        />

        {/* Skip */}
        <TouchableOpacity onPress={handleGetStarted} style={styles.skipBtn}>
          <AppText variant="bodySmall" color={Colors.textMuted}>
            Skip for now
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['3xl'],
  },
  cardOuter: {
    width: '100%',
    height: height * 0.38,
    borderRadius: Radius.card,
    overflow: 'hidden',
    marginBottom: Spacing['2xl'],
  },
  cardBackground: {
    flex: 1,
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  glowOrb: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  emojiWrapper: {
    marginBottom: Spacing.lg,
  },
  emojiGradient: {
    width: 88,
    height: 88,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 42,
  },
  tag: {
    borderWidth: 1,
    borderRadius: Radius.badge,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  textBlock: {
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
  },
  headline: {
    marginBottom: Spacing.md,
    letterSpacing: -0.5,
  },
  subtext: {
    lineHeight: 24,
  },
  bottom: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 48,
    alignItems: 'center',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    gap: 6,
  },
  dotIndicator: {
    height: 8,
    borderRadius: Radius.full,
  },
  dotActive: {
    backgroundColor: Colors.primaryBlue,
  },
  dotInactive: {
    backgroundColor: Colors.surfaceBorder,
  },
  cta: {
    marginBottom: Spacing.md,
  },
  skipBtn: {
    paddingVertical: Spacing.sm,
  },
});
