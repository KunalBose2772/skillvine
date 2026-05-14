import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  ViewStyle,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';

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
  return (
    <View style={[styles.root, style]}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
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
    backgroundColor: Colors.background,
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
