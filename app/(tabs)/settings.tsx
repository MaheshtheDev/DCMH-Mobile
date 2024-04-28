import { StyleSheet } from "react-native";

import { Image } from "expo-image";

import { View } from "@/components/Themed";
import { DCText } from "@/components/DCText";
import { NunitoSans10ptBold, horizontalScale, verticalScale } from "@/styles";
import { Feather, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { Images } from "@/assets/images";
import { DCButton } from "@/components/DCButton";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View
        id="profile tile"
        style={{
          flexDirection: "row",
          paddingVertical: verticalScale(10),
          paddingHorizontal: horizontalScale(10),
        }}
      >
        <Image
          source={Images.hope}
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

      <View>
        <DCButton
          title="Donors"
          buttonStyle={{}}
          textStyle={{}}
          onPress={() => {}}
        />
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
