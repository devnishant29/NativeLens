import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface GoogleLensModalProps {
  visible: boolean;
  onClose: () => void;
}

// Dummy data with random placeholder images of different aspect ratios
const dummyItems = [
  {
    id: 1,
    title: "Mountain Landscape",
    description: "Beautiful scenic view of mountains",
    imageUrl: "https://placehold.co/400x300", // 4:3 aspect ratio
    width: 400,
    height: 300,
  },
  {
    id: 2,
    title: "Urban Photography",
    description: "City skyline at sunset",
    imageUrl: "https://placehold.co/300x400", // 3:4 aspect ratio (portrait)
    width: 300,
    height: 400,
  },
  {
    id: 3,
    title: "Abstract Art",
    description: "Modern abstract composition",
    imageUrl: "https://placehold.co/500x250", // 2:1 aspect ratio (wide)
    width: 500,
    height: 250,
  },
  {
    id: 4,
    title: "Wildlife Shot",
    description: "Exotic animals in natural habitat",
    imageUrl: "https://placehold.co/300x300", // 1:1 aspect ratio (square)
    width: 300,
    height: 300,
  },
  {
    id: 5,
    title: "Beach Paradise",
    description: "Tropical island getaway",
    imageUrl: "https://placehold.co/350x200", // 7:4 aspect ratio (wide)
    width: 350,
    height: 200,
  },
  {
    id: 6,
    title: "Food Photography",
    description: "Delicious culinary creation",
    imageUrl: "https://placehold.co/250x350", // 5:7 aspect ratio (tall)
    width: 250,
    height: 350,
  },
  {
    id: 7,
    title: "Architectural Wonder",
    description: "Stunning modern building design",
    imageUrl: "https://placehold.co/600x250", // 12:5 aspect ratio (very wide)
    width: 600,
    height: 250,
  },
  {
    id: 8,
    title: "Portrait Shot",
    description: "Professional studio portrait",
    imageUrl: "https://placehold.co/320x450", // 16:9 ratio (vertical)
    width: 320,
    height: 450,
  },
];

