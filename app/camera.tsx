import { useState, useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlashMode } from "expo-camera/build/Camera.types";
import GoogleLensModal from "@/components/searchResultsModal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const facing = "back";
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center">
        <Text className="text-white text-base">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleFlashMode = () => {
    setFlashMode((current) => {
      switch (current) {
        case "off":
          return "on";
        case "on":
          return "auto";
        case "auto":
          return "off";
        default:
          return "off";
      }
    });
  };

  const getFlashText = () => {
    switch (flashMode) {
      case "on":
        return <MaterialIcons name="flash-on" size={24} color="white" />;
      case "auto":
        return <MaterialIcons name="flash-auto" size={24} color="white" />;
      case "off":
      default:
        return <MaterialIcons name="flash-off" size={24} color="white" />;
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        console.log(`Taking picture with flash: ${flashMode}`);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          skipProcessing: true,
        });

        console.log("Photo taken:", photo);

        if (!photo) {
          throw new Error("No photo returned");
        }

        const fileName = photo.uri.split("/").pop();
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
          from: photo.uri,
          to: newPath,
        });

        console.log("Saved photo to:", newPath);
        router.push("/lensSearchResults");
      } catch (error) {
        console.error("Failed to take or save picture:", error);
      }
    }
  };

  return (
    <View className="flex-1 justify-center">
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        flash={flashMode}
      >
        {/* Header Bar */}
        <View className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-4 pt-12 pb-2">
          {/* Left side icons */}
          <View className="flex-row items-center">
            <TouchableOpacity className="mr-10" onPress={() => router.back()}>
              <MaterialIcons name="chevron-left" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFlashMode}>
              {getFlashText()}
            </TouchableOpacity>
          </View>

          {/* Center text */}
          <Text className="text-white text-xl font-semibold">Google Lens</Text>

          {/* Right side icons */}
          <View className="flex-row items-center">
            <TouchableOpacity className="mr-10">
              <MaterialIcons name="history" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="more-horiz" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-28 opacity-50">
          {/* Outer square with rounded vertices */}
          <View className="relative w-64 h-64">
            <View className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-white rounded-tl-md"></View>
            <View className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-white rounded-tr-md"></View>
            <View className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-white rounded-bl-md"></View>
            <View className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-white rounded-br-md"></View>
          </View>

          {/* Inner square with rounded vertices */}
          <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56">
            <View className="absolute -top-1 -left-1 w-10 h-10 border-t-2 border-l-2 border-white rounded-tl-3xl"></View>
            <View className="absolute -top-1 -right-1 w-10 h-10 border-t-2 border-r-2 border-white rounded-tr-3xl"></View>
            <View className="absolute -bottom-1 -left-1 w-10 h-10 border-b-2 border-l-2 border-white rounded-bl-3xl"></View>
            <View className="absolute -bottom-1 -right-1 w-10 h-10 border-b-2 border-r-2 border-white rounded-br-3xl"></View>
          </View>
        </View>

        {/* Bottom Controls */}
        <View className="absolute bottom-0 left-0 right-0">
          {/* Thumbnail and Search Button */}
          <View className="flex-row justify-center items-center mb-16 relative w-full">
            {/* Gallery icon positioned on the left edge */}
            <TouchableOpacity className="absolute left-4 rounded-full w-16 h-16 items-center justify-center">
              <MaterialIcons name="photo-library" size={30} color="white" />
            </TouchableOpacity>

            {/* Search button in the center */}
            <TouchableOpacity
              className="bg-white rounded-full w-20 h-20 items-center justify-center"
              onPress={takePicture}
            >
              <View className="bg-gray-200 rounded-full w-16 h-16 items-center justify-center border-black border-2">
                <MaterialIcons name="search" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View className="flex-row justify-evenly py-8 px-4 bg-black bg-opacity-20">
            <TouchableOpacity className="bg-gray-800 rounded-full px-4 py-2 flex-row items-center">
              <MaterialIcons name="translate" size={14} color="white" />
              <Text className="text-white ml-2">Translate</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-gray-800 rounded-full px-4 py-2 flex-row items-center">
              <MaterialIcons name="search" size={14} color="white" />
              <Text className="text-white ml-2">Search</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-gray-800 rounded-full px-4 py-2 flex-row items-center">
              <SimpleLineIcons name="graduation" size={14} color="white" />
              <Text className="text-white ml-2">Homework</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>

      <GoogleLensModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});
