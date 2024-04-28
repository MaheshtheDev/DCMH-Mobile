import { DCButton } from "@/components/DCButton";
import { DCText } from "@/components/DCText";
import { horizontalScale, NunitoSans10ptBold, NunitoSansMedium, verticalScale } from "@/styles";
import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";

export default function signUpScreen() {
  const [firstName, setFirstName] = useState<String>("");
  const [lastName, setLastName] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [phoneNumber, setPhoneNumber] = useState<Number>();
  const [imageUri, setImageUri] = useState<String>("");

  const onSignUp = () => {
    const createUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            first_name: firstName,
            last_name: lastName,
            email_id: email,
            password: password,
            phone_number: phoneNumber,
          },
        ])
        .select();
      if (error) {
        Alert.alert("Error happened");
      }

      Alert.alert("Account created Successfully !");
      // console.log(data, "Data");
    };
    createUser();
    router.push("/auth/login");
  };

  return (
    <SafeAreaView
      style={{
        paddingVertical: verticalScale(20),
        paddingHorizontal: horizontalScale(15),
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <View style={styles.container}>
        <View>
          <View style={styles.fieldInputs}>
            <DCText
              textStyle={{ fontSize: 16, fontFamily: NunitoSans10ptBold }}
            >
              First Name
            </DCText>
            <TextInput
              style={styles.textInput}
              value={firstName}
              onChangeText={(e) => setFirstName(e)}
              placeholder="Enter your first name"
            />
          </View>
          <View style={styles.fieldInputs}>
            <DCText
              textStyle={{ fontSize: 16, fontFamily: NunitoSans10ptBold }}
            >
              Last Name
            </DCText>
            <TextInput
              style={styles.textInput}
              value={lastName}
              onChangeText={(e) => setLastName(e)}
              placeholder="Enter your last name"
            />
          </View>
          <View style={styles.fieldInputs}>
            <DCText
              textStyle={{ fontSize: 16, fontFamily: NunitoSans10ptBold }}
            >
              Email ID
            </DCText>
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={(e) => setEmail(e)}
              placeholder="Enter your email ID"
            />
          </View>
          <View style={styles.fieldInputs}>
            <DCText
              textStyle={{ fontSize: 16, fontFamily: NunitoSans10ptBold }}
            >
              Password
            </DCText>
            <TextInput
              style={styles.textInput}
              value={password}
              secureTextEntry={true}
              onChangeText={(e) => setPassword(e)}
              placeholder="Enter your password"
            />
          </View>
          <View style={styles.fieldInputs}>
            <DCText
              textStyle={{ fontSize: 16, fontFamily: NunitoSans10ptBold }}
            >
              Phone Number
            </DCText>
            <TextInput
              style={styles.textInput}
              value={phoneNumber}
              keyboardType="numeric"
              onChangeText={(e) => setPhoneNumber(e)}
              placeholder="Enter your phone number"
            />
          </View>
          {/*<View style={styles.fieldInputs}>
            <DCText
              textStyle={{ fontSize: 16, fontFamily: NunitoSans10ptBold }}
            >
              Profile Photo
            </DCText>
            <TextInput
              style={styles.textInput}
              value={imageUri}
              onChangeText={(e) => setImageUri(e)}
              placeholder="Upload your profile picture"
            />
          </View>*/}
        </View>
        <DCButton
          title="Sign Up"
          onPress={() => onSignUp()}
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
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  fieldInputs: {
    flexDirection: "column",
    marginHorizontal: 15,
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
