import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AppTabParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { View, StyleSheet, Platform, useWindowDimensions, TouchableOpacity, Text } from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { FontFamily, FontSize } from '../theme/typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator<AppTabParamList>();

const PlaceholderScreen = () => {
  const { colors } = useThemeStore();
  return <View style={{ flex: 1, backgroundColor: colors.background }} />;
};

const TabletNavRail = ({ state, descriptors, navigation }: any) => {
  const { colors, isDark } = useThemeStore();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.navRail,
        {
          backgroundColor: isDark ? 'rgba(10, 15, 26, 0.98)' : 'rgba(255, 255, 255, 0.98)',
          borderRightColor: colors.surfaceBorder,
          paddingTop: Math.max(insets.top, 20) + 20,
          paddingBottom: Math.max(insets.bottom, 20) + 20,
        },
      ]}
    >
      <View style={styles.navRailBrand}>
        <Ionicons name="logo-stencil" size={32} color={colors.primaryBlue} />
      </View>

      <View style={styles.navRailItems}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName: any = 'home';
          if (route.name === 'Home') iconName = isFocused ? 'home' : 'home-outline';
          else if (route.name === 'Courses') iconName = isFocused ? 'play-circle' : 'play-circle-outline';
          else if (route.name === 'Explore') iconName = isFocused ? 'compass' : 'compass-outline';
          else if (route.name === 'Community') iconName = isFocused ? 'people' : 'people-outline';
          else if (route.name === 'Profile') iconName = isFocused ? 'person' : 'person-outline';

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[
                styles.navRailItem,
                isFocused && { backgroundColor: 'rgba(56, 189, 248, 0.15)', borderRadius: 16 },
              ]}
              activeOpacity={0.8}
            >
              <Ionicons name={iconName} size={24} color={isFocused ? colors.primaryBlue : colors.textSecondary} />
              <Text style={[styles.navRailLabel, { color: isFocused ? colors.primaryBlue : colors.textSecondary }]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export const AppNavigator = () => {
  const { colors, isDark } = useThemeStore();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <Tab.Navigator
      tabBar={isTablet ? (props) => <TabletNavRail {...props} /> : undefined}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: isDark ? 'rgba(10, 15, 26, 0.96)' : 'rgba(255, 255, 255, 0.96)',
            borderTopColor: colors.surfaceBorder,
          },
        ],
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: colors.primaryBlue,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarIcon: ({ focused, color }) => {
          let iconName: any = 'home';
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Courses') iconName = focused ? 'play-circle' : 'play-circle-outline';
          else if (route.name === 'Explore') iconName = focused ? 'compass' : 'compass-outline';
          else if (route.name === 'Community') iconName = focused ? 'people' : 'people-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

          return (
            <View style={styles.iconContainer}>
              <Ionicons name={iconName} size={22} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Courses" component={PlaceholderScreen} />
      <Tab.Screen name="Explore" component={PlaceholderScreen} />
      <Tab.Screen name="Community" component={PlaceholderScreen} />
      <Tab.Screen name="Profile" component={PlaceholderScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 88 : 70,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    elevation: 0,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    marginTop: 4,
  },
  navRail: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 90,
    borderRightWidth: 1,
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  },
  navRailBrand: {
    marginBottom: 40,
  },
  navRailItems: {
    flex: 1,
    gap: 24,
    width: '100%',
    alignItems: 'center',
  },
  navRailItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    paddingVertical: 12,
  },
  navRailLabel: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: 10,
    marginTop: 6,
  },
});
