import React from "react";
import { StatusBar, Platform } from "react-native";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeOutDown,
  FadeInRight,
} from "react-native-reanimated";

interface GoogleAccountModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const GoogleAccountModal: React.FC<GoogleAccountModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      statusBarTranslucent={true}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View className="flex-1 justify-end bg-black/50 pt-4">
          <Animated.View
            entering={FadeInDown.duration(400)}
            exiting={FadeOutDown.duration(300)}
            className="bg-[#2e3034] p-4 rounded-3xl mx-4 mb-4"
            pointerEvents="box-none"
          >
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View>
                {/* Close Button */}
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>

                {/* Profile Section */}
                <View className="items-center my-4">
                  <View className="h-16 w-16 bg-[#76919f] rounded-full items-center justify-center">
                    <Text className="text-white text-3xl font-medium">N</Text>
                  </View>
                  <Text className="text-white text-lg font-bold mt-2">
                    Manage your Google Account
                  </Text>
                </View>

                {/* Options List */}
                <ScrollView>
                  {[
                    { text: "Turn on Incognito", icon: "incognito" },
                    { text: "Search history", icon: "history" },
                    { text: "Delete last 15 mins", icon: "delete" },
                    { text: "SafeSearch", icon: "security" },
                    { text: "Interests", icon: "favorite" },
                    { text: "Passwords", icon: "lock" },
                    { text: "Your profile", icon: "person" },
                    { text: "Search personalization", icon: "tune" },
                    { text: "Settings", icon: "settings" },
                    { text: "Help and feedback", icon: "help" },
                  ].map((item, index) => (
                    <Animated.View
                      key={index}
                      entering={FadeInRight.delay(index * 80)}
                    >
                      <Option text={item.text} icon={item.icon} />
                    </Animated.View>
                  ))}
                </ScrollView>

                {/* Footer */}
                <View className="flex-row justify-center mt-4">
                  <TouchableOpacity>
                    <Text className="text-gray-400">Privacy Policy</Text>
                  </TouchableOpacity>
                  <Text className="text-gray-400 mx-2">•</Text>
                  <TouchableOpacity>
                    <Text className="text-gray-400">Terms of Service</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Option Component for List Items
const Option = ({ text, icon }: { text: string; icon: string }) => {
  // Icons with full-width borders
  const fullBorderIcons = ["incognito", "delete", "help"];

  // Icons with right-aligned 90% borders
  const rightAlignedBorderIcons = ["history", "tune"];

  return (
    <TouchableOpacity
      className={`flex-row items-center p-3 relative ${
        fullBorderIcons.includes(icon) ? "border-b border-gray-700" : ""
      }`}
    >
      {icon === "incognito" ? (
        <MaterialCommunityIcons name="incognito" size={24} color="white" />
      ) : (
        <MaterialIcons name={icon as any} size={24} color="white" />
      )}
      <Text className="text-white ml-4 text-base">{text}</Text>

      {/* Right-aligned 90% border for specific icons */}
      {rightAlignedBorderIcons.includes(icon) && (
        <View className="absolute bottom-0 right-0 h-[1px] w-[90%] bg-gray-700" />
      )}
    </TouchableOpacity>
  );
};
export default GoogleAccountModal;
