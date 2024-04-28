import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { DCText } from "@/components/DCText";
import { NunitoSans10ptBold } from "@/styles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
