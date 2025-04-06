import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { startDotsAnimation } from "@/components/voice/linearAnimations";
import { transcribeSpeech } from "@/functions/transcribeSpeech";
import EnchancedinearAnimations from "@/components/voice/linearAnimations";
import EnhancedCircularAnimation from "@/components/voice/circularAnimation";

const VoiceAssistantScreen = () => {
  const router = useRouter();

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
            }, 2000); // 1 seconds of silence
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

  useEffect(() => {
    if (isRecording) {
      startDotsAnimation();
    }
  }, [isRecording]);

  return (
    <View className="flex-1 bg-[#2f3133] justify-center items-center">
      {/* Top Bar */}
      <View className="absolute top-12 left-4 right-4 flex-row justify-between px-4">
        <TouchableOpacity
          className="h-12 w-12 bg-[#424649] rounded-full items-center justify-center"
          onPress={() => router.back()}
        >
          <MaterialIcons name="chevron-left" size={34} color="#9da1a4" />
        </TouchableOpacity>
        <TouchableOpacity className="h-12 w-12 bg-[#424649] rounded-full items-center justify-center">
          <MaterialCommunityIcons name="web" size={24} color="#9da1a4" />
        </TouchableOpacity>
      </View>

      <Text className="text-gray-300 text-lg mb-56">
        {isRecording ? "Speak now" : isProcessing ? "Processing..." : "Done"}
      </Text>

      {/* Conditional rendering based on recording state */}
      <View className="h-8 mb-10 justify-center items-center">
        {isRecording ? (
          <EnchancedinearAnimations />
        ) : isProcessing ? (
          <EnhancedCircularAnimation />
        ) : isTranscribed && !!transcribedSpeech ? (
          <Text className="text-white text-lg">{transcribedSpeech}</Text>
        ) : (
          <Text className="text-white text-lg">Failed to recognize voice</Text>
        )}
      </View>

      <TouchableOpacity className="flex-row items-center bg-[#1f2125] px-5 py-3 rounded-full mt-48 border-[1.5px] border-[#646569]">
        <MaterialIcons name="music-note" size={24} color="#9ca0a3" />
        <Text className="text-[#9ca0a3] ml-2">Search a song</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VoiceAssistantScreen;
