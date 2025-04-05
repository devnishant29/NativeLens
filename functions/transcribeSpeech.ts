import { Audio } from "expo-av";
import { MutableRefObject } from "react";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import * as Device from "expo-device";

const readBlobAsBase64 = async (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

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
    // let base64Uri = "";

    // if (Platform.OS === "web") {
    //   const blob = await fetch(audioPath).then((res) => res.blob());
    //   const foundBase64 = (await readBlobAsBase64(blob)) as string;
    //   const removedPrefixBase64 = foundBase64.split("base64,")[1];
    //   base64Uri = removedPrefixBase64;
    // } else {
    //   base64Uri = await FileSystem.readAsStringAsync(audioPath, {
    //     encoding: FileSystem.EncodingType.Base64,
    //   });
    // }

    // const dataUrl = base64Uri;

    // const audioConfig = {
    //   encoding:
    //     Platform.OS === "android"
    //       ? "AMR_WB"
    //       : Platform.OS === "web"
    //       ? "WEBM_OPUS"
    //       : "LINEAR16",
    //   sampleRateHertz:
    //     Platform.OS === "android"
    //       ? 16000
    //       : Platform.OS === "web"
    //       ? 48000
    //       : 41000,
    //   languageCode: "en-US",
    // };

    // const rootOrigin =
    //   Platform.OS === "android"
    //     ? "10.0.2.2"
    //     : Device.isDevice
    //     ? process.env.LOCAL_DEV_IP || "localhost"
    //     : "localhost";
    // const serverUrl = `http://${rootOrigin}:4000`;

    // const serverResponse = await fetch(`${serverUrl}/speech-to-text`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ audioUrl: dataUrl, config: audioConfig }),
    // })
    //   .then((res) => res.json())
    //   .catch((e: Error) => console.error(e));

    // const results = serverResponse?.results;
    // if (results) {
    //   const transcript = results?.[0].alternatives?.[0].transcript;
    //   return transcript || undefined;
    // } else {
    //   console.error("No transcript found");
    //   return undefined;
    // }
  } catch (e) {
    console.error("Failed to transcribe speech!", e);
    return undefined;
  }
};
