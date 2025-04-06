import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SquareBorderOverlay = () => {
  return (
    <View className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-28 opacity-50">
      <View className="relative w-64 h-64">
        <View className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-white rounded-tl-md"></View>
        <View className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-white rounded-tr-md"></View>
        <View className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-white rounded-bl-md"></View>
        <View className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-white rounded-br-md"></View>
      </View>
      <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56">
        <View className="absolute -top-1 -left-1 w-10 h-10 border-t-2 border-l-2 border-white rounded-tl-3xl"></View>
        <View className="absolute -top-1 -right-1 w-10 h-10 border-t-2 border-r-2 border-white rounded-tr-3xl"></View>
        <View className="absolute -bottom-1 -left-1 w-10 h-10 border-b-2 border-l-2 border-white rounded-bl-3xl"></View>
        <View className="absolute -bottom-1 -right-1 w-10 h-10 border-b-2 border-r-2 border-white rounded-br-3xl"></View>
      </View>
    </View>
  );
};

export default SquareBorderOverlay;

const styles = StyleSheet.create({});
