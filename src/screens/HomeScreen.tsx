import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/colors';
import { FontFamily, FontSize } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { Radius } from '../theme/radius';
import { AppText } from '../components/ui/AppText';
import { AnimatedCard } from '../components/ui/AnimatedCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useAuthStore } from '../store/authStore';

export const HomeScreen: React.FC = () => {
  const { user } = useAuthStore();

  const CONTINUE_LEARNING = [
    {
      id: 1,
      title: 'Advanced React Native',
      subtitle: 'Module 4: Reanimated 3',
      progress: 68,
      icon: 'logo-react',
      color: '#00B8FF',
    },
    {
      id: 2,
      title: 'UI/UX Masterclass',
      subtitle: 'Module 2: Color Theory',
      progress: 32,
      icon: 'color-palette-outline',
      color: '#7B2FFF',
    },
  ];

  const TRENDING = [
    { id: 1, title: 'AI Engineering', duration: '8 weeks', rating: '4.9', students: '12k', gradient: ['#FF4D4D', '#F9CB28'] as [string, string] },
    { id: 2, title: 'Web3 Development', duration: '10 weeks', rating: '4.8', students: '8k', gradient: ['#00C9FF', '#92FE9D'] as [string, string] },
    { id: 3, title: 'Growth Hacking', duration: '6 weeks', rating: '4.7', students: '15k', gradient: ['#FC466B', '#3F5EFB'] as [string, string] },
  ];

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
          style={styles.header}
        >
          <View style={styles.headerLeft}>
            <AppText variant="caption" color={Colors.textMuted} style={styles.date}>TUESDAY, MAY 14</AppText>
            <AppText variant="h2" style={styles.greeting}>
              Hi, {user?.name || 'Explorer'} <AppText variant="h2" style={styles.wave}>👋</AppText>
            </AppText>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="person" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        </MotiView>

        {/* Continue Learning Strip */}
        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 500, delay: 200 }} style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText variant="h4">Continue learning</AppText>
            <TouchableOpacity>
              <AppText variant="bodySmall" color={Colors.primaryBlue}>See all</AppText>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {CONTINUE_LEARNING.map((item, index) => (
              <AnimatedCard key={item.id} delay={300 + index * 100} style={styles.continueCard} elevated onPress={() => {}}>
                <View style={styles.cardTop}>
                  <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
                    <Ionicons name={item.icon as any} size={22} color={item.color} />
                  </View>
                  <AppText variant="h4" style={styles.progressText}>{item.progress}%</AppText>
                </View>
                <View style={styles.cardMid}>
                  <AppText variant="body" style={styles.cardTitle}>{item.title}</AppText>
                  <AppText variant="caption">{item.subtitle}</AppText>
                </View>
                <ProgressBar progress={item.progress} height={6} style={styles.progressTrack} />
              </AnimatedCard>
            ))}
          </ScrollView>
        </MotiView>

        {/* Trending */}
        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', duration: 500, delay: 400 }} style={styles.section}>
          <AppText variant="h4" style={styles.sectionTitle}>Trending Skills</AppText>
          
          <View style={styles.grid}>
            {TRENDING.map((item, index) => (
              <AnimatedCard key={item.id} delay={500 + index * 100} style={styles.trendingCard} noPad onPress={() => {}}>
                <LinearGradient colors={item.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.trendingBanner}>
                  <View style={styles.badge}>
                    <AppText variant="label" color={Colors.textInverse} style={{ fontSize: 10 }}>{item.duration}</AppText>
                  </View>
                </LinearGradient>
                <View style={styles.trendingContent}>
                  <AppText variant="body" style={styles.trendingTitle}>{item.title}</AppText>
                  <View style={styles.trendingMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="star" size={14} color="#FBBF24" />
                      <AppText variant="caption" style={styles.metaText}>{item.rating}</AppText>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="people" size={14} color={Colors.textMuted} />
                      <AppText variant="caption" style={styles.metaText}>{item.students}</AppText>
                    </View>
                  </View>
                </View>
              </AnimatedCard>
            ))}
          </View>
        </MotiView>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingTop: 60, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: Spacing.xl, marginBottom: Spacing['2xl'] },
  headerLeft: { flex: 1 },
  date: { letterSpacing: 1.5, marginBottom: Spacing.xs },
  greeting: { letterSpacing: -0.5 },
  wave: { fontSize: 28 },
  profileBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surfaceElevated, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.surfaceBorder },
  section: { marginBottom: Spacing['3xl'] },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: Spacing.xl, marginBottom: Spacing.lg },
  sectionTitle: { paddingHorizontal: Spacing.xl, marginBottom: Spacing.lg },
  hScroll: { paddingHorizontal: Spacing.xl, gap: Spacing.md },
  continueCard: { width: 260, padding: Spacing.lg },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg },
  iconBox: { width: 40, height: 40, borderRadius: Radius.icon, alignItems: 'center', justifyContent: 'center' },
  progressText: { fontFamily: FontFamily.heading, fontSize: 18 },
  cardMid: { marginBottom: Spacing.lg },
  cardTitle: { fontFamily: FontFamily.bodySemiBold, marginBottom: 2 },
  progressTrack: { backgroundColor: Colors.surfaceBorder },
  grid: { paddingHorizontal: Spacing.xl, gap: Spacing.md },
  trendingCard: { flexDirection: 'row', height: 100 },
  trendingBanner: { width: 100, height: '100%', padding: Spacing.sm },
  badge: { backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 6, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start' },
  trendingContent: { flex: 1, padding: Spacing.md, justifyContent: 'center' },
  trendingTitle: { fontFamily: FontFamily.bodySemiBold, marginBottom: Spacing.sm },
  trendingMeta: { flexDirection: 'row', gap: Spacing.md },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: Colors.textSecondary },
});
