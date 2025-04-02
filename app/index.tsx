import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl mb-10">YO</Text>
      <Button title="Open Camera" onPress={() => router.push("/camera")} />
    </View>
  );
}
