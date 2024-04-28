import { StyleSheet } from "react-native";
import { View } from "react-native";
import { DCText } from "@/components/DCText";
import {
  NunitoSans10ptBold,
  NunitoSansSemiBold,
  horizontalScale,
  verticalScale,
} from "@/styles";
import { Feather, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { DCButton } from "@/components/DCButton";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View
        id="profile tile"
        style={{
          flexDirection: "row",
          paddingVertical: verticalScale(10),
          paddingHorizontal: horizontalScale(10),
          backgroundColor: "lightblue",
          marginVertical: verticalScale(10),
          marginHorizontal: horizontalScale(10),
          borderRadius: 5,
        }}
      >
        <Feather
          name="user"
          size={80}
          color="black"
          style={{
            width: horizontalScale(75),
            height: verticalScale(75),
            borderRadius: 50,
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
            Alex Diaz
          </DCText>
          <DCText>
            <MaterialCommunityIcons
              name="email-variant"
              size={14}
              color="black"
            />
            <DCText> alex.diaz@gmail.com</DCText>
          </DCText>
          <DCText>
            <Feather name="phone" size={14} color="black" />
            <DCText> 123-456-7890</DCText>
          </DCText>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: horizontalScale(20),
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
        <DCButton
          title="Board of Directors"
          buttonStyle={{
            paddingVertical: verticalScale(2),
          }}
          textStyle={{
            textDecorationLine: "underline",
          }}
          onPress={() => {
            WebBrowser.openBrowserAsync(
              "https://daviscommunitymeals.org/board-of-directors/"
            );
          }}
        />
        <DCButton
          title="Staff"
          buttonStyle={{
            paddingVertical: verticalScale(2),
          }}
          textStyle={{
            textDecorationLine: "underline",
          }}
          onPress={() => {
            WebBrowser.openBrowserAsync(
              "https://daviscommunitymeals.org/staff/"
            );
          }}
        />
        <DCButton
          title="News"
          buttonStyle={{
            paddingVertical: verticalScale(2),
          }}
          textStyle={{
            textDecorationLine: "underline",
          }}
          onPress={() => {
            WebBrowser.openBrowserAsync(
              "https://daviscommunitymeals.org/news/"
            );
          }}
        />
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
              if (error) console.log("Error deleting account:", error.message);
              else router.push("/");
            }
            deleteAccount();
          }}
        />
      </View>
    </View>
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
});
