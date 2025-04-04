// app/searchResults.js
import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { Dimensions } from "react-native";
import * as FileSystem from "expo-file-system";
import GoogleLensModal from "@/components/searchResultsModal";

const { width, height } = Dimensions.get("window");

const SearchResults = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const dataDir = `${FileSystem.documentDirectory}data/`;
        const files = await FileSystem.readDirectoryAsync(dataDir);

        if (files.length > 0) {
          const imagePath = dataDir + files[0];
          setImageUri(imagePath);
        } else {
          console.warn("No image found in data directory.");
        }
      } catch (err) {
        console.error("Error loading image:", err);
      }
    };

    loadImage();
  }, []);

  if (!imageUri) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <Image
        source={{ uri: imageUri }}
        style={{ width, height }}
        className="w-full h-full"
        resizeMode="cover"
      />
      <GoogleLensModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default SearchResults;
