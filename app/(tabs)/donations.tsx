import { Pressable, StyleSheet, View } from "react-native";

import { Image } from "expo-image";

import { DCText } from "@/components/DCText";
import {
  NunitoSans10ptBold,
  NunitoSansSemiBold,
  horizontalScale,
  verticalScale,
} from "@/styles";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function DonationsScreen() {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.navBarView}>
        <Pressable
          style={
            selectedTab == 0 ? styles.selectedNavItemView : styles.navItemView
          }
          onPress={() => setSelectedTab(0)}
        >
          <DCText
            textStyle={{
              fontSize: 16,
              fontFamily: NunitoSansSemiBold,
            }}
          >
            Pending
          </DCText>
        </Pressable>
        <Pressable
          style={
            selectedTab == 1 ? styles.selectedNavItemView : styles.navItemView
          }
          onPress={() => setSelectedTab(1)}
        >
          <DCText
            textStyle={{
              fontSize: 16,
            }}
          >
            Current
          </DCText>
        </Pressable>
      </View>
      <View
        style={{
          marginHorizontal: horizontalScale(20),
        }}
      >
        <PendingDonation />
      </View>
    </View>
  );
}

function PendingDonation() {
  return (
    <View
      style={{
        justifyContent: "space-between",
        marginVertical: verticalScale(10),
        padding: horizontalScale(10),
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
      }}
    >
      <DCText
        textStyle={{
          fontSize: 18,
          fontFamily: NunitoSans10ptBold,
        }}
      >
        Breads
      </DCText>
      <View>
        <DCText>Donor: Andrew Garfold</DCText>
        <DCText>Donor Contact: 562 734 5678</DCText>
        <DCText>Ordered Quantity: 5</DCText>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Pressable style={styles.receivedButton}>
          <AntDesign name="checkcircle" size={20} color="white" />
          <DCText textStyle={{ color: "white", marginLeft: verticalScale(6) }}>
            Received
          </DCText>
        </Pressable>
        <Pressable style={styles.cancelOrderButton}>
          <AntDesign name="closecircle" size={20} color="white" />
          <DCText textStyle={{ color: "white", marginLeft: verticalScale(4), textAlign: 'center' }}>
            Cancelled
          </DCText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  navBarView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: verticalScale(10),
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    paddingBottom: verticalScale(10),
  },
  selectedNavItemView: {
    flexDirection: "row",
    justifyContent: "center",
    minWidth: "42%",
  },
  navItemView: {
    flexDirection: "row",
    justifyContent: "center",
    minWidth: "42%",
    opacity: 0.5,
  },
  receivedButton: {
    backgroundColor: "#4CAF50",
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    width: "45%",
  },
  cancelOrderButton: {
    backgroundColor: "#F44336",
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    paddingVertical: verticalScale(5),
    width: "45%",
  },
});
