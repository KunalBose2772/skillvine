import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { FontFamily, FontSize } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { Radius } from '../theme/radius';
import { AppText } from '../components/ui/AppText';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform, useWindowDimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const { user } = useAuthStore();
  const { isDark, colors, toggleTheme } = useThemeStore();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(colors.background);
      NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');
    }
  }, [colors.background, isDark]);

  const CATEGORIES = [
    { id: 1, title: 'Development', icon: 'code-slash', active: true },
    { id: 2, title: 'Design', icon: 'color-palette-outline', active: false },
    { id: 3, title: 'Business', icon: 'briefcase-outline', active: false },
    { id: 4, title: 'Marketing', icon: 'megaphone-outline', active: false },
    { id: 5, title: 'AI & Data', icon: 'analytics-outline', active: false },
  ];

  const RECOMMENDED = [
    {
      id: 1,
      title: 'Python for Beginners',
      subtitle: 'Master Python from scratch',
      rating: '4.8 (12.4K)',
      badge: 'Bestseller',
      badgeBg: '#D97706',
      iconColor: '#38BDF8',
      gradient: ['#1E293B', '#0F172A'] as [string, string],
    },
    {
      id: 2,
      title: 'UI/UX Design',
      subtitle: 'Design beautiful interfaces',
      rating: '4.7 (8.7K)',
      badge: 'New',
      badgeBg: '#10B981',
      iconColor: '#C084FC',
      gradient: ['#2E1065', '#100526'] as [string, string],
    },
  ];

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: isTablet ? Math.max(insets.bottom, 20) : Math.max(110, 110 + insets.bottom),
            paddingLeft: isTablet ? 90 : 0, // Leaves perfect space for the Navigation Rail on tablets!
          },
        ]}
      >
        {/* --- BRAND NEW HERO SECTION (PURPLE GRADIENT WITH CURVE) --- */}
        <LinearGradient
          colors={['#5b21b6', '#3b0764']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.heroGradient, { paddingTop: Math.max(insets.top, 20) + 10 }]}
        >
          <View style={{ paddingHorizontal: isTablet ? 32 : 0 }}>
            {/* Top Bar */}
            <MotiView
              from={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 400 }}
              style={styles.heroTopBar}
            >
              <Image
                source={require('../../assets/logo-dark.png')}
                style={[styles.heroLogoImage, isTablet && { width: 160, height: 46 }]}
              />

              <View style={styles.heroTopActions}>
                <TouchableOpacity
                  style={styles.themeBtn}
                  onPress={toggleTheme}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={isDark ? 'sunny-outline' : 'moon-outline'}
                    size={20}
                    color="#FFF"
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.heroBellBtn} activeOpacity={0.8}>
                  <Ionicons name="notifications-outline" size={24} color="#FFF" />
                  <View style={styles.heroBadge}>
                    <AppText variant="badge" style={styles.heroBadgeText}>3</AppText>
                  </View>
                </TouchableOpacity>
                <Image source={require('../../assets/user_avatar.png')} style={styles.heroAvatar} />
              </View>
            </MotiView>

            {/* Split Screen Tablet Hero vs Mobile Hero */}
            {isTablet ? (
              <MotiView
                from={{ opacity: 0, translateY: -5 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 400, delay: 100 }}
                style={styles.tabletHeroSplit}
              >
                <View style={styles.tabletHeroLeft}>
                  <AppText variant="bodySmall" style={styles.heroGreeting}>
                    Good morning, {user?.name || 'Arjun'} 👋
                  </AppText>

                  <AppText variant="h1" style={[styles.heroHeadline, { fontSize: 42, lineHeight: 50 }]}>
                    Let's learn{'\n'}something amazing{'\n'}
                    <AppText variant="h1" style={[{ color: '#FCD34D' }, { fontSize: 42, lineHeight: 50 }]}>today!</AppText>
                  </AppText>

                  <TouchableOpacity style={[styles.heroStreakPill, { marginBottom: 28 }]} activeOpacity={0.8}>
                    <View style={styles.heroStreakIconBox}>
                      <Ionicons name="flame" size={14} color="#FF8A00" />
                    </View>
                    <AppText variant="bodySmall" style={styles.heroStreakText}>12 Day Streak</AppText>
                    <Ionicons name="chevron-forward" size={14} color="rgba(255,255,255,0.6)" />
                  </TouchableOpacity>

                  <View style={[styles.heroSearchBox, { width: '100%', maxWidth: 450 }]}>
                    <Ionicons name="search" size={20} color="rgba(255,255,255,0.6)" />
                    <TextInput
                      placeholder="Search for courses, skills, topics..."
                      placeholderTextColor="rgba(255,255,255,0.6)"
                      style={styles.heroSearchInput}
                    />
                    <View style={styles.heroSearchDivider} />
                    <TouchableOpacity>
                      <Ionicons name="options-outline" size={20} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.tabletHeroRight}>
                  <Image
                    source={require('../../assets/hero_student.png')}
                    style={styles.tabletStudentImage}
                  />

                  <View style={styles.tabletProgressWidget}>
                    <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']} style={styles.heroProgressInner}>
                      <View style={styles.heroProgressCircleBg} />
                      <View style={styles.heroProgressCircleValue} />
                      <View style={styles.heroProgressTextContainer}>
                        <AppText variant="h3" style={styles.heroProgressPercent}>72%</AppText>
                        <AppText variant="caption" style={styles.heroProgressLabel}>Weekly Goal</AppText>
                      </View>
                    </LinearGradient>
                  </View>
                </View>
              </MotiView>
            ) : (
              <>
                {/* Main Hero Area (Mobile) */}
                <MotiView
                  from={{ opacity: 0, translateY: -5 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: 'timing', duration: 400, delay: 100 }}
                  style={styles.heroMainContent}
                >
                  <View style={styles.heroLeftCol}>
                    <AppText variant="bodySmall" style={styles.heroGreeting}>
                      Good morning, {user?.name || 'Arjun'} 👋
                    </AppText>

                    <AppText variant="h1" style={styles.heroHeadline}>
                      Let's learn{'\n'}something amazing{'\n'}
                      <AppText variant="h1" style={{ color: '#FCD34D' }}>today!</AppText>
                    </AppText>

                    <TouchableOpacity style={styles.heroStreakPill} activeOpacity={0.8}>
                      <View style={styles.heroStreakIconBox}>
                        <Ionicons name="flame" size={12} color="#FF8A00" />
                      </View>
                      <AppText variant="bodySmall" style={styles.heroStreakText}>12 Day Streak</AppText>
                      <Ionicons name="chevron-forward" size={12} color="rgba(255,255,255,0.6)" />
                    </TouchableOpacity>
                  </View>
                </MotiView>

                {/* Search Bar & Avatar (Mobile) */}
                <MotiView
                  from={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: 'timing', duration: 400, delay: 150 }}
                  style={styles.heroSearchSection}
                >
                  <Image
                    source={require('../../assets/hero_student.png')}
                    style={styles.heroStudentImage}
                  />

                  <View style={styles.heroProgressWidget}>
                    <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']} style={styles.heroProgressInner}>
                      <View style={styles.heroProgressCircleBg} />
                      <View style={styles.heroProgressCircleValue} />
                      <View style={styles.heroProgressTextContainer}>
                        <AppText variant="h3" style={styles.heroProgressPercent}>72%</AppText>
                        <AppText variant="caption" style={styles.heroProgressLabel}>Weekly Goal</AppText>
                      </View>
                    </LinearGradient>
                  </View>

                  <View style={styles.heroSearchBox}>
                    <Ionicons name="search" size={20} color="rgba(255,255,255,0.6)" />
                    <TextInput
                      placeholder="Search for courses, skills, topics..."
                      placeholderTextColor="rgba(255,255,255,0.6)"
                      style={styles.heroSearchInput}
                    />
                    <View style={styles.heroSearchDivider} />
                    <TouchableOpacity>
                      <Ionicons name="options-outline" size={20} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                </MotiView>
              </>
            )}

            {/* Quick Links */}
            <MotiView
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 400, delay: 200 }}
              style={styles.heroQuickLinksSection}
            >
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.heroQuickLinksScroll}>

                <TouchableOpacity style={styles.qlItem}>
                  <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.02)']} style={styles.qlIconBox}>
                    <Ionicons name="play" size={24} color="#FFF" />
                  </LinearGradient>
                  <AppText variant="caption" style={styles.qlTitle}>Resume</AppText>
                  <AppText variant="badge" style={styles.qlSub}>Last lesson</AppText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.qlItem}>
                  <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.02)']} style={styles.qlIconBox}>
                    <Ionicons name="star" size={24} color="#FFF" />
                  </LinearGradient>
                  <AppText variant="caption" style={styles.qlTitle}>Bookmarks</AppText>
                  <AppText variant="badge" style={styles.qlSub}>8 Saved</AppText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.qlItem}>
                  <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.02)']} style={styles.qlIconBox}>
                    <Ionicons name="download-outline" size={24} color="#FFF" />
                  </LinearGradient>
                  <AppText variant="caption" style={styles.qlTitle}>Downloads</AppText>
                  <AppText variant="badge" style={styles.qlSub}>12 Lessons</AppText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.qlItem}>
                  <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.02)']} style={styles.qlIconBox}>
                    <Ionicons name="document-text-outline" size={24} color="#FFF" />
                  </LinearGradient>
                  <AppText variant="caption" style={styles.qlTitle}>Notes</AppText>
                  <AppText variant="badge" style={styles.qlSub}>23 Notes</AppText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.qlItem}>
                  <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.02)']} style={styles.qlIconBox}>
                    <Ionicons name="ribbon-outline" size={24} color="#FFF" />
                  </LinearGradient>
                  <AppText variant="caption" style={styles.qlTitle}>Achievements</AppText>
                  <AppText variant="badge" style={styles.qlSub}>18 Badges</AppText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.qlItem}>
                  <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.02)']} style={[styles.qlIconBox, { borderRadius: 16 }]}>
                    <Ionicons name="grid-outline" size={24} color="#FFF" />
                  </LinearGradient>
                  <AppText variant="caption" style={styles.qlTitle}>All Tools</AppText>
                </TouchableOpacity>

              </ScrollView>
            </MotiView>
          </View>
        </LinearGradient>

        <View style={{ paddingHorizontal: isTablet ? 32 : 0 }}>
          {/* Explore by Category */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 400, delay: 250 }}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <AppText variant="h3" style={styles.sectionTitle}>Explore by Category</AppText>
            <TouchableOpacity>
              <AppText variant="bodySmall" style={{ color: colors.textSecondary }}>View all {'>'}</AppText>
            </TouchableOpacity>
          </View>

          {isTablet ? (
            <View style={styles.gridContainer}>
              {CATEGORIES.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.categoryCard,
                    { backgroundColor: item.active ? colors.primaryBlue : colors.surface },
                    !item.active && { borderColor: colors.surfaceBorder, borderWidth: 1 },
                  ]}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={item.active ? '#FFFFFF' : colors.textPrimary}
                    style={styles.categoryIcon}
                  />
                  <AppText
                    variant="bodySmall"
                    style={[
                      styles.categoryText,
                      { color: item.active ? '#FFFFFF' : colors.textPrimary },
                      item.active && { fontFamily: FontFamily.bodySemiBold },
                    ]}
                  >
                    {item.title}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
              {CATEGORIES.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.categoryCard,
                    { backgroundColor: item.active ? colors.primaryBlue : colors.surface },
                    !item.active && { borderColor: colors.surfaceBorder, borderWidth: 1 },
                  ]}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={item.active ? '#FFFFFF' : colors.textPrimary}
                    style={styles.categoryIcon}
                  />
                  <AppText
                    variant="bodySmall"
                    style={[
                      styles.categoryText,
                      { color: item.active ? '#FFFFFF' : colors.textPrimary },
                      item.active && { fontFamily: FontFamily.bodySemiBold },
                    ]}
                  >
                    {item.title}
                  </AppText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </MotiView>

        {/* Continue Learning Wide Card */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 400, delay: 300 }}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <AppText variant="h3" style={styles.sectionTitle}>Continue Learning</AppText>
            <TouchableOpacity>
              <AppText variant="bodySmall" style={{ color: colors.textSecondary }}>See all {'>'}</AppText>
            </TouchableOpacity>
          </View>

          <View style={[styles.wideCard, { backgroundColor: colors.surface, borderColor: colors.surfaceBorder }]}>
            <LinearGradient colors={['#7B2FFF', '#A855F7']} style={styles.thumbBox}>
              <Ionicons name="logo-react" size={38} color="#38BDF8" />
            </LinearGradient>

            <View style={styles.wideCardContent}>
              <View style={styles.pillTag}>
                <View style={styles.pillDot} />
                <AppText variant="caption" style={styles.pillText}>In Progress</AppText>
              </View>

              <AppText variant="h4" style={styles.courseTitle}>React Native</AppText>
              <AppText variant="caption" style={styles.courseSub}>The Complete Guide 2024</AppText>

              <ProgressBar progress={65} height={4} showTrack style={styles.progressTrack} />

              <View style={styles.metaRow}>
                <AppText variant="caption" style={styles.metaLabel}>12 / 18 Lessons</AppText>
                <AppText variant="caption" style={[styles.metaLabel, { color: colors.textPrimary, fontFamily: FontFamily.bodyBold }]}>65%</AppText>
              </View>
            </View>

            <TouchableOpacity style={styles.playBtn} activeOpacity={0.8}>
              <Ionicons name="play" size={18} color="#FFFFFF" style={{ marginLeft: 2 }} />
            </TouchableOpacity>
          </View>
        </MotiView>

        {/* Recommended for You */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 400, delay: 350 }}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <AppText variant="h3" style={styles.sectionTitle}>Recommended for You</AppText>
            <TouchableOpacity>
              <AppText variant="bodySmall" style={{ color: colors.textSecondary }}>See all {'>'}</AppText>
            </TouchableOpacity>
          </View>

          {isTablet ? (
            <View style={styles.gridContainer}>
              {RECOMMENDED.map((item) => (
                <View key={item.id} style={[styles.recCard, { width: 280, backgroundColor: colors.surface, borderColor: colors.surfaceBorder }]}>
                  <LinearGradient colors={item.gradient} style={styles.recBanner}>
                    <View style={styles.recTopRow}>
                      <View style={[styles.badgePill, { backgroundColor: item.badgeBg }]}>
                        <AppText variant="badge" style={styles.badgePillText}>{item.badge}</AppText>
                      </View>
                      <TouchableOpacity style={styles.bookmarkBtn}>
                        <Ionicons name="bookmark-outline" size={18} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.centerIconBox}>
                      <Ionicons name="code-slash" size={44} color={item.iconColor} />
                    </View>
                  </LinearGradient>

                  <View style={styles.recInfo}>
                    <AppText variant="body" style={styles.recTitle}>{item.title}</AppText>
                    <AppText variant="caption" style={styles.recSub}>{item.subtitle}</AppText>

                    <View style={styles.ratingRow}>
                      <Ionicons name="star" size={14} color="#F59E0B" style={{ marginRight: 4 }} />
                      <AppText variant="caption" style={styles.ratingText}>{item.rating}</AppText>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
              {RECOMMENDED.map((item) => (
                <View key={item.id} style={[styles.recCard, { width: width * 0.65, backgroundColor: colors.surface, borderColor: colors.surfaceBorder }]}>
                  <LinearGradient colors={item.gradient} style={styles.recBanner}>
                    <View style={styles.recTopRow}>
                      <View style={[styles.badgePill, { backgroundColor: item.badgeBg }]}>
                        <AppText variant="badge" style={styles.badgePillText}>{item.badge}</AppText>
                      </View>
                      <TouchableOpacity style={styles.bookmarkBtn}>
                        <Ionicons name="bookmark-outline" size={18} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.centerIconBox}>
                      <Ionicons name="code-slash" size={44} color={item.iconColor} />
                    </View>
                  </LinearGradient>

                  <View style={styles.recInfo}>
                    <AppText variant="body" style={styles.recTitle}>{item.title}</AppText>
                    <AppText variant="caption" style={styles.recSub}>{item.subtitle}</AppText>

                    <View style={styles.ratingRow}>
                      <Ionicons name="star" size={14} color="#F59E0B" style={{ marginRight: 4 }} />
                      <AppText variant="caption" style={styles.ratingText}>{item.rating}</AppText>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </MotiView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  scrollContent: { paddingBottom: 110 },
  tabletContainer: {
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
  },
  heroGradient: {
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: Spacing.xl,
    overflow: 'hidden',
  },
  heroTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: 24,
  },
  heroLogoImage: {
    width: 110,
    height: 32,
    resizeMode: 'contain',
  },
  heroTopActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBellBtn: {
    position: 'relative',
  },
  heroBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#4c1d95',
  },
  heroBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontFamily: FontFamily.bodyBold,
  },
  heroAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  heroMainContent: {
    paddingHorizontal: Spacing.xl,
    flexDirection: 'row',
    minHeight: 160,
    position: 'relative',
    zIndex: 2,
  },
  heroLeftCol: {
    flex: 1,
    paddingRight: 60,
    zIndex: 3,
  },
  heroGreeting: {
    color: '#E2E8F0',
    marginBottom: 8,
  },
  heroHeadline: {
    color: '#FFF',
    fontSize: width < 380 ? 22 : 25,
    lineHeight: width < 380 ? 30 : 33,
    letterSpacing: -0.5,
  },
  heroStreakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: Radius.full,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  heroStreakIconBox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroStreakText: {
    color: '#FFF',
    marginHorizontal: 8,
    fontFamily: FontFamily.bodySemiBold,
    fontSize: 11,
  },
  heroStudentImage: {
    position: 'absolute',
    right: 44, // Shifted a little bit more left
    bottom: 32, // Shifted slightly above the search bar line
    width: 140,
    height: 180,
    resizeMode: 'contain',
    zIndex: 1,
  },
  heroProgressWidget: {
    position: 'absolute',
    right: 10, // Shifted further left alongside avatar
    bottom: 110,
    width: 84,
    height: 84,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  heroProgressInner: {
    flex: 1,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  heroProgressCircleBg: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  heroProgressCircleValue: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: 'transparent',
    borderTopColor: '#FCD34D',
    borderRightColor: '#FCD34D',
    borderBottomColor: '#FCD34D',
    transform: [{ rotate: '-45deg' }],
  },
  heroProgressTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroProgressPercent: {
    color: '#FFF',
    fontFamily: FontFamily.bodyBold,
    fontSize: 20,
    marginTop: 2,
  },
  heroProgressLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 7,
    marginTop: -2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tabletHeroSplit: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: 20,
    zIndex: 2,
  },
  tabletHeroLeft: {
    flex: 1,
    maxWidth: 500,
    zIndex: 3,
  },
  tabletHeroRight: {
    position: 'relative',
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  tabletStudentImage: {
    width: 220,
    height: 260,
    resizeMode: 'contain',
    zIndex: 1,
  },
  tabletProgressWidget: {
    position: 'absolute',
    left: -20,
    top: 40,
    width: 100,
    height: 100,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  heroSearchSection: {
    paddingHorizontal: Spacing.xl,
    marginTop: 16,
    zIndex: 3,
    position: 'relative',
  },
  heroSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radius.full,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 5, // Higher than the student image
  },
  heroSearchInput: {
    flex: 1,
    marginLeft: 12,
    color: '#FFF',
    fontFamily: FontFamily.bodyRegular,
    fontSize: FontSize.sm,
  },
  heroSearchDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 12,
  },
  heroQuickLinksSection: {
    marginTop: 28,
    zIndex: 3,
  },
  heroQuickLinksScroll: {
    paddingHorizontal: Spacing.xl,
    gap: 16,
  },
  qlItem: {
    alignItems: 'center',
    width: 64, // Slightly tighter on Android
  },
  qlIconBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  qlTitle: {
    color: '#FFF',
    fontSize: 10,
    fontFamily: FontFamily.bodySemiBold,
    textAlign: 'center',
  },
  qlSub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 8,
    textAlign: 'center',
    marginTop: 2,
  },
  section: { marginBottom: Spacing['2xl'] },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingHorizontal: Spacing.xl, marginBottom: Spacing.lg },
  sectionTitle: { fontSize: 18, letterSpacing: -0.3 },
  hScroll: { paddingHorizontal: Spacing.xl, gap: Spacing.md },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  categoryCard: {
    width: 105,
    height: 105,
    borderRadius: Radius.card,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  categoryIcon: { alignSelf: 'flex-start' },
  categoryText: { fontSize: FontSize.xs },
  wideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.xl,
    padding: Spacing.md,
    borderRadius: Radius.card,
    borderWidth: 1,
  },
  thumbBox: { width: 85, height: 85, borderRadius: Radius.button, alignItems: 'center', justifyContent: 'center', marginRight: Spacing.md },
  wideCardContent: { flex: 1, marginRight: Spacing.md },
  pillTag: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 6 },
  pillDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#00B8FF' },
  pillText: { color: '#00B8FF', fontSize: 10, fontFamily: FontFamily.bodyBold },
  courseTitle: { fontSize: 16, marginBottom: 2 },
  courseSub: { marginBottom: 8, color: '#94A3B8' },
  progressTrack: { marginBottom: 6 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metaLabel: { fontSize: 11, color: '#94A3B8' },
  playBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#0066FF', alignItems: 'center', justifyContent: 'center' },
  recCard: { width: width * 0.65, borderRadius: Radius.card, borderWidth: 1, overflow: 'hidden' },
  recBanner: { height: 130, padding: Spacing.md, justifyContent: 'space-between', position: 'relative' },
  recTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 },
  badgePill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgePillText: { fontSize: 10, color: '#FFFFFF' },
  bookmarkBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  centerIconBox: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  recInfo: { padding: Spacing.md },
  recTitle: { fontFamily: FontFamily.bodySemiBold, marginBottom: 2 },
  recSub: { color: '#94A3B8', marginBottom: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { color: '#94A3B8', fontSize: 12 },
});
