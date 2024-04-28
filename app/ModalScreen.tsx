import { DCText } from "@/components/DCText";
import {
  NunitoSans,
  NunitoSansMedium,
  NunitoSansSemiBold,
  horizontalScale,
  verticalScale,
} from "@/styles";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, TextInput, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { View } from "react-native";
import { Images } from "@/assets/images";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ProductDetails } from "./modal";

export default function ModalScreen() {
  const { productId } = useLocalSearchParams<{
    productId: string;
  }>();

  const productDetails: ProductDetails = {
    title: "Food",
    image: "https://example.com/food.jpg",
    description: "This is a description of the product.",
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Product Details",
          headerTitleStyle: {
            fontFamily: NunitoSansSemiBold,
          },
          headerLeft: () => (
            <MaterialIcons
              name="cancel"
              size={26}
              color="black"
              onPress={() => {
                router.back();
              }}
            />
          ),
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Image
          source={Images.food}
          style={{
            width: 75,
            height: 75,
          }}
        ></Image>
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <DCText
            textStyle={{
              fontFamily: NunitoSansSemiBold,
              fontSize: 20,
            }}
          >
            {productDetails.title}
          </DCText>
          <DCText
            textStyle={{
              fontFamily: NunitoSansMedium,
            }}
          >
            {productDetails.description}
          </DCText>
        </View>
      </View>

      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          marginHorizontal: horizontalScale(10),
        }}
      >
        <View
          style={{
            //backgroundColor: "black",
            borderRadius: 5,
            paddingHorizontal: horizontalScale(10),
            paddingVertical: verticalScale(5),
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            //width: "48%",
          }}
        >
          <DCText
            textStyle={{
              fontSize: 16,
              fontFamily: NunitoSansSemiBold,
              color: "white",
            }}
          >
            Quantity
          </DCText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome name="minus-square" size={20} color="red" />
            <TextInput
              value="5"
              style={{
                width: 15,
                textAlign: "center",
                fontFamily: NunitoSans,
                fontSize: 20,
                borderColor: "grey",
                //borderWidth: 1,
                borderRadius: 5,
                marginHorizontal: 5,
                color: "white",
              }}
            ></TextInput>
            <FontAwesome name="plus-square" size={20} color="white" />
          </View>
        </View>

        <View
          style={{
            minWidth: "45%",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "green",
            borderRadius: 5,
            paddingHorizontal: horizontalScale(10),
            paddingVertical: verticalScale(5),
            marginTop: verticalScale(10),
          }}
        >
          <DCText
            textStyle={{
              fontFamily: NunitoSansSemiBold,
              fontSize: 16,
              color: "white",
            }}
          >
            Max Capacity
          </DCText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              value="5"
              style={{
                textAlign: "center",
                fontFamily: NunitoSans,
                fontSize: 20,
                borderColor: "grey",
                //borderWidth: 1,
                borderRadius: 5,
                color: "white",
              }}
            ></TextInput>
          </View>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: horizontalScale(10),
          borderBottomWidth: 1,
          borderBottomColor: "black",
        }}
      >
        <DCText
          textStyle={{
            fontFamily: NunitoSansSemiBold,
            fontSize: 16,
            marginTop: verticalScale(10),
          }}
        >
          Donation History
        </DCText>
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
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
