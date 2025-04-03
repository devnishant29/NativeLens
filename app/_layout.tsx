import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="voice" options={{ headerShown: false }} />
        <Stack.Screen name="camera" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
