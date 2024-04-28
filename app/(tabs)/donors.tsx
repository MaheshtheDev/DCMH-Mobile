import { StyleSheet, View } from "react-native";

import { Image } from "expo-image";

import { DCText } from "@/components/DCText";
import { NunitoSansSemiBold, horizontalScale, verticalScale } from "@/styles";

export default function DonorsScreen() {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "white",
          marginVertical: verticalScale(20),
          marginHorizontal: horizontalScale(10),
          borderRadius: 5,
          paddingVertical: verticalScale(10),
          paddingHorizontal: horizontalScale(20),
        }}
      >
        <DCText textStyle={{
          fontSize: 18,
          fontFamily: NunitoSansSemiBold,
        }}>Alex Diaz</DCText>
        <DCText textStyle={{
          fontSize: 14,
        }}>
          Phone: 123-456-7890
        </DCText>
        <DCText textStyle={{
          fontSize: 14,
        }}>
          Email:{" "}
          <DCText
            textStyle={{
              color: "blue",
            }}
          >
            test@gmail.com
          </DCText>
        </DCText>
        <DCText>
          Donations made: 5
        </DCText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
