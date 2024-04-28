import { Alert, StyleSheet, View } from "react-native";

import { Image } from "expo-image";

import { DCText } from "@/components/DCText";
import { NunitoSansSemiBold, horizontalScale, verticalScale } from "@/styles";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { FlashList } from "@shopify/flash-list";

export default function DonorsScreen() {
  const [donors, setDonars] = useState([]);

  useEffect(() => {
    const fetchDonars = async () => {
      let { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "donor");
      if (error) {
        Alert.alert("Error caught up");
      }
      setDonars(data);
    };
    fetchDonars();
  }, []);
  return (
    <View style={styles.container}>
      <FlashList
        data={donors}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              marginVertical: verticalScale(10),
              marginHorizontal: horizontalScale(10),
              borderRadius: 5,
              paddingVertical: verticalScale(10),
              paddingHorizontal: horizontalScale(20),
            }}
          >
            <DCText
              textStyle={{
                fontSize: 18,
                fontFamily: NunitoSansSemiBold,
              }}
            >
              {item.first_name} {item.last_name}
            </DCText>
            <DCText
              textStyle={{
                fontSize: 14,
              }}
            >
              Phone: {item.phone_number}
            </DCText>
            <DCText
              textStyle={{
                fontSize: 14,
              }}
            >
              Email:{" "}
              <DCText
                textStyle={{
                  color: "blue",
                }}
              >
                {item.email_id}
              </DCText>
            </DCText>
            <DCText>Donations made: 5</DCText>
          </View>
        )}
        estimatedItemSize={100}
      />
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
    marginVertical: 15,
    height: 1,
    width: "80%",
  },
});
