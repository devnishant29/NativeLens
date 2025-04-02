import { useState, useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlashMode } from "expo-camera/build/Camera.types";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<"back" | "front">("back");
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const cameraRef = useRef<CameraView>(null);

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
        <View className="absolute top-0 left-0 right-0 p-4 bg-black/50 pt-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-lg font-bold">Google Lens</Text>
            <TouchableOpacity onPress={toggleCameraFacing}>
              <Text className="text-white text-base">SWITCH CAMERA</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-2 bg-white/20 rounded-full px-4 py-2 flex-row items-center">
            <Text className="text-white">Search with your camera</Text>
          </View>
        </View>

        <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <View className="w-64 h-64 rounded-full border-2 border-white/50" />
          <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border-2 border-white/30" />
        </View>

        <View className="absolute bottom-0 left-0 right-0 pt-8 pb-10 bg-black/50">
          <View className="flex-row justify-between items-center">
            <TouchableOpacity className="ml-4 py-4" onPress={toggleFlashMode}>
              <Text className="text-white text-base">{getFlashText()}</Text>
            </TouchableOpacity>

            <View className="absolute left-0 right-0 items-center">
              <TouchableOpacity
                className="bg-white rounded-full w-16 h-16 border-2 border-gray-200"
                onPress={takePicture}
              >
                <View className="bg-white rounded-full w-14 h-14" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="ml-auto pr-4 py-4">
              <Text className="text-white text-base">Gallery</Text>
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
