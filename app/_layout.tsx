import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "NunitoSans-Regular": require("../assets/fonts/NunitoSans_7pt-Regular.ttf"),
    "NunitoSans-Light": require("../assets/fonts/NunitoSans_7pt-Light.ttf"),
    "NunitoSans-Medium": require("../assets/fonts/NunitoSans_7pt-Medium.ttf"),
    "NunitoSans-SemiBold": require("../assets/fonts/NunitoSans_7pt-SemiBold.ttf"),
    "NunitoSans-Bold": require("../assets/fonts/NunitoSans_7pt-Bold.ttf"),
    "NunitoSans-ExtraBold": require("../assets/fonts/NunitoSans_7pt-ExtraBold.ttf"),
    "NunitoSans_10pt-Bold": require("../assets/fonts/NunitoSans_10pt-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"default"} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, headerBackButtonMenuEnabled: false }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="donor" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
