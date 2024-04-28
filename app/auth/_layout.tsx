import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function authLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"default"} />
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="signup"
          options={{ title: "SignUp", headerBackTitle: "", headerBackTitleVisible: false }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
