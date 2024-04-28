import { Pressable, StyleSheet } from "react-native";

import { Image } from "expo-image";

import { Text, View } from "react-native";
import { DCText } from "@/components/DCText";
import { NunitoSans10ptBold, horizontalScale, verticalScale } from "@/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Images } from "@/assets/images";
import { useRouter } from "expo-router";

export default function TabOneScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "flex-start",
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
          Davis Community
        </DCText>
      </View>

      <View
        style={{
          marginTop: verticalScale(5),
          marginHorizontal: horizontalScale(10),
          flexDirection: "row",
          justifyContent: "space-around",
          gap: 5,
          flexWrap: "wrap",
        }}
      >
        <ItemTile
          title="Food"
          image={Images.food}
          onPress={() =>
            router.push({
              pathname: "/modal",
              params: {
                productId: "2",
              },
            })
          }
        />
        <ItemTile
          title="Bowls"
          image={Images.hope}
          onPress={() => console.log("Housing")}
        />
        <ItemTile
          title="Plates"
          image={Images.hope}
          onPress={() => console.log("Housing")}
        />
        <ItemTile
          title="Cereal"
          image={Images.hope}
          onPress={() => console.log("Housing")}
        />
      </View>
    </SafeAreaView>
  );
}

function ItemTile({
  title,
  image,
  onPress,
  style,
  ...props
}: {
  title: string;
  image: string;
  onPress: () => void;
  style?: any;
  props?: any;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "white",
        marginVertical: verticalScale(3),
        borderRadius: 10,
        minWidth: "45%",
        alignItems: "flex-start",
      }}
    >
      <View
        style={{
          paddingHorizontal: horizontalScale(10),
          paddingVertical: verticalScale(10),
          alignItems: "center",
          alignContent: "center",
          width: "100%",
        }}
      >
        <Image
          source={image}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            alignContent: "center",
          }}
        />
        <View
          style={{
            width: "100%",
          }}
        >
          <DCText
            textStyle={{
              fontSize: 16,
              fontFamily: NunitoSans10ptBold,
              textAlign: "left",
              color: "black",
            }}
          >
            {title}
          </DCText>
          <View
            style={{
              borderRadius: 5,
              width: "auto",
            }}
          >
            <DCText>QTY: 5 out of 30</DCText>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
          borderEndEndRadius: 5,
          borderBottomStartRadius: 5,
          padding: 5,
        }}
      >
        <DCText
          textStyle={{
            fontSize: 14,
            fontFamily: NunitoSans10ptBold,
            textAlign: "center",
            color: "white",
          }}
        >
          Out of Stock
        </DCText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "white",
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
