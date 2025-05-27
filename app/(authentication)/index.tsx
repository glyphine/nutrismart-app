import SlideButton from "@/components/slidingbutton";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

interface OpeningEntry {
  image: any;
  texts: string;
}

const openingDataset: OpeningEntry[] = [
  {
    image: require("@/assets/images/opening.png"),
    texts: "NutriSmart helps diabetics find healthy food options.",
  },
  {
    image: require("@/assets/images/openning2.png"),
    texts: "NutriSmart scans ingredients and suggests smart meals.",
  },
  {
    image: require("@/assets/images/openning3.png"),
    texts: "NutriSmart uses AI to support better eating habits.",
  },
];

export default function OpeningPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const interval = setInterval(() => {
      if (!isMounted) return;
      setCurrentIndex((prevIndex) =>
        prevIndex === openingDataset.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const currentOpening = openingDataset[currentIndex];

  return (
    <View className="flex-1 bg-[#122938] items-center justify-start">
      <View className="flex-1 w-full h-1/2 items-start justify-start">
        <Image
          source={currentOpening.image}
          className="w-full h-[550px]"
          resizeMode="cover"
        />
      </View>

      <Text className="text-5xl font-lexend-extrabold text-white mb-4">
        Nutri<Text className="text-yellow">Smart</Text>
      </Text>

      <Text className="text-white text-center mb-6 text-sm font-noto px-14">
        {currentOpening.texts}
      </Text>

      {/* Static Dot Indicator */}
      <View className="flex-row mb-6">
        {openingDataset.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 5, // makes it a circle
              marginHorizontal: 2, // adds spacing between dots
              backgroundColor:
                index === currentIndex ? "#F4E99A" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </View>

      <SlideButton />
    </View>
  );
}
