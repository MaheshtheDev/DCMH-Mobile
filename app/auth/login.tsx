import { DCButton } from "@/components/DCButton";
import { DCText } from "@/components/DCText";
import { NunitoSans10ptBold } from "@/styles";
import { horizontalScale, verticalScale } from "@/styles/metrics";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";

export default function loginScreen() {
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
          alignItems: "center",
          paddingLeft: 10,
          marginBottom: 5,
        }}
      >
        <DCText
          textStyle={{
            fontSize: 20,
            fontFamily: NunitoSans10ptBold,
            textAlign: "auto",
            color: "green",
          }}
        >
          Davis Community Meals & Housing
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
            value={""}
            placeholder="Enter your Email ID"
            onChange={() => {}}
          />
        </View>
        <View style={styles.fieldInputs}>
          <DCText textStyle={{ fontSize: 16, fontFamily: NunitoSans10ptBold }}>
            Password
          </DCText>
          <TextInput
            style={styles.textInput}
            value={""}
            placeholder="Enter Your Password"
            onChange={() => {}}
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
          <DCText
            textStyle={{
              fontSize: 14,
              opacity: 0.75,
              color: "#4200FF",
            }}
          >
            {"Create One"}
          </DCText>
        </View>
        <DCButton
          title="Login"
          onPress={() => {
            router.push("/(tabs)/");
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fieldInputs: {
    flexDirection: "column",
    marginHorizontal: 15,
    marginTop: 25,
  },
  textInput: {
    height: 45,
    width: "100%",
    borderRadius: 3,
    borderWidth: 0.25,
    paddingHorizontal: 6,
  },
});
