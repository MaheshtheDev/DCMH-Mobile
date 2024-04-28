import { DCButton } from "@/components/DCButton";
import { DCText } from "@/components/DCText";
import {
  NunitoSans10ptBold,
  NunitoSansLight,
  NunitoSansMedium,
} from "@/styles";
import { horizontalScale, verticalScale } from "@/styles/metrics";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Link, router } from "expo-router";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

/**
 * Registers the device for push notifications.
 * @returns The push notification token.
 */
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      sound: "default",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: "54a88373-a5a2-45fa-a844-4c1d3b5dd8e8",
    });
  } else {
    console.log("Must use physical device for Push Notifications");
  }

  return token;
}

export default function LoginScreen() {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  async function getToken(): Promise<string> {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert(
        "Enable Notifications",
        "Please enable notifications in settings to get Notified about New Events.",
        [
          { text: "Ok" },
          { text: "Settings", onPress: () => Linking.openSettings() },
        ],
        { userInterfaceStyle: "light" }
      );
    } else {
      let expoPushToken = "";
      if (expoPushToken == "") {
        return registerForPushNotificationsAsync().then((token: any) => {
          console.log("firebase token: ", token.data);
          expoPushToken = token.data;
          return expoPushToken;
        });
      }
    }
    return "";
  }

  const onSubmitLogin = () => {
    const fetchUser = async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        Alert.alert(error.message);
      } else {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        let metadata = user.user_metadata;

        // Register for push notifications

        await getToken()
          .then((token: string) => {
            // Update the user's push token
            const updateUser = async () => {
              const { data, error } = await supabase
                .from("profiles")
                .insert([
                  {
                    user_id: user.id,
                    auth_token: token,
                    role: metadata.isAdmin ? "admin" : "donor",
                  },
                ]);
              if (error) {
                console.log("Error updating user");
                console.log(error);
              }
              console.log("User updated successfully");
              console.log(token);
            };
            updateUser();
            if (metadata.isAdmin) {
              router.push("/(tabs)/");
            } else {
              router.push("/donor/");
            }
          })
          .catch(() => {
            Alert.alert("Invalid OTP", "Please enter a valid OTP.");
          });
      }
    };
    fetchUser();
  };

  return (
    <SafeAreaView
      style={{
        marginVertical: verticalScale(20),
        marginHorizontal: horizontalScale(15),
        flex: 1,
        flexDirection: "column",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
          paddingLeft: 10,
          marginVertical: verticalScale(10),
        }}
      >
        <DCText
          textStyle={{
            fontSize: 24,
            fontFamily: NunitoSans10ptBold,
            textAlign: "left",
            color: "green",
          }}
        >
          Login
        </DCText>
        <DCText
          textStyle={{
            marginTop: 8,
            fontSize: 13,
            fontFamily: NunitoSansLight,
            textAlign: "left",
            color: "black",
          }}
        >
          Welcome back to Davis Community! Please login to continue.
        </DCText>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <View style={styles.fieldInputs}>
          <DCText textStyle={{ fontSize: 16, fontFamily: NunitoSans10ptBold }}>
            Email ID
          </DCText>
          <TextInput
            style={styles.textInput}
            value={email}
            placeholder="Enter your Email ID"
            onChangeText={(e) => setEmail(e)}
          />
        </View>
        <View style={styles.fieldInputs}>
          <DCText textStyle={{ fontSize: 16, fontFamily: NunitoSans10ptBold }}>
            Password
          </DCText>
          <TextInput
            style={styles.textInput}
            value={password}
            secureTextEntry={true}
            placeholder="Enter Your Password"
            onChangeText={(e) => setPassword(e)}
          />
        </View>
      </View>
      <View>
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            flexDirection: "row",
          }}
        >
          <DCText textStyle={{ fontSize: 14 }}>{"No Account? "}</DCText>
          <Link href={"/auth/signup"}>
            <DCText
              textStyle={{
                fontSize: 14,
                opacity: 0.75,
                color: "#4200FF",
              }}
            >
              {"Create One"}
            </DCText>
          </Link>
        </View>
        <DCButton
          title="Login"
          onPress={() => onSubmitLogin()}
          buttonStyle={{
            backgroundColor: "green",
            borderRadius: 100,
            padding: 10,
            margin: 20,
          }}
          textStyle={{
            textAlign: "center",
            color: "white",
            fontSize: 16,
            fontFamily: NunitoSans10ptBold,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fieldInputs: {
    flexDirection: "column",
    marginHorizontal: 10,
    marginTop: 25,
  },
  textInput: {
    fontFamily: NunitoSansMedium,
    height: verticalScale(40),
    backgroundColor: "#F0F0F0",
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 4,
    marginVertical: verticalScale(3),
    fontSize: 14,
  },
});
