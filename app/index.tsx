import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

import GoogleAccountModal from "@/components/GoogleAccountModal";

export default function App() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView className="flex-1 bg-[#202124]">
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 pt-12 pb-4">
        <View>
          <Octicons name="beaker" size={24} color="white" />
        </View>

        <View className="flex-row gap-x-8 items-center bg-slate-700 px-3 p-3 rounded-3xl ml-6">
          <View className="flex-row gap-x-4 bg-gray-900 rounded-2xl px-3 py-3">
            <AntDesign name="google" size={24} color="white" />
            <Text className="text-white text-base font-medium">Search</Text>
          </View>
          <MaterialCommunityIcons
            name="star-four-points"
            size={20}
            color="#8ab4f8"
          />
        </View>

        <TouchableOpacity
          className="h-10 w-10 bg-[#5f6368] rounded-full items-center justify-center"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-white text-xl font-medium">A</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Google Logo */}
        <View className="items-center justify-center mt-6 mb-6">
          <Text className="text-white text-6xl font-bold">Google</Text>
        </View>

        {/* Search Bar */}
        <View className="mx-4 mb-6">
          <View className="flex-row items-center bg-[#303134] rounded-full py-6 px-4">
            {/* Search icon - part of the main search area */}
            <Ionicons name="search" size={22} color="#9aa0a6" />

            {/* Main search area touchable */}
            <TouchableOpacity
              className="flex-1"
              onPress={() => router.push("/search")}
            >
              <Text className="text-white text-base mx-2">Search</Text>
            </TouchableOpacity>

            {/* Voice search button - separate touchable */}
            <TouchableOpacity
              className="mr-4 w-8 h-8 items-center justify-center"
              onPress={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                router.push("/voice");
              }}
            >
              <MaterialIcons name="keyboard-voice" size={24} color="#8ab4f8" />
            </TouchableOpacity>

            {/* Camera/Lens button - separate touchable */}
            <TouchableOpacity
              className="w-8 h-8 items-center justify-center"
              onPress={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                router.push("/camera");
              }}
            >
              <MaterialCommunityIcons
                name="google-lens"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Shortcut Icons */}
        <View className="flex-row justify-between px-4 mb-6">
          <TouchableOpacity className="items-center justify-center bg-[#5f4f2a] w-16 h-16 rounded-full">
            <MaterialIcons name="image-search" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="items-center justify-center bg-[#344558] w-16 h-16 rounded-full">
            <MaterialIcons name="translate" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="items-center justify-center bg-[#2d4233] w-16 h-16 rounded-full">
            <SimpleLineIcons name="graduation" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="items-center justify-center bg-[#4d3238] w-16 h-16 rounded-full">
            <Ionicons name="musical-note" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Weather and Air Quality Cards */}
        <View className="flex-row px-4 mb-4">
          <View className="flex-1 bg-[#303134] mr-2 rounded-xl p-4">
            <Text className="text-white text-lg font-medium">Gurugram</Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-white text-5xl">30°</Text>
              <Ionicons name="moon" size={32} color="#e8eaed" />
            </View>
          </View>

          <View className="flex-1 bg-[#303134] ml-2 rounded-xl p-4">
            <Text className="text-white text-base">Air quality · 170</Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-white text-2xl">Moderate</Text>
              <View className="bg-[#fde047] h-10 w-10 rounded-full items-center justify-center">
                <MaterialCommunityIcons name="waves" size={24} color="black" />
              </View>
            </View>
          </View>
        </View>

        {/* News Card */}
        <View className="pb-16">
          <View className="mx-4 mb-4 bg-[#303134] rounded-xl overflow-hidden">
            <Image
              // source={require("./assets/person-image.jpg")}
              className="w-full h-48"
              resizeMode="cover"
            />
            <View className="p-4">
              <Text
                className="text-white text-xl font-medium"
                numberOfLines={3}
              >
                This superstar was Ratan Tata's closest friend, shared same
                room, went for picnics, listened songs toge...
              </Text>
            </View>
          </View>
          <View className="mx-4 mb-4 bg-[#303134] rounded-xl overflow-hidden">
            <Image
              // source={require("./assets/person-image.jpg")}
              className="w-full h-48"
              resizeMode="cover"
            />
            <View className="p-4">
              <Text
                className="text-white text-xl font-medium"
                numberOfLines={3}
              >
                This superstar was Ratan Tata's closest friend, shared same
                room, went for picnics, listened songs toge...
              </Text>
            </View>
          </View>
          <View className="mx-4 mb-4 bg-[#303134] rounded-xl overflow-hidden">
            <Image
              // source={require("./assets/person-image.jpg")}
              className="w-full h-48"
              resizeMode="cover"
            />
            <View className="p-4">
              <Text
                className="text-white text-xl font-medium"
                numberOfLines={3}
              >
                This superstar was Ratan Tata's closest friend, shared same
                room, went for picnics, listened songs toge...
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 w-full flex-row justify-around pt-3 pb-6 bg-[#202124] border-t border-[#3c4043]">
        <TouchableOpacity className="items-center">
          <Ionicons name="home" size={24} color="#8ab4f8" />
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={24}
            color="gray"
          />
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <Ionicons name="notifications-outline" size={24} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <MaterialIcons name="menu" size={24} color="gray" />
        </TouchableOpacity>
        <GoogleAccountModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </SafeAreaView>
  );
}
