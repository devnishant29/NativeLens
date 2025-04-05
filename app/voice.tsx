import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

import { transcribeSpeech } from "@/functions/transcribeSpeech";

const VoiceAssistantScreen = () => {
  const router = useRouter();

  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);
  const dot4 = useSharedValue(0);

  const recordingRef = useRef<Audio.Recording | null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isTranscribed, setIsTranscribed] = useState<boolean>(false);
  const [transcribedSpeech, setTranscribedSpeech] = useState<
    string | undefined
  >(undefined);

  const recordingOptions: Audio.RecordingOptions = {
    ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
    android: {
      extension: ".amr",
      outputFormat: Audio.AndroidOutputFormat.AMR_WB,
      audioEncoder: Audio.AndroidAudioEncoder.AMR_WB,
      sampleRate: 16000,
      numberOfChannels: 1,
      bitRate: 128000,
    },
    ios: {
      extension: ".wav",
      audioQuality: Audio.IOSAudioQuality.HIGH,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    web: {
      mimeType:
        Platform.OS === "web" && window.navigator.userAgent.includes("Safari")
          ? "audio/mp4"
          : "audio/webm;codecs=opus",
      bitsPerSecond: 128000,
    },
  };

  const checkPermissions = async () => {
    const response = await Audio.requestPermissionsAsync();
    return response.status === "granted";
  };

  const startRecording = async () => {
    const hasPermission = await checkPermissions();
    if (!hasPermission) return;

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(recordingOptions);
    await recording.startAsync();

    recording.setOnRecordingStatusUpdate((status) => {
      if (status?.metering) {
        // Silence detection logic (if you want better detection use an ML audio lib)
        if (status.metering < -45) {
          if (!silenceTimerRef.current) {
            silenceTimerRef.current = setTimeout(() => {
              stopRecording();
            }, 2000); // 2 seconds of silence
          }
        } else if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }
      }
    });

    recordingRef.current = recording;
    setIsRecording(true);
    startDotsAnimation();
  };

  const stopRecording = async () => {
    if (!recordingRef.current) return;

    setIsRecording(false);
    setIsProcessing(true);

    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();

      if (uri) {
        const dir = FileSystem.documentDirectory + "data/audio/";

        // Ensure directory exists
        await FileSystem.makeDirectoryAsync(dir, { intermediates: true });

        // Delete all existing files in the directory
        const files = await FileSystem.readDirectoryAsync(dir);
        await Promise.all(
          files.map((file) =>
            FileSystem.deleteAsync(dir + file, { idempotent: true })
          )
        );

        // Save the new file
        const fileName = `audio_${Date.now()}.wav`;
        const dest = dir + fileName;

        await FileSystem.moveAsync({
          from: uri,
          to: dest,
        });

        console.log("Audio saved to", dest);
        const transcript = await transcribeSpeech();
        setIsTranscribed(true);

        if (transcript) {
          setTranscribedSpeech(transcript);
          console.log("User said:", transcript);
        }

        setIsProcessing(false);
      }

      recordingRef.current = null;
    } catch (error) {
      console.error("Error stopping recording:", error);
      setIsProcessing(false);
    }
  };

  // Start recording when component mounts
  useEffect(() => {
    startRecording();

    return () => {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
      if (recordingRef.current) {
        stopRecording();
      }
    };
  }, []);

  // Dots animation
  const startDotsAnimation = () => {
    dot1.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 500 }),
        withTiming(0, { duration: 500 })
      ),
      -1,
      true
    );

    setTimeout(() => {
      dot2.value = withRepeat(
        withSequence(
          withTiming(-10, { duration: 500 }),
          withTiming(0, { duration: 500 })
        ),
        -1,
        true
      );
    }, 100);
    setTimeout(() => {
      dot3.value = withRepeat(
        withSequence(
          withTiming(-10, { duration: 500 }),
          withTiming(0, { duration: 500 })
        ),
        -1,
        true
      );
    }, 200);
    setTimeout(() => {
      dot4.value = withRepeat(
        withSequence(
          withTiming(-10, { duration: 500 }),
          withTiming(0, { duration: 500 })
        ),
        -1,
        true
      );
    }, 300);
  };

  useEffect(() => {
    if (isRecording) {
      startDotsAnimation();
    }
  }, [isRecording]);

  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot1.value }],
  }));
  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot2.value }],
  }));
  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot3.value }],
  }));
  const dot4Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot4.value }],
  }));

  const rotation = useSharedValue(0);

  // Radius of the circular path
  const radius = 15;

  useEffect(() => {
    // Start the spinning animation
    rotation.value = withRepeat(
      withTiming(2 * Math.PI, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1, // Infinite repeats
      false // No reverse
    );
  }, []);

  // Calculate positions of dots along the circular path with different offsets
  const greenDotStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: radius * Math.cos(rotation.value) },
        { translateY: radius * Math.sin(rotation.value) },
      ],
    };
  });

  const yellowDotStyle = useAnimatedStyle(() => {
    // 90 degrees offset (π/2)
    const offset = rotation.value + Math.PI / 2;
    return {
      transform: [
        { translateX: radius * Math.cos(offset) },
        { translateY: radius * Math.sin(offset) },
      ],
    };
  });

  const redDotStyle = useAnimatedStyle(() => {
    // 180 degrees offset (π)
    const offset = rotation.value + Math.PI;
    return {
      transform: [
        { translateX: radius * Math.cos(offset) },
        { translateY: radius * Math.sin(offset) },
      ],
    };
  });

  const blueDotStyle = useAnimatedStyle(() => {
    // 270 degrees offset (3π/2)
    const offset = rotation.value + (3 * Math.PI) / 2;
    return {
      transform: [
        { translateX: radius * Math.cos(offset) },
        { translateY: radius * Math.sin(offset) },
      ],
    };
  });

  return (
    <View className="flex-1 bg-[#202124] justify-center items-center">
      {/* Top Bar */}
      <View className="absolute top-12 left-4 right-4 flex-row justify-between px-4">
        <TouchableOpacity
          className="h-12 w-12 bg-[#5f6368] rounded-full items-center justify-center"
          onPress={() => router.back()}
        >
          <MaterialIcons name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="h-12 w-12 bg-[#5f6368] rounded-full items-center justify-center">
          <MaterialCommunityIcons name="web" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text className="text-gray-300 text-lg mb-56">
        {isRecording ? "Speak now" : isProcessing ? "Processing..." : "Done"}
      </Text>

      {/* Conditional rendering based on recording state */}
      <View className="h-8 mb-10 justify-center items-center">
        {isRecording ? (
          // Animated Dots when recording
          <View className="flex-row gap-x-6 items-center">
            <Animated.View
              className="h-3 w-3 rounded-full bg-blue-500"
              style={dot1Style}
            />
            <Animated.View
              className="h-3 w-3 rounded-full bg-red-500"
              style={dot2Style}
            />
            <Animated.View
              className="h-3 w-3 rounded-full bg-yellow-500"
              style={dot3Style}
            />
            <Animated.View
              className="h-3 w-3 rounded-full bg-green-500"
              style={dot4Style}
            />
          </View>
        ) : isProcessing ? (
          // Spinning wheel when processing
          <View className="h-16 w-16 items-center justify-center">
            <View className="relative h-16 w-16 flex items-center justify-center">
              <Animated.View
                className="absolute h-3 w-3 rounded-full bg-green-500 left-1/2 top-1/2"
                style={[greenDotStyle, { marginLeft: -6, marginTop: -6 }]}
              />
              <Animated.View
                className="absolute h-3 w-3 rounded-full bg-yellow-500 left-1/2 top-1/2"
                style={[yellowDotStyle, { marginLeft: -6, marginTop: -6 }]}
              />
              <Animated.View
                className="absolute h-3 w-3 rounded-full bg-red-500 left-1/2 top-1/2"
                style={[redDotStyle, { marginLeft: -6, marginTop: -6 }]}
              />
              <Animated.View
                className="absolute h-3 w-3 rounded-full bg-blue-500 left-1/2 top-1/2"
                style={[blueDotStyle, { marginLeft: -6, marginTop: -6 }]}
              />
            </View>
          </View>
        ) : isTranscribed && !!transcribedSpeech ? (
          <Text className="text-white text-lg">{transcribedSpeech}</Text>
        ) : (
          <Text className="text-white text-lg">Failed to recognize voice</Text>
        )}
      </View>

      <TouchableOpacity className="flex-row items-center bg-gray-700 px-5 py-3 rounded-full mt-48">
        <MaterialIcons name="music-note" size={24} color="white" />
        <Text className="text-white ml-2">Search a song</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VoiceAssistantScreen;
