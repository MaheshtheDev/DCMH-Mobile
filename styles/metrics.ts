import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * @description This is a helper function to scale the size of the components horizontally
 */
const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;

/**
 * @description This is a helper function to scale the size of the components vertically
 */
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;

/**
 * @description This is a helper function to scale the size of the components moderately
 */
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };
