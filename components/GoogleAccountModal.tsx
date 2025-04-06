import React from "react";
import { StatusBar, Platform } from "react-native";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

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
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      statusBarTranslucent={true}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View className="flex-1 justify-end bg-black/50 pt-4">
          <View
            className="bg-[#2e3034] p-4 rounded-3xl mx-4 mb-4"
            pointerEvents="box-none"
          >
            {/* Rest of your modal content remains the same */}
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
                  <Option text="Turn on Incognito" icon="incognito" />

                  {/* Group with reduced spacing between items */}
                  <View className="mb-1">
                    <Option text="Search history" icon="history" />
                    <Option text="Delete last 15 mins" icon="delete" />
                  </View>

                  <Option text="SafeSearch" icon="security" />
                  <Option text="Interests" icon="favorite" />

                  <View className="mb-1">
                    <Option text="Passwords" icon="lock" />
                    <Option text="Your profile" icon="person" />
                    <Option text="Search personalization" icon="tune" />
                  </View>

                  <Option text="Settings" icon="settings" />
                  <Option text="Help and feedback" icon="help" />
                </ScrollView>

                {/* Footer Links */}
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
          </View>
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
