import { Alert, Pressable, ScrollView, StyleSheet } from "react-native";

import { Image } from "expo-image";

import * as Linking from "expo-linking";

import { Text, View } from "react-native";
import { DCText } from "@/components/DCText";
import { NunitoSans10ptBold, horizontalScale, verticalScale } from "@/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Images } from "@/assets/images";
import { useFocusEffect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { FlashList } from "@shopify/flash-list";
import { DCButton } from "@/components/DCButton";
import React from "react";

export default function DonorsHomeScreen() {
  const router = useRouter();

  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      foruseEffect();
    }, [])
  );

  function foruseEffect() {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      let metadata = user.user_metadata;
    };
    fetchUserData();
    const fetchInventory = async () => {
      let { data, error } = await supabase.from("inventory").select("*");
      if (error) {
        Alert.alert("Error fetching Inventory");
      }
      // console.log(data, "Consoleeee");
      if (data & (data.length == 0)) {
        return;
      }
      setInventory(data);
      setFilteredInventory(
        data
          .filter((item) => item.category_id === 1)
          .sort((a, b) => {
            return a.available_quantity / a.max_quantity >
              b.available_quantity / b.max_quantity
              ? 1
              : -1;
          })
          .filter((item) => item.available_quantity / item.max_quantity < 0.9)
      );
    };
    fetchInventory();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          paddingHorizontal: horizontalScale(15),
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
        <Image
          source={Images.donate}
          style={{
            width: 25,
            height: 25,
            resizeMode: "contain",
            alignContent: "center",
          }}
          onTouchEnd={() => {
            Alert.alert(
              "Donate to DCMH",
              "Support Davis Community Meals and Housing with a donation.",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Donate",
                  style: "default",
                  onPress: () => {
                    Linking.openURL(
                      "https://interland3.donorperfect.net/weblink/weblink.aspx?name=E357416&id=1"
                    );
                  },
                },
              ]
            );
          }}
        ></Image>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "space-between",
          marginHorizontal: horizontalScale(8),
          marginTop: verticalScale(2),
          marginBottom: verticalScale(4),
        }}
      >
        <ScrollView
          horizontal
          style={{ flexDirection: "row" }}
          showsHorizontalScrollIndicator={false}
        >
          <DCButton
            title="Food & Supplies"
            onPress={() => {
              setSelectedFilter(0);
              setFilteredInventory(
                inventory
                  .filter((item) => item.category_id === 1)
                  .sort((a, b) => {
                    return a.available_quantity / a.max_quantity >
                      b.available_quantity / b.max_quantity
                      ? 1
                      : -1;
                  })
                  .filter(
                    (item) => item.available_quantity / item.max_quantity < 0.9
                  )
              );
            }}
            buttonStyle={
              selectedFilter == 0
                ? styles.activeFilterButton
                : styles.filterButton
            }
            textStyle={
              selectedFilter == 0 ? { color: "white" } : { color: "black" }
            }
          ></DCButton>
          <DCButton
            title="Cleaning Sanitizing"
            onPress={() => {
              setSelectedFilter(1);
              setFilteredInventory(
                inventory
                  .filter((item) => item.category_id === 2)
                  .sort((a, b) => {
                    return a.available_quantity / a.max_quantity >
                      b.available_quantity / b.max_quantity
                      ? 1
                      : -1;
                  })
                  .filter(
                    (item) => item.available_quantity / item.max_quantity < 0.9
                  )
              );
            }}
            buttonStyle={
              selectedFilter == 1
                ? styles.activeFilterButton
                : styles.filterButton
            }
            textStyle={
              selectedFilter == 1 ? { color: "white" } : { color: "black" }
            }
          ></DCButton>
          <DCButton
            title="Hygiene"
            onPress={() => {
              setSelectedFilter(2);
              setFilteredInventory(
                inventory
                  .filter((item) => item.category_id === 3)
                  .sort((a, b) => {
                    return a.available_quantity / a.max_quantity >
                      b.available_quantity / b.max_quantity
                      ? 1
                      : -1;
                  })
                  .filter(
                    (item) => item.available_quantity / item.max_quantity < 0.9
                  )
              );
            }}
            buttonStyle={
              selectedFilter == 2
                ? styles.activeFilterButton
                : styles.filterButton
            }
            textStyle={
              selectedFilter == 2 ? { color: "white" } : { color: "black" }
            }
          ></DCButton>
          <DCButton
            title="Medicine"
            onPress={() => {
              setSelectedFilter(3);
              setFilteredInventory(
                inventory
                  .filter((item) => item.category_id === 4)
                  .sort((a, b) => {
                    return a.available_quantity / a.max_quantity >
                      b.available_quantity / b.max_quantity
                      ? 1
                      : -1;
                  })
                  .filter(
                    (item) => item.available_quantity / item.max_quantity < 0.9
                  )
              );
            }}
            buttonStyle={
              selectedFilter == 3
                ? styles.activeFilterButton
                : styles.filterButton
            }
            textStyle={
              selectedFilter == 3 ? { color: "white" } : { color: "black" }
            }
          ></DCButton>
        </ScrollView>
      </View>
      <FlashList
        data={filteredInventory.length > 0 ? filteredInventory : inventory}
        numColumns={2}
        renderItem={({ item }) => (
          <ItemTile
            title={item.inventory_name}
            image={item.image_url}
            item={item}
          />
        )}
        estimatedItemSize={100}
      />
    </SafeAreaView>
  );
}

function ItemTile({
  title,
  image,
  item,
  style,
  ...props
}: {
  title: string;
  image: string;
  item: any;
  style?: any;
  props?: any;
}) {
  const [stage, setStage] = useState(0);
  const router = useRouter();

  function getStockDetail() {
    const ratio = item.available_quantity / item.max_quantity;
    if (ratio >= 0.9) {
      //return "In Stock";
      setStage(0);
    } else if (ratio >= 0.4) {
      //return "Low Stock";
      setStage(1);
    } else {
      //return "Out of Stock";
      setStage(2);
    }
  }

  useEffect(() => {
    getStockDetail();
  });

  return (
    <Pressable
      onPress={() => {
        if (stage == 0) {
          Alert.alert(
            title + "are in Stock!",
            "Please donate other items, if possible."
          );
        } else {
          router.push({
            pathname: "/donorModal",
            params: {
              productId: item.id,
            },
          });
        }
      }}
      style={{
        backgroundColor: "white",
        marginVertical: verticalScale(3),
        marginHorizontal: horizontalScale(5),
        borderRadius: 10,
        minWidth: "95%",
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
            <DCText>
              QTY: {item.available_quantity} out of {item.max_quantity}
            </DCText>
          </View>
        </View>
      </View>
      {
        {
          0: (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "green",
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
                In Stock
              </DCText>
            </View>
          ),
          1: (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "orange",
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
                  color: "black",
                }}
              >
                Low Stock
              </DCText>
            </View>
          ),
          2: (
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
          ),
        }[stage]
      }
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
    width: "90%",
  },
  filterButton: {
    backgroundColor: "lightgrey",
    marginRight: horizontalScale(4),
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(12),
    borderRadius: 20,
  },
  activeFilterButton: {
    backgroundColor: "green",
    marginRight: horizontalScale(4),
    paddingVertical: verticalScale(4),
    paddingHorizontal: horizontalScale(12),
    borderRadius: 20,
  },
});
