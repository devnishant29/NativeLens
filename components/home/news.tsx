import { Text, View } from "react-native";
import { useState } from "react";
import React from "react";
import { Image } from "react-native";

import Animated, { FadeInDown } from "react-native-reanimated";

const News = () => {
  const [imageError, setImageError] = useState(false);
  const newsItems = [
    {
      title:
        "Stargazers Across the Nation Witness a Mesmerizing Display as the Night Sky Lights Up with Meteor Showers and Celestial Wonders",
      imageUrl:
        "https://images.pexels.com/photos/4417069/pexels-photo-4417069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description:
        "Astronomy enthusiasts were treated to a spectacular night sky this weekend, as meteor showers and clear weather created the perfect conditions for stargazing.",
      date: "2025-04-09",
      author: "Emily Carter",
    },
    {
      title:
        "Thrill-Seekers and Nature Lovers Embark on an Unforgettable Journey Through the Snow-Capped Peaks and Remote Trails of the Majestic Mountains",
      imageUrl:
        "https://images.pexels.com/photos/3593923/pexels-photo-3593923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description:
        "Travelers across the globe are embracing the mountains for peace, solitude, and unmatched natural beauty. Here's a glimpse into their journeys.",
      date: "2025-04-08",
      author: "Michael Rivera",
    },
    {
      title:
        "Escape the Hustle and Bustle: Discover the Hidden Serenity of Winding Roads Cutting Through Lush Forests and Whispering Pines",
      imageUrl:
        "https://images.pexels.com/photos/2876511/pexels-photo-2876511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description:
        "With spring in full swing, secluded forest roads are becoming popular among road-trippers seeking tranquility and connection with nature.",
      date: "2025-04-07",
      author: "Samantha Lee",
    },
  ];

  return (
    <View className="pb-16">
      {newsItems.map((item, index) => (
        <Animated.View
          key={index}
          className="mx-4 mb-4 rounded-xl overflow-hidden"
          entering={FadeInDown.duration(500).delay(index * 100)}
        >
          {imageError ? (
            <View
              style={{
                width: "100%",
                backgroundColor: "gray",
                borderRadius: 8,
              }}
            />
          ) : (
            <Image
              source={{ uri: item.imageUrl }}
              className="w-full h-60 rounded-[24px]"
              resizeMode="cover"
              onError={() => setImageError(true)}
            />
          )}

          <View className="px-2 pb-6 pt-2">
            <Text className="text-white text-lg font-medium" numberOfLines={3}>
              {item.title}
            </Text>
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

export default News;
