import { Alert, Pressable, StyleSheet } from "react-native";

import { Image } from "expo-image";

import { Text, View } from "react-native";
import { DCText } from "@/components/DCText";
import { NunitoSans10ptBold, horizontalScale, verticalScale } from "@/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Images } from "@/assets/images";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { FlashList } from "@shopify/flash-list";

export default function TabOneScreen() {
  const router = useRouter();

  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      let { data, error } = await supabase.from("inventory").select("*");
      if (error) {
        Alert.alert("Error fetching Inventory");
      }
      // console.log(data, "Consoleeee");
      setInventory(data);
    };
    fetchInventory();
  }, []);

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

      <FlashList
        data={inventory}
        numColumns={2}
        renderItem={({ item }) => (
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
              title={item.inventory_name}
              image={item.image_url}
              onPress={() =>
                router.push({
                  pathname: "/modal",
                  params: {
                    productId: "2",
                  },
                })
              }
            />
          </View>
        )}
        estimatedItemSize={100}
      />
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
    width: "90%",
  },
});
