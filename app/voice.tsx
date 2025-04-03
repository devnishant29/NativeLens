import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useRouter } from "expo-router";

const VoiceAssistantScreen = () => {
  const router = useRouter();

  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);
  const dot4 = useSharedValue(0);

  // Start animations
  React.useEffect(() => {
    const animateDots = () => {
      // Reset all dots
      dot1.value = 0;
      dot2.value = 0;
      dot3.value = 0;
      dot4.value = 0;

      // Animate each dot in sequence with a delay
      dot1.value = withRepeat(
        withSequence(
          withTiming(-10, { duration: 500 }),
          withTiming(0, { duration: 500 })
        ),
        -1, // infinite
        true // reverse
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

    animateDots();

    return () => {
      // Clean up animations
      dot1.value = 0;
      dot2.value = 0;
      dot3.value = 0;
      dot4.value = 0;
    };
  }, []);

  // Create animated styles for each dot
  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot1.value }],
  }));

  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot2.value }],
  }));

  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot3.value }],
  }));

  const dot4Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot4.value }],
  }));

  return (
    <View className="flex-1 bg-[#202124] justify-center items-center">
      {/* Top Bar with Back and Web Icons */}
      <View className="absolute top-12 left-4 right-4 flex-row justify-between px-4">
        <TouchableOpacity
          className="h-12 w-12 bg-[#5f6368] rounded-full items-center justify-center"
          onPress={() => router.back()}
        >
          <MaterialIcons name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="h-12 w-12 bg-[#5f6368] rounded-full items-center justify-center">
          <MaterialCommunityIcons name="web" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Speak Now Text */}
      <Text className="text-gray-300 text-lg mb-56">Speak now</Text>

      {/* Animated Dots */}
      <View className="flex-row gap-x-6 mb-10 items-center h-8">
        <Animated.View
          className="h-3 w-3 rounded-full bg-blue-500"
          style={dot1Style}
        />
        <Animated.View
          className="h-3 w-3 rounded-full bg-red-500"
          style={dot2Style}
        />
        <Animated.View
          className="h-3 w-3 rounded-full bg-yellow-500"
          style={dot3Style}
        />
        <Animated.View
          className="h-3 w-3 rounded-full bg-green-500"
          style={dot4Style}
        />
      </View>

      {/* Search Button */}
      <TouchableOpacity className="flex-row items-center bg-gray-700 px-5 py-3 rounded-full mt-48">
        <MaterialIcons name="music-note" size={24} color="white" />
        <Text className="text-white ml-2">Search a song</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VoiceAssistantScreen;
