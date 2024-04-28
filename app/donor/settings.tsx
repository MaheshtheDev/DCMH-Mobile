import { Button, Pressable, StyleSheet } from "react-native";
import { View } from "react-native";
import { DCText } from "@/components/DCText";
import {
  NunitoSans10ptBold,
  NunitoSansSemiBold,
  horizontalScale,
  verticalScale,
} from "@/styles";
import {
  AntDesign,
  Feather,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { DCButton } from "@/components/DCButton";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";

export default function SettingsScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    fetchUser();
    console.log("user");
  }, []);

  return (
    user && (
      <View style={styles.container}>
        <View
          id="profile tile"
          style={{
            flexDirection: "row",
            paddingVertical: verticalScale(10),
            paddingHorizontal: horizontalScale(10),
            marginVertical: verticalScale(10),
            marginHorizontal: horizontalScale(10),
            borderRadius: 5,
          }}
        >
          <Feather
            name="user"
            size={60}
            color="black"
            style={{
              width: horizontalScale(50),
              height: verticalScale(50),
              borderRadius: 50,
              marginRight: horizontalScale(10),
            }}
          />
          <View
            style={{
              flexDirection: "column",
              marginLeft: horizontalScale(10),
              justifyContent: "center",
            }}
          >
            <DCText
              textStyle={{
                fontSize: 22,
                fontFamily: NunitoSans10ptBold,
              }}
            >
              {user.user_metadata.first_name} {user.user_metadata.last_name}
            </DCText>
            <DCText>
              <MaterialCommunityIcons
                name="email-variant"
                size={14}
                color="black"
              />
              <DCText> {user.email}</DCText>
            </DCText>
            <DCText>
              <Feather name="phone" size={14} color="black" />
              <DCText> 123-456-7890</DCText>
            </DCText>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: horizontalScale(10),
            marginVertical: verticalScale(10),
          }}
        >
          <DCText
            textStyle={{
              fontSize: 16,
              fontFamily: NunitoSans10ptBold,
              marginVertical: verticalScale(5),
            }}
          >
            More Options
          </DCText>
          <Pressable
            style={styles.navBg}
            onPress={() => {
              WebBrowser.openBrowserAsync(
                "https://daviscommunitymeals.org/board-of-directors/"
              );
            }}
          >
            <DCText
              textStyle={{
                color: "black",
                fontFamily: NunitoSansSemiBold,
              }}
            >
              Board of Directors
            </DCText>
            <AntDesign name="arrowright" size={24} color="black" />
          </Pressable>
          <Pressable
            style={styles.navBg}
            onPress={() => {
              WebBrowser.openBrowserAsync(
                "https://daviscommunitymeals.org/staff/"
              );
            }}
          >
            <DCText
              textStyle={{
                color: "black",
                fontFamily: NunitoSansSemiBold,
              }}
            >
              Staff
            </DCText>
            <AntDesign name="arrowright" size={24} color="black" />
          </Pressable>
          <Pressable
            style={styles.navBg}
            onPress={() => {
              WebBrowser.openBrowserAsync(
                "https://daviscommunitymeals.org/board-of-directors/"
              );
            }}
          >
            <DCText
              textStyle={{
                color: "black",
                fontFamily: NunitoSansSemiBold,
              }}
            >
              News
            </DCText>
            <AntDesign name="arrowright" size={24} color="black" />
          </Pressable>
          <Pressable
            style={styles.navBg}
            onPress={() => {
              Linking.openURL(
                "https://interland3.donorperfect.net/weblink/weblink.aspx?name=E357416&id=1"
              );
            }}
          >
            <DCText
              textStyle={{
                color: "black",
                fontFamily: NunitoSansSemiBold,
              }}
            >
              Donate to DCMH
            </DCText>
            <AntDesign name="arrowright" size={24} color="black" />
          </Pressable>
          <DCButton
            title="Logout"
            buttonStyle={{
              paddingVertical: verticalScale(10),
              flexDirection: "row",
              justifyContent: "center",
            }}
            textStyle={{
              textAlign: "center",
              color: "red",
              fontFamily: NunitoSansSemiBold,
              fontSize: 16,
            }}
            onPress={() => {
              async function signOut() {
                const { error } = await supabase.auth.signOut();
                if (error) console.log("Error logging out:", error.message);
                else router.push("/");
              }
              signOut();
            }}
          />
          <DCButton
            title="Delete Account"
            buttonStyle={{
              paddingVertical: verticalScale(10),
              backgroundColor: "red",
              paddingHorizontal: horizontalScale(20),
              borderRadius: 5,
              flexDirection: "row",
              justifyContent: "center",
            }}
            textStyle={{
              color: "white",
              fontSize: 16,
              fontFamily: NunitoSans10ptBold,
            }}
            onPress={() => {
              async function deleteAccount() {
                const { error } = await supabase.auth.signOut();
                if (error)
                  console.log("Error deleting account:", error.message);
                else router.push("/");
              }
              deleteAccount();
            }}
          />
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  navBg: {
    marginVertical: verticalScale(5),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: 5,
    backgroundColor: "lightgrey",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
});
