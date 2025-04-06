import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";

export default function EnhancedCircularAnimation() {
  const rotation = useSharedValue(0);
  const dynamicRadius = useSharedValue(10); // start with default radius

  useEffect(() => {
    // Infinite spinning
    rotation.value = withRepeat(
      withTiming(2 * Math.PI, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    // Pulsating effect (radius expands and shrinks continuously)
    dynamicRadius.value = withRepeat(
      withSequence(
        withTiming(25, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(15, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  // Animated styles for each dot with respective offsets
  const createDotStyle = (angleOffset: number) =>
    useAnimatedStyle(() => {
      const angle = rotation.value + angleOffset;
      return {
        transform: [
          { translateX: dynamicRadius.value * Math.cos(angle) },
          { translateY: dynamicRadius.value * Math.sin(angle) },
        ],
      };
    });

  const greenDotStyle = createDotStyle(0);
  const yellowDotStyle = createDotStyle(Math.PI / 2);
  const redDotStyle = createDotStyle(Math.PI);
  const blueDotStyle = createDotStyle((3 * Math.PI) / 2);

  return (
    <View className="h-16 w-16 items-center justify-center">
      <View className="relative h-16 w-16 flex items-center justify-center">
        <Animated.View
          className="absolute h-3 w-3 rounded-full bg-[#32a951] left-1/2 top-1/2"
          style={[greenDotStyle, { marginLeft: -6, marginTop: -6 }]}
        />
        <Animated.View
          className="absolute h-3 w-3 rounded-full bg-[#fdbd03] left-1/2 top-1/2"
          style={[yellowDotStyle, { marginLeft: -6, marginTop: -6 }]}
        />
        <Animated.View
          className="absolute h-3 w-3 rounded-full bg-[#e94234] left-1/2 top-1/2"
          style={[redDotStyle, { marginLeft: -6, marginTop: -6 }]}
        />
        <Animated.View
          className="absolute h-3 w-3 rounded-full bg-[#4384f4] left-1/2 top-1/2"
          style={[blueDotStyle, { marginLeft: -6, marginTop: -6 }]}
        />
      </View>
    </View>
  );
}
