import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ViewStyle,
} from 'react-native';
import { Spacing } from '../../theme/spacing';
import { useThemeStore } from '../../store/themeStore';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padded?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  showsScrollIndicator?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = false,
  padded = true,
  style,
  contentStyle,
  showsScrollIndicator = false,
}) => {
  const { isDark, colors } = useThemeStore();

  return (
    <View style={[styles.root, { backgroundColor: colors.background }, style]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <SafeAreaView style={styles.safe}>
        {scrollable ? (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
              padded && styles.padded,
              styles.scrollContent,
              contentStyle,
            ]}
            showsVerticalScrollIndicator={showsScrollIndicator}
            bounces
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[padded && styles.padded, styles.flat, contentStyle]}>
            {children}
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  flat: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: Spacing.xl,
  },
});
