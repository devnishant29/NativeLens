import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const VoiceAssistantScreen = () => {
  const animatedValues = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    animatedValues.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 500,
            delay: index * 200,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  return (
    <View className="flex-1 bg-gray-900 justify-center items-center">
      <Text className="text-gray-300 text-lg mb-10">Speak now</Text>

      {/* Animated Dots */}
      <View className="flex-row space-x-2 mb-10">
        {["blue-500", "red-500", "yellow-500", "green-500"].map(
          (color, index) => (
            <Animated.View
              key={index}
              className={`h-3 w-3 rounded-full bg-${color}`}
              style={{ opacity: animatedValues[index] }}
            />
          )
        )}
      </View>

      {/* Search Button */}
      <TouchableOpacity className="flex-row items-center bg-gray-700 px-5 py-3 rounded-full">
        <FontAwesome5 name="music" size={16} color="white" />
        <Text className="text-white ml-2">Search a song</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VoiceAssistantScreen;
