import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Image } from "react-native";
import { useEffect } from "react";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import { useRouter } from "expo-router";

const Gallery = () => {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  const getLastImage = async () => {
    try {
      // Request permissions first
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        console.log("Media library permission not granted");
        return;
      }

      // Skip trying to find DCIM and just get the most recent photo from any album
      const { assets } = await MediaLibrary.getAssetsAsync({
        sortBy: [[MediaLibrary.SortBy.creationTime, false]],
        mediaType: MediaLibrary.MediaType.photo,
        first: 1,
      });

      console.log("Found assets:", assets.length);

      if (assets.length > 0) {
        const assetInfo = await MediaLibrary.getAssetInfoAsync(assets[0].id);
        console.log("Asset info:", assetInfo);

        const imageUri = assetInfo.localUri || assetInfo.uri;
        console.log("Using image URI:", imageUri);
        setImage(imageUri);
      } else {
        console.log("No images found on device");
        setImage(null);
      }
    } catch (error) {
      console.error("Error accessing media library:", error);
    }
  };

  useEffect(() => {
    getLastImage();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result?.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImage(selectedImageUri); // Update state, if you're showing the image somewhere

      const fileName = selectedImageUri.split("/").pop();
      const dataDir = `${FileSystem.documentDirectory}data/`;

      // Ensure the directory exists
      const dirInfo = await FileSystem.getInfoAsync(dataDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dataDir, { intermediates: true });
      } else {
        // Delete all existing files in the directory
        const files = await FileSystem.readDirectoryAsync(dataDir);
        for (const file of files) {
          await FileSystem.deleteAsync(`${dataDir}${file}`);
        }
      }

      // Create the new path
      const newPath = dataDir + fileName;

      // Move file to new location
      await FileSystem.moveAsync({
        from: selectedImageUri,
        to: newPath,
      });

      console.log("Saved photo to:", newPath);
      router.push("/lensSearchResults");
    }
  };

  return (
    <TouchableOpacity
      onPress={pickImage}
      className="absolute left-4 w-14 h-14 items-center justify-center ml-6 border-l-2 border-b-2 border-white rounded-bl-xl"
    >
      <View className="w-12 h-12 rounded-lg overflow-hidden items-center justify-center ml-1.5 mb-1.5 bg-white">
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
    </TouchableOpacity>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
