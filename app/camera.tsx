import { useState, useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlashMode } from "expo-camera/build/Camera.types";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { useRouter } from "expo-router";

{
  /* <MaterialIcons name="flash-auto" size={24} color="black" /> */
}
{
  /* <MaterialIcons name="flash-on" size={24} color="black" /> */
}
{
  /* <MaterialIcons name="flash-off" size={24} color="black" /> */
}

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<"back" | "front">("back");
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

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

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const getFlashText = () => {
    switch (flashMode) {
      case "on":
        return "FLASH ON";
      case "auto":
        return "FLASH AUTO";
      case "off":
      default:
        return "FLASH OFF";
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        console.log(`Taking picture with flash: ${flashMode}`);
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          skipProcessing: true, // Better for flash performance
        });
        console.log("Photo taken:", photo);
      } catch (error) {
        console.error("Failed to take picture:", error);
      }
    }
  };

  return (
    <View className="flex-1 justify-center">
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        flash={flashMode} // Changed from 'flash' to 'flashMode'
      >
        {/* Header Bar */}
        <View className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-4 pt-12 pb-2">
          {/* Left side icons */}
          <View className="flex-row items-center">
            <TouchableOpacity className="mr-10" onPress={() => router.back()}>
              <MaterialIcons name="chevron-left" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="flash-auto" size={20} color="white" />
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

        <View className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-28">
          {/* Outer square with vertices */}
          <View className="relative w-64 h-64">
            <View className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-white"></View>
            <View className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-white"></View>
            <View className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-white"></View>
            <View className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-white"></View>
          </View>

          <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56">
            <View className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-white"></View>
            <View className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-white"></View>
            <View className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-white"></View>
            <View className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-white"></View>
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
            <TouchableOpacity className="bg-white rounded-full w-20 h-20 items-center justify-center">
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
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});
