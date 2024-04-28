import { NunitoSansMedium, NunitoSansSemiBold } from "@/styles";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function authLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={"dark-content"} />
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="signup"
          options={{
            title: "Sign Up",
            headerBackTitle: "",
            headerBackTitleVisible: false,
            headerTitleStyle: {
              fontFamily: NunitoSansSemiBold,
              fontSize: 20,
            },
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
