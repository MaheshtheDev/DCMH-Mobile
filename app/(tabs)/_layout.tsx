import React from "react";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { AntDesign, Entypo, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { DCText } from "@/components/DCText";
import { NunitoSans10ptBold } from "@/styles";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          tabBarLabelStyle: {
            fontFamily: NunitoSans10ptBold,
            fontSize: 12,
          },
        }}
      />
      <Tabs.Screen
        name="donations"
        options={{
          title: "Donations",
          headerTitle: "Donations",
          headerTitleStyle: {
            fontFamily: NunitoSans10ptBold,
            color: "green",
            fontSize: 24,
          },
          tabBarIcon: ({ color }) => (
            <Entypo name="back-in-time" size={24} color={color} />
          ),
          tabBarLabelStyle: {
            fontFamily: NunitoSans10ptBold,
            fontSize: 12,
          },
        }}
      />
      <Tabs.Screen
        name="donors"
        options={{
          title: "Donors",
          headerTitle: "Donors",
          headerTitleStyle: {
            fontFamily: NunitoSans10ptBold,
            color: "green",
            fontSize: 24,
          },
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-sharp" size={24} color={color} />
          ),
          tabBarLabelStyle: {
            fontFamily: NunitoSans10ptBold,
            fontSize: 12,
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerTitle: "Settings",
          headerTitleStyle: {
            fontFamily: NunitoSans10ptBold,
            color: "green",
            fontSize: 24,
          },
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={24} color={color} />
          ),
          tabBarLabelStyle: {
            fontFamily: NunitoSans10ptBold,
            fontSize: 12,
          },
        }}
      />
    </Tabs>
  );
}
