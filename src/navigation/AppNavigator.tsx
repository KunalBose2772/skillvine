import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AppTabParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { View, StyleSheet, Platform } from 'react-native';
import { useThemeStore } from '../store/themeStore';
import { FontFamily, FontSize } from '../theme/typography';

const Tab = createBottomTabNavigator<AppTabParamList>();

const PlaceholderScreen = () => {
  const { colors } = useThemeStore();
  return <View style={{ flex: 1, backgroundColor: colors.background }} />;
};

export const AppNavigator = () => {
  const { colors, isDark } = useThemeStore();

  return (
    <Tab.Navigator
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
});
