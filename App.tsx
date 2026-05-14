import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { SpaceGrotesk_500Medium, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { RootNavigator } from './src/navigation/RootNavigator';
import { StatusBar } from 'react-native';
import { useThemeStore } from './src/store/themeStore';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
  });

  const { isDark, colors } = useThemeStore();

  if (!fontsLoaded) {
    return null;
  }

  const baseTheme = isDark ? DarkTheme : DefaultTheme;
  const MyTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: colors.primaryBlue,
      background: colors.background,
      card: colors.surface,
      text: colors.textPrimary,
      border: colors.surfaceBorder,
      notification: colors.accentBlue,
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={colors.background}
        />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
