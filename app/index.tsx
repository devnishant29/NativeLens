import React from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import { useState } from "react";

import GoogleAccountModal from "@/components/GoogleAccountModal";

import SearchBar from "@/components/home/searchBar";
import Shortcuts from "@/components/home/shortcuts";
import HorizontalCards from "@/components/home/horizontalCards";
import News from "@/components/home/news";
import Header from "@/components/home/header";
import BottomNavigation from "@/components/home/bottomNavigation";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView className="flex-1 bg-[#1f2125]">
      <Header setModalVisible={setModalVisible} />

      <ScrollView
        bounces={true} // Enables the bounce/spring effect on scroll
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center justify-center mt-6 mb-6">
          <View className="flex-row">
            <Text className="text-white text-6xl font-bold">Googl</Text>
            <View style={{ transform: [{ rotate: "-15deg" }] }}>
              <Text className="text-white text-6xl font-bold">e</Text>
            </View>
          </View>
        </View>
        <SearchBar />
        <Shortcuts />
        <HorizontalCards />
        <News />
      </ScrollView>

      <BottomNavigation />
      <GoogleAccountModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}
