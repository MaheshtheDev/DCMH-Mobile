import { DCButton } from "@/components/DCButton";
import { DCText } from "@/components/DCText";
import { NunitoSans10ptBold } from "@/styles";
import { horizontalScale, verticalScale } from "@/styles/metrics";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { supabase } from "../lib/supabase";
import { Link, router } from "expo-router";

export default function loginScreen() {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const onSubmitLogin = () => {
    const fetchUser = async () => {
      let { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email_id", email)
        .eq("password", password);
      if (error) {
        Alert.alert("Error found !!");
      }
      console.log(data);
      if (data?.length == 0) {
        Alert.alert("User Not Found! Please SignUp");
      } else {
        router.push("/(tabs)/");
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
