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
import { Alert, Platform, StyleSheet, TextInput } from "react-native";
import { Image } from "expo-image";

import { Text, View } from "react-native";
import { Images } from "@/assets/images";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { DCButton } from "@/components/DCButton";

export type ProductDetails = {
  title: string;
  image: string;
  description: string;
};

export default function ModalScreen() {
  const { productId } = useLocalSearchParams<{
    productId: string;
  }>();

  const [productDetails, setProductDetails] = useState<any>();
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    console.log("Product ID: ", productId);
    async function fetchProductDetails() {
      // Fetch product details from API
      let { data, error } = await supabase
        .from("inventory")
        .select("*")
        .eq("id", productId);

      if (error) {
        console.log("Error fetching product details");
        return;
      }
      console.log(data);
      setProductDetails(data[0]);
    }
    fetchProductDetails();
  }, [productId]);

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
          headerRight: () => (
            <DCButton
              title="Save"
              onPress={() => {
                async function updateInventory() {
                  const { data, error } = await supabase
                    .from("inventory")
                    .update({
                      available_quantity:
                        productDetails.available_quantity.toString(),
                    })
                    .eq("id", productId)
                    .select();

                  if (error) {
                    console.log("Error updating inventory");
                    return;
                  } else {
                    //router.back();
                  }
                }

                //TODO: Push notification to all donors
                async function pushNotification() {
                  if (
                    productDetails.available_quantity /
                      productDetails.max_quantity >
                    0.5
                  ) {
                    return;
                  }
                  const { data, error } = await supabase
                    .from("profiles")
                    .select("auth_token")
                    .eq("role", "donor");

                  if (error) {
                    console.log("Error fetching donor details");
                    return;
                  }

                  data.forEach(async (donor) => {
                    const message = {
                      sound: "default",
                      title: "Need your Help",
                      body:
                        "DCMH needs your help. The inventory for " +
                        productDetails.inventory_name +
                        " is almost out of stock.",
                      to: donor.auth_token,
                    };
                    await fetch("https://exp.host/--/api/v2/push/send", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Accept-encoding": "gzip, deflate",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(message),
                    });
                  });
                }

                Promise.all([updateInventory(), pushNotification()]).then(
                  () => {
                    router.back();
                    Alert.alert("Inventory updated successfully");
                  }
                );
              }}
              buttonStyle={{
                backgroundColor: "black",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
              }}
              textStyle={{
                color: "white",
                fontFamily: NunitoSansMedium,
                fontSize: 16,
              }}
            />
          ),
        }}
      />
      {productDetails && (
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
            }}
          >
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
                {productDetails.inventory_name}
              </DCText>
              <DCText
                textStyle={{
                  fontFamily: NunitoSansMedium,
                }}
              >
                {/*{productDetails.description}*/}
              </DCText>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                <Entypo
                  name="back-in-time"
                  size={12}
                  color={"black"}
                  style={{
                    opacity: 0.5,
                  }}
                />
                <DCText
                  textStyle={{
                    fontFamily: NunitoSans,
                    fontSize: 12,
                    opacity: 0.5,
                    marginLeft: 5,
                  }}
                >
                  Updated on 26th Apr
                </DCText>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: horizontalScale(10),
            }}
          >
            <View
              style={{
                backgroundColor: "black",
                borderRadius: 5,
                paddingHorizontal: horizontalScale(10),
                paddingVertical: verticalScale(5),
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                minWidth: "48%",
              }}
            >
              <DCText
                textStyle={{
                  fontSize: 16,
                  fontFamily: NunitoSansSemiBold,
                  color: "white",
                }}
              >
                Available Stock
              </DCText>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FontAwesome
                  name="minus-square"
                  size={32}
                  color="red"
                  onPress={() => {
                    let newQuantity = productDetails.available_quantity - 1;
                    setProductDetails({
                      ...productDetails,
                      available_quantity: newQuantity,
                    });
                    setEdited(true);
                  }}
                />
                <TextInput
                  value={productDetails.available_quantity.toString()}
                  style={{
                    width: 50,
                    textAlign: "center",
                    fontFamily: NunitoSans,
                    fontSize: 24,
                    borderColor: "grey",
                    borderRadius: 5,
                    marginHorizontal: 5,
                    color: "white",
                  }}
                ></TextInput>
                <FontAwesome
                  name="plus-square"
                  size={32}
                  color="white"
                  onPress={() => {
                    let newQuantity = productDetails.available_quantity + 1;
                    setProductDetails({
                      ...productDetails,
                      available_quantity: newQuantity,
                    });
                    setEdited(true);
                  }}
                />
              </View>
            </View>

            <View
              style={{
                minWidth: "45%",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "green",
                borderRadius: 5,
                paddingHorizontal: horizontalScale(10),
                paddingVertical: verticalScale(5),
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
                  value={productDetails.max_quantity.toString()}
                  style={{
                    textAlign: "center",
                    fontFamily: NunitoSans,
                    fontSize: 24,
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
            }}
          >
            <View
              style={{
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

            {/* TODO: Add flashlist of donations history */}
            <View
              style={{
                marginVertical: verticalScale(10),
                flexDirection: "row",
              }}
            >
              <DCText
                textStyle={{
                  fontFamily: NunitoSans,
                  fontSize: 14,
                  opacity: 0.5,
                }}
              >
                23rd Apr 2024 -{" "}
              </DCText>
              <DCText>5 units donated by John Doe</DCText>
            </View>
          </View>
        </>
      )}

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
