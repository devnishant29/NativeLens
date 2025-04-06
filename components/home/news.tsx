import { Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";

const News = () => {
  return (
    <View className="pb-16">
      <View className="mx-4 mb-4 bg-[#2f3133] rounded-xl overflow-hidden">
        <Image
          // source={require("./assets/person-image.jpg")}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-white text-xl font-medium" numberOfLines={3}>
            This superstar was Ratan Tata's closest friend, shared same room,
            went for picnics, listened songs toge...
          </Text>
        </View>
      </View>
      <View className="mx-4 mb-4 bg-[#2f3133] rounded-xl overflow-hidden">
        <Image
          // source={require("./assets/person-image.jpg")}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-white text-xl font-medium" numberOfLines={3}>
            This superstar was Ratan Tata's closest friend, shared same room,
            went for picnics, listened songs toge...
          </Text>
        </View>
      </View>
      <View className="mx-4 mb-4 bg-[#2f3133] rounded-xl overflow-hidden">
        <Image
          // source={require("./assets/person-image.jpg")}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="p-4">
          <Text className="text-white text-xl font-medium" numberOfLines={3}>
            This superstar was Ratan Tata's closest friend, shared same room,
            went for picnics, listened songs toge...
          </Text>
        </View>
      </View>
    </View>
  );
};

export default News;
