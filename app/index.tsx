import { useEffect, useState } from "react";

import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";
import { Image } from "expo-image";

//import { TempStorage, TempStorageKeys, useUserStore } from "@/store";
import { Button, SafeAreaView, View, Text, StyleSheet } from "react-native";
import { DCText } from "@/components/DCText";
import { DCButton } from "@/components/DCButton";
import {
  NunitoSans10ptBold,
  NunitoSansBold,
  NunitoSansExtraBold,
  horizontalScale,
  verticalScale,
} from "@/styles";
import { Images } from "@/assets/images";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { LinearTextGradient } from "react-native-text-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

ErrorUtils.setGlobalHandler((error, isFatal) => {
  // Handle the error
  //TODO: Add error logging
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

/**
 * Renders the root layout component.
 * @returns The root layout component.
 */
export default function index() {
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    if (session) {
      router.push("/(tabs)/");
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingVertical: verticalScale(20),
        paddingHorizontal: horizontalScale(15),
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Image
          source={Images.icon}
          style={{
            width: 200,
            height: 150,
            margin: 10,
            alignSelf: "center",
          }}
        ></Image>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: verticalScale(20),
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={Images.food}
              contentFit="fill"
              style={styles.imageStyle}
            />
            <DCText>Food</DCText>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={Images.hope}
              contentFit="fill"
              style={styles.imageStyle}
            />
            <DCText>Hope</DCText>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={Images.shelter}
              contentFit="fill"
              style={styles.imageStyle}
            />
            <DCText>Shelter</DCText>
          </View>
        </View>
        <MaskedView
          style={{ height: 24, marginVertical: verticalScale(20) }}
          maskElement={
            <DCText
              textStyle={{
                fontSize: 16,
                fontFamily: NunitoSans10ptBold,
                textAlign: "center",
                //marginVertical: verticalScale(20),
              }}
            >
              HELPING PEOPLE IN NEED SINCE 1991
            </DCText>
          }
        >
          <LinearGradient
            colors={["blue", "#B16464"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0.33 }}
            style={{ flex: 1 }}
          />
        </MaskedView>
        <View
          style={{
            marginVertical: verticalScale(2),
            flexDirection: "row",
            gap: 5,
            marginLeft: -20,
          }}
        >
          <View style={styles.programsView}>
            <DCText textStyle={{}}>Transitional and Bridge</DCText>
          </View>
          <View style={styles.programsView}>
            <DCText textStyle={{}}>Resource Center and Day</DCText>
          </View>
        </View>
        <View
          style={{
            marginVertical: verticalScale(2),
            flexDirection: "row",
            gap: 5,
          }}
        >
          <View style={styles.programsView}>
            <DCText textStyle={{}}>Housing</DCText>
          </View>
          <View style={styles.programsView}>
            <DCText textStyle={{}}>Family Housing</DCText>
          </View>
          <View style={styles.programsView}>
            <DCText textStyle={{}}>Pathways to Employment</DCText>
          </View>
        </View>
        <View
          style={{
            marginVertical: verticalScale(2),
            flexDirection: "row",
            gap: 5,
            marginLeft: -20,
          }}
        >
          <View style={styles.programsView}>
            <DCText textStyle={{}}>Creekside</DCText>
          </View>
          <View style={styles.programsView}>
            <DCText textStyle={{}}>Meals Program</DCText>
          </View>
          <View style={styles.programsView}>
            <DCText textStyle={{}}>Permanent Supportive</DCText>
          </View>
        </View>
        <View
          style={{
            marginVertical: verticalScale(2),
            flexDirection: "row",
            gap: 10,
            marginLeft: -10,
          }}
        >
          <View style={styles.programsView}>
            <DCText textStyle={{}}>Street Outreach</DCText>
          </View>
          <View style={styles.programsView}>
            <DCText textStyle={{}}>Shelter</DCText>
          </View>
          <View style={styles.programsView}>
            <DCText textStyle={{}}>Housing-Cesar Chavez</DCText>
          </View>
        </View>
      </View>

      <DCButton
        title="LET'S MAKE CHANGE →"
        onPress={() => {
          router.push("/auth/login");
        }}
        buttonStyle={{
          backgroundColor: "green",
          borderRadius: 100,
          padding: 10,
          margin: 10,
        }}
        textStyle={{
          textAlign: "center",
          color: "white",
          fontSize: 16,
          fontFamily: NunitoSans10ptBold,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  firstFontSize: {
    fontSize: 36,
    fontFamily: NunitoSans10ptBold,
  },
  titleSecondFontSize: {
    fontSize: 24,
  },
  imageStyle: {
    width: 50,
    height: 50,
    margin: 10,
  },
  maskedView: {
    height: 30, // Set the height to the height of the text
    justifyContent: "center",
    alignItems: "center",
  },
  programsView: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(5),
    borderRadius: 100,
    opacity: 0.35,
    backgroundColor: "white",
  },
});
