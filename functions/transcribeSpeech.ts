import * as FileSystem from "expo-file-system";

export const transcribeSpeech = async () => {
  try {
    const audioPath = FileSystem.documentDirectory + "data/audio/";

    // Check if file exists
    const fileInfo = await FileSystem.getInfoAsync(audioPath);
    if (!fileInfo.exists) {
      console.error("Audio file not found at", audioPath);
      return undefined;
    }

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return "This is placeholder for transcribed text";
  } catch (e) {
    console.error("Failed to transcribe speech!", e);
    return undefined;
  }
};
