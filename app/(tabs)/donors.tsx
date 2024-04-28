import { StyleSheet } from "react-native";

import { Image } from "expo-image";

import { View } from "@/components/Themed";
import { DCText } from "@/components/DCText";
import { NunitoSans10ptBold, horizontalScale, verticalScale } from "@/styles";
import { Feather, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { Images } from "@/assets/images";
import { DCButton } from "@/components/DCButton";

export default function DonorsScreen() {
  return (
    <View style={styles.container}>
      
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