const GoogleLensModal: React.FC<GoogleLensModalProps> = ({
  visible,
  onClose,
}) => {
  const screenHeight = Dimensions.get("window").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const [modalVisible, setModalVisible] = useState(visible);
  const [showFeedback, setShowFeedback] = useState(true);
  const feedbackOpacity = useRef(new Animated.Value(1)).current;

  // Position states - show much less initially (70% from bottom)
  const POSITION = {
    CLOSED: screenHeight,
    PARTIAL: screenHeight * 0.7, // Only show 30% of the modal
    FULL: 0,
  };

  const [currentPosition, setCurrentPosition] = useState(POSITION.PARTIAL);

  // Reset position when visibility changes
  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.spring(panY, {
        toValue: POSITION.PARTIAL,
        tension: 30,
        friction: 7,
        useNativeDriver: true,
      }).start();
      setCurrentPosition(POSITION.PARTIAL);

      // Reset feedback visibility when modal opens
      setShowFeedback(true);
      feedbackOpacity.setValue(1);

      // Auto-hide feedback after 5 seconds
      const timer = setTimeout(() => {
        hideFeedback();
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      closeModal();
    }
  }, [visible]);

  const closeModal = () => {
    Animated.timing(panY, {
      toValue: POSITION.CLOSED,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      onClose();
    });
  };

  const expandModal = () => {
    Animated.spring(panY, {
      toValue: POSITION.FULL,
      tension: 30,
      friction: 7,
      useNativeDriver: true,
    }).start(() => {
      setCurrentPosition(POSITION.FULL);
    });
  };

  const resetModal = () => {
    Animated.spring(panY, {
      toValue: POSITION.PARTIAL,
      tension: 30,
      friction: 7,
      useNativeDriver: true,
    }).start(() => {
      setCurrentPosition(POSITION.PARTIAL);
    });
  };

  const hideFeedback = () => {
    Animated.timing(feedbackOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowFeedback(false);
    });
  };

  const handleFeedback = (response: string) => {
    // Here you would handle the feedback (e.g., send to server)
    console.log("User feedback:", response);
    hideFeedback();
  };

  // Pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Don't allow moving below original position
        const newPosition = currentPosition + gestureState.dy;
        if (newPosition >= POSITION.FULL && newPosition <= POSITION.CLOSED) {
          panY.setValue(newPosition);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          // Swiped down significantly
          if (currentPosition === POSITION.FULL) {
            // If fully expanded, go to partial
            resetModal();
          } else {
            // If partial, close
            closeModal();
          }
        } else if (gestureState.dy < -50 && currentPosition !== POSITION.FULL) {
          // Swiped up significantly - expand fully
          expandModal();
        } else {
          // Return to current position
          if (currentPosition === POSITION.FULL) {
            expandModal();
          } else {
            resetModal();
          }
        }
      },
    })
  ).current;

  // Calculate opacity for the overlay based on position
  const overlayOpacity = panY.interpolate({
    inputRange: [POSITION.FULL, POSITION.PARTIAL, POSITION.CLOSED],
    outputRange: [0.7, 0.5, 0],
    extrapolate: "clamp",
  });

  // Handle bar for dragging
  const DragHandle = () => (
    <View className="w-full items-center pt-2 pb-4">
      <View className="w-16 h-1 bg-gray-400 rounded-full" />
    </View>
  );

  if (!modalVisible) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
      animationType="none"
    >
      <View className="flex-1">
        {/* Backdrop */}
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: "transparent", opacity: overlayOpacity },
          ]}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            activeOpacity={1}
            onPress={closeModal}
          />
        </Animated.View>

        {/* Content */}
        <Animated.View
          style={{
            transform: [{ translateY: panY }],
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: screenHeight,
            backgroundColor: "#1f1f1f", // bg-gray-900
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            overflow: "hidden",
          }}
        >
          {/* Drag Handle */}
          <View {...panResponder.panHandlers}>
            <DragHandle />
            <View className="bg-[#1f1f1f] p-4"></View>
          </View>

          {/* Content below initial height */}
          <View className="flex-1">
            {/* Search Preview */}
            <View className="mx-4 mb-6">
              <View className="flex-row items-center bg-[#2f3133] rounded-full py-4 px-4">
                {/* Search icon - part of the main search area */}
                <AntDesign name="google" size={24} color="white" />

                {/* Main search area touchable */}
                <TouchableOpacity
                  className="flex-1"
                  // onPress={() => router.push("/search")}
                >
                  <Text className="text-white text-base mx-6">
                    Add to Search
                  </Text>
                </TouchableOpacity>

                <View className="border-l-[1.5px] border-white border-opacity-50">
                  <TouchableOpacity
                    className="h-10 w-10 bg-[#77919d] rounded-full items-center justify-center ml-3 mr-1"
                    onPress={() => setModalVisible(true)}
                  >
                    <Text className="text-white text-xl font-medium">N</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="flex-row items-center justify-between px-6 pb-4 border-b-[1px] border-gray-800">
              <Text className="text-white border-b-[1px] border-white pb-2">
                All
              </Text>
              <Text className="text-[#b6b7ba] pb-2">Products</Text>
              <Text className="text-[#b6b7ba] pb-2">Visual Matches</Text>
              <Text className="text-[#b6b7ba] pb-2">About This Image</Text>
            </View>

            {/* Results Section */}
            <ScrollView className="flex-1 p-4 pb-20">
              <View className="flex-row">
                <MaterialIcons name="info-outline" size={24} color="#b6b7ba" />
                <Text className="text-[#b6b7ba] pl-3">
                  Results for people are limited
                </Text>
              </View>
              <View className="pt-4 border-b-[1px] border-gray-800 -mx-4"></View>

              {/* Example Cards */}
              <View className="mt-4 flex-row">
                {/* Left Column */}
                <View className="flex-1 pr-1.5">
                  {dummyItems
                    .filter((_, i) => i % 2 === 0)
                    .map((item) => (
                      <View key={item.id} className="mb-3">
                        <View className="p-2 rounded-lg shadow-lg">
                          <Image
                            source={{ uri: item.imageUrl }}
                            style={{
                              width: "100%",
                              height: undefined,
                              aspectRatio: item.width / item.height,
                              backgroundColor: "gray", // Debugging visibility
                            }}
                            resizeMode="cover"
                          />

                          <Text className="text-white mt-2 font-semibold">
                            {item.title}
                          </Text>
                          <Text className="text-gray-400 text-sm">
                            {item.description}
                          </Text>
                        </View>
                      </View>
                    ))}
                </View>

                {/* Right Column */}
                <View className="flex-1 pl-1.5">
                  {dummyItems
                    .filter((_, i) => i % 2 === 1)
                    .map((item) => (
                      <View key={item.id} className="mb-3">
                        <View className="p-2 rounded-lg shadow-lg">
                          <Image
                            source={{ uri: item.imageUrl }}
                            style={{
                              width: "100%",
                              height: undefined,
                              aspectRatio: item.width / item.height,
                              backgroundColor: "gray", // Debugging visibility
                            }}
                            resizeMode="cover"
                          />

                          <Text className="text-white mt-2 font-semibold">
                            {item.title}
                          </Text>
                          <Text className="text-gray-400 text-sm">
                            {item.description}
                          </Text>
                        </View>
                      </View>
                    ))}
                </View>
              </View>
            </ScrollView>

            {/* Feedback Overlay */}
            {showFeedback && (
              <Animated.View
                style={{
                  opacity: 100,
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  right: 20,
                  margin: 20,
                  backgroundColor: "#1f2125",
                  borderRadius: 24,
                  padding: 16,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                  zIndex: 10,
                }}
              >
                <View className="flex-row justify-center mt-2">
                  <Text className="text-[#979da0] text-center mt-1 mr-2">
                    Are these results useful?
                  </Text>
                  <TouchableOpacity
                    className="px-2"
                    onPress={() => handleFeedback("Yes")}
                  >
                    <Text className="text-[#8aaeed] text-xl">Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="px-2"
                    onPress={() => handleFeedback("No")}
                  >
                    <Text className="text-[#8aaeed] text-xl">No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="ml-2">
                    <MaterialIcons name="close" size={24} color="#e1e2e6" />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            )}
          </View>

          <View className="flex-row justify-between bg-[#2f3133] border-t border-gray-800 pt-3 pb-6 px-8">
            <TouchableOpacity>
              <MaterialIcons name="arrow-back" size={30} color="#999f9f" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="arrow-forward" size={30} color="#606467" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="home" size={30} color="#999f9f" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="tab" size={30} color="#999f9f" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default GoogleLensModal;
