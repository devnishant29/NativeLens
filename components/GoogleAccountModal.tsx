import React from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

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
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-[#202124] p-4 rounded-t-2xl">
          {/* Close Button */}
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>

          {/* Profile Section */}
          <View className="items-center my-4">
            <Ionicons name="person-circle" size={60} color="#9aa0a6" />
            <Text className="text-white text-lg font-bold mt-2">
              Manage your Google Account
            </Text>
          </View>

          {/* Options List */}
          <ScrollView>
            <Option text="Turn on Incognito" icon="incognito" />
            <Option text="Search history" icon="history" />
            <Option text="Delete last 15 mins" icon="delete" />
            <Option text="SafeSearch" icon="security" />
            <Option text="Interests" icon="favorite" />
            <Option text="Passwords" icon="lock" />
            <Option text="Your profile" icon="person" />
            <Option text="Search personalization" icon="tune" />
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
      </View>
    </Modal>
  );
};

// Option Component for List Items
const Option = ({ text, icon }: { text: string; icon: string }) => (
  <TouchableOpacity className="flex-row items-center p-3 border-b border-gray-700">
    <MaterialIcons name={icon as any} size={24} color="white" />
    <Text className="text-white ml-4 text-base">{text}</Text>
  </TouchableOpacity>
);

export default GoogleAccountModal;
