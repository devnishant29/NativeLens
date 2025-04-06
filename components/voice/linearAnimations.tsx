import { View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

type DotProps = {
  delay: number;
  color: string;
};

const dot1 = useSharedValue(0);
const dot2 = useSharedValue(0);
const dot3 = useSharedValue(0);
const dot4 = useSharedValue(0);

export const startDotsAnimation = () => {
  dot1.value = withRepeat(
    withSequence(
      withTiming(-10, { duration: 500 }),
      withTiming(0, { duration: 500 })
    ),
    -1,
    true
  );

  setTimeout(() => {
    dot2.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 500 }),
        withTiming(0, { duration: 500 })
      ),
      -1,
      true
    );
  }, 100);
  setTimeout(() => {
    dot3.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 500 }),
        withTiming(0, { duration: 500 })
      ),
      -1,
      true
    );
  }, 200);
  setTimeout(() => {
    dot4.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 500 }),
        withTiming(0, { duration: 500 })
      ),
      -1,
      true
    );
  }, 300);
};

const BouncingDot = ({ delay, color }: DotProps) => {
  // ✅ Hooks at top level
  const value = useSharedValue(0);

  // ✅ Side effect on mount to start animation
  useEffect(() => {
    value.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-10, {
            duration: 300,
            easing: Easing.out(Easing.quad),
          }),
          withTiming(0, {
            duration: 300,
            easing: Easing.in(Easing.quad),
          })
        ),
        -1,
        false
      )
    );
  }, []);

  // ✅ Valid hook usage
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: value.value }],
  }));

  return (
    <Animated.View
      className="h-3 w-3 rounded-full"
      style={[{ backgroundColor: color }, animatedStyle]}
    />
  );
};

const EnchancedinearAnimations = () => {
  return (
    <View className="flex-row gap-x-6 items-center">
      <BouncingDot delay={0} color="#4384f4" />
      <BouncingDot delay={100} color="#e94234" />
      <BouncingDot delay={200} color="#fdbd03" />
      <BouncingDot delay={300} color="#32a951" />
    </View>
  );
};

export default EnchancedinearAnimations;
