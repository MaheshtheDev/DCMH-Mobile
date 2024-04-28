import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "./lib/supabase";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
  NunitoSans,
  NunitoSansMedium,
  NunitoSansSemiBold,
  horizontalScale,
  verticalScale,
} from "@/styles";
import { TextInput, View } from "react-native";
import { DCText } from "@/components/DCText";
import { DCButton } from "@/components/DCButton";
import { Image } from "expo-image";
import * as Linking from "expo-linking";

export default function DonorModal() {
  const { productId } = useLocalSearchParams<{
    productId: string;
  }>();

  const [productDetails, setProductDetails] = useState<any>();
  const [edited, setEdited] = useState(false);
  const [donationQuantity, setDonationQuantity] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  const [userId, setUserId] = useState<any>({});

  useEffect(() => {
    console.log("Product ID: ", productId);
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      //  let metadata = user.user_metadata;
      setUserId(user);
    };
    fetchUserData();
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
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        //justifyContent: "flex-start",
      }}
    >
      <Stack.Screen
        options={{
          title: "Item Donation",
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
                  fontSize: 26,
                }}
              >
                {productDetails.inventory_name}
              </DCText>
              <DCText
                textStyle={{
                  fontFamily: NunitoSansMedium,
                }}
              >
                {productDetails.description}
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
              marginTop: 10,
              marginHorizontal: horizontalScale(20),
              padding: 10,
              backgroundColor: "#F5F5F5",
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <DCText>Quantity Needed </DCText>
            <DCText>
              {productDetails.max_quantity - productDetails.available_quantity}
            </DCText>
          </View>

          <View
            style={{
              marginTop: 5,
              marginHorizontal: horizontalScale(20),
              padding: 10,
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <DCText>Quantity willing to Donate </DCText>
            <TextInput
              value={donationQuantity.toString()}
              onChangeText={(text) => {
                setDonationQuantity(parseInt(text));
              }}
              placeholder="5"
              inputMode="numeric"
              style={{
                paddingVertical: verticalScale(10),
                paddingHorizontal: horizontalScale(2),
                borderRadius: 10,
                backgroundColor: "#F5F5F5",
                width: "10%",
                textAlign: "center",
              }}
            ></TextInput>
          </View>

          <DCButton
            title={inProgress ? "Redirecting to Walmart..." : "Donate Now"}
            onPress={() => {
              if (donationQuantity > 0) {
                setInProgress(true);
                const newDonation = async () => {
                  let { data, error } = await supabase
                    .from("donations")
                    .insert([
                      {
                        inventory_id: productId,
                        quantity_ordered: donationQuantity,
                        request_status: "pending",
                        auth_user_id: userId.id,
                        donor_name:
                          userId.user_metadata.first_name +
                          " " +
                          userId.user_metadata.last_name,
                        donor_phone: userId.user_metadata.phoneNumber,
                        inventory_name: productDetails.inventory_name,
                      },
                    ]);

                  if (error) {
                    console.log("Error inserting donation");
                    console.log(error);
                    return;
                  }
                };

                const updateInventory = async () => {
                  const { data, error } = await supabase
                    .from("inventory")
                    .update({
                      available_quantity:
                        productDetails.available_quantity + donationQuantity,
                    })
                    .eq("id", productId)
                    .select();

                  if (error) {
                    console.log("Error updating inventory");
                    return;
                  } else {
                    console.log("Inventory updated successfully");
                  }
                };

                Promise.all([newDonation(), updateInventory()]).then(() => {
                  setInProgress(false);
                  Linking.openURL(productDetails.website_url);
                  router.back();
                });
              }
            }}
            buttonStyle={{
              marginHorizontal: horizontalScale(20),
              marginVertical: verticalScale(20),
              paddingVertical: verticalScale(10),
              paddingHorizontal: horizontalScale(20),
              borderRadius: 10,
              backgroundColor: "black",
              opacity: donationQuantity > 0 ? 1 : 0.5,
            }}
            textStyle={{
              fontSize: 18,
              color: "white",
              fontFamily: NunitoSansSemiBold,
              textAlign: "center",
            }}
          ></DCButton>
        </>
      )}
    </View>
  );
}
