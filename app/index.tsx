import { useEffect } from "react";

import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";

//import { TempStorage, TempStorageKeys, useUserStore } from "@/store";
import { Button, SafeAreaView, View, Text, StyleSheet } from "react-native";
import { DCText } from "@/components/DCText";
import { DCButton } from "@/components/DCButton";
import { NunitoSans10ptBold, NunitoSansBold, NunitoSansExtraBold, verticalScale } from "@/styles";

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
        marginHorizontal: verticalScale(15),
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
      <DCButton
        title="LET'S MAKE CHANGE"
        onPress={() => {}}
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
    fontSize: 28,
    fontFamily: NunitoSans10ptBold,
  },
  titleSecondFontSize: {
    fontSize: 20,
  },
});
