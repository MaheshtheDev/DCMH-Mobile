import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

import {
  Feather,
  FontAwesome,
  AntDesign,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

import { DCText } from "./DCText";

interface DCButtonProps {
  title: ReactNode;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  spinner?: boolean;
  url?:
    | "whatsapp"
    | "assign"
    | "ban"
    | "swap"
    | "login"
    | "logout"
    | "check"
    | "image"
    | "parking"
    | "sticky-note";
  imageColor?: string;
  imageSize?: number;
  disabled?: boolean;
}

/**
 * Renders the RFButton component.
 * @param param0
 * @returns
 */
export const DCButton: React.FC<DCButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  spinner,
  url,
  imageColor,
  imageSize,
  disabled,
}) => {

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1, // Dim effect
        },
        buttonStyle,
      ]}
      onPress={onPress}
      onStartShouldSetResponder={() => true}
      disabled={disabled}
    >
      {spinner && <ActivityIndicator size="small" color="white" />}
      <DCText textStyle={textStyle}>{title}</DCText>
    </Pressable>
  );
};
