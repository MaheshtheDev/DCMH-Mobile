import { DCButton } from "@/components/DCButton";
import { DCText } from "@/components/DCText";
import {
  NunitoSans10ptBold,
  NunitoSansLight,
  NunitoSansMedium,
} from "@/styles";
import { horizontalScale, verticalScale } from "@/styles/metrics";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { supabase } from "../lib/supabase";
import { Link, router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");

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

        if (metadata.isAdmin) {
          router.push("/(tabs)/");
        } else {
          router.push("/donor/");
        }
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
