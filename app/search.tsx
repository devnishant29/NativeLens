import React from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";

import Animated, { FadeInRight } from "react-native-reanimated";

type SearchHistoryEntry = {
  id: number;
  query: string;
  timestamp: string;
  platform: "web" | "mobile";
};

const searchHistoryEntries: SearchHistoryEntry[] = [
  {
    id: 1,
    query: "Shoppin",
    timestamp: "2025-04-06T09:15:30Z",
    platform: "mobile",
  },
  {
    id: 2,
    query: "How to tell my app I love it",
    timestamp: "2025-04-05T18:22:10Z",
    platform: "web",
  },
  {
    id: 3,
    query: "useEffect but make it dramatic",
    timestamp: "2025-04-04T14:47:03Z",
    platform: "mobile",
  },
  {
    id: 4,
    query: "Can I marry a JSON file?",
    timestamp: "2025-04-03T10:00:00Z",
    platform: "web",
  },
  {
    id: 5,
    query: "React Native vs Flutter rap battle",
    timestamp: "2025-04-02T08:13:45Z",
    platform: "mobile",
  },
  {
    id: 6,
    query: "How to explain coding to my dog",
    timestamp: "2025-04-01T11:45:10Z",
    platform: "web",
  },
  {
    id: 7,
    query: "Will VS Code ever love me back?",
    timestamp: "2025-03-31T16:10:20Z",
    platform: "mobile",
  },
  {
    id: 8,
    query: "Do semicolons have feelings?",
    timestamp: "2025-03-30T08:22:33Z",
    platform: "mobile",
  },
  {
    id: 9,
    query: "Tailwind but for my life",
    timestamp: "2025-03-29T09:45:00Z",
    platform: "web",
  },
  {
    id: 10,
    query: "Why is my code running... away?",
    timestamp: "2025-03-28T14:05:50Z",
    platform: "web",
  },
  {
    id: 11,
    query: "How to deploy without crying",
    timestamp: "2025-03-27T17:33:21Z",
    platform: "mobile",
  },
];

// Show only the last 10 searches
const last10Entries = searchHistoryEntries.slice(-10).reverse();

export default function SearchScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: (typeof searchHistoryEntries)[0] }) => (
    <Animated.View entering={FadeInRight.duration(500)} key={item.id}>
      <TouchableOpacity className="rounded-2xl py-2 mb-3 mx-4">
        <View className="flex-row items-center">
          <View className="p-2 rounded-full bg-[#4b4e52]">
            <FontAwesome6 name="clock" size={16} color="#e6ebf1" />
          </View>
          <Text className="text-white text-base font-medium pl-3">
            {item.query}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#202124]">
      <StatusBar barStyle="light-content" />
      <View className="mx-4 mt-12 mb-4">
        <View className="flex-row items-center bg-[#303134] rounded-full py-3 px-4">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="chevron-left" size={34} color="#e6ebf1" />
          </TouchableOpacity>
          <TextInput
            className="flex-1 text-white text-base mx-2"
            placeholder="Search or type URL"
            placeholderTextColor="#9aa0a6"
          />
          <TouchableOpacity
            className="mr-4"
            onPress={() => router.push("/voice")}
          >
            <MaterialIcons name="keyboard-voice" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="mx-4"
            onPress={() => router.push("/camera")}
          >
            <MaterialCommunityIcons
              name="google-lens"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row justify-between mx-4 mb-6">
        <TouchableOpacity>
          <Text className="text-white text-sm font-semibold">
            Recent Searches
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-white text-sm font-semibold">
            MANAGE HISTORY
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={last10Entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
