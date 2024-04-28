import { TextProps, Text, TextStyle, StyleProp } from "react-native";
import { NunitoSans } from "@/styles";

interface RFTextProps extends TextProps {
  children: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
}

/**
 * Renders the RF Custom Text component with custom Default font.
 * @param children The text to render.
 * @param textStyle The style to apply to the text.
 * @returns The RFText component.
 */
export const DCText: React.FC<RFTextProps> = ({ children, textStyle }) => {
  return (
    <Text style={[{ fontFamily: NunitoSans }, textStyle]}>{children}</Text>
  );
};
