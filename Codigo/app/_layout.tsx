import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { LogBox } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
//SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  LogBox.ignoreLogs([ '[Reanimated] Reduced motion setting is enabled on this device.', ]);
  return (
    <Stack>
      <Stack.Screen name="+not-found" options={{ headerShown: false }}/>
    </Stack>
  );
}
