import { useEffect } from "react";

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
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

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
  //  const resetStore = useUserStore((state) => state.reset);

  //  useEffect(() => {
  //    const checkToken = async () => {
  //      await TempStorage.getItem(TempStorageKeys.AUTH_TOKEN).then((token) => {
  //        if (token) {
  //          router.push({
  //            pathname: "/home",
  //            params: {
  //              fetch: 1,
  //            },
  //          });
  //        } else {
  //          resetStore();
  //        }
  //      });
  //    };
  //    checkToken();
  //  });

  return (
    <SafeAreaView
      style={{
        marginVertical: verticalScale(20),
        marginHorizontal: horizontalScale(15),
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <View>
          <View style={styles.flexRow}>
            <DCText textStyle={styles.firstFontSize}>D</DCText>
            <DCText textStyle={styles.titleSecondFontSize}>avis</DCText>
          </View>
          <View style={styles.flexRow}>
            <DCText textStyle={styles.firstFontSize}>C</DCText>
            <DCText textStyle={styles.titleSecondFontSize}>ommunity</DCText>
          </View>
          <View style={styles.flexRow}>
            <DCText textStyle={styles.firstFontSize}>M</DCText>
            <DCText textStyle={styles.titleSecondFontSize}>eals &</DCText>
          </View>
          <View style={styles.flexRow}>
            <DCText textStyle={styles.firstFontSize}>H</DCText>
            <DCText textStyle={styles.titleSecondFontSize}>ousing</DCText>
          </View>
        </View>
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
        <DCText
          textStyle={{
            fontSize: 16,
            fontFamily: NunitoSans10ptBold,
            textAlign: "center",
            marginVertical: verticalScale(20),
            opacity: 0.5,
          }}
        >
          HELPING PEOPLE IN NEED SINCE 1991
        </DCText>
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
          backgroundColor: "black",
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
    width: 40,
    height: 40,
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
