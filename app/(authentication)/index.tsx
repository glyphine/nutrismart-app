import SlideButton from "@/components/slidingbutton";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, View } from "react-native";

interface OpeningEntry {
  image: any;
  title: string;
  texts: string;
}

const openingDataset: OpeningEntry[] = [
  {
    image: require("@/assets/images/opening.png"),
    title: "Healthy Picks",
    texts: "Find diabetic-friendly ingredients.",
  },
  {
    image: require("@/assets/images/openning2.png"),
    title: "Scan & Suggest",
    texts: "Scan food, get smart meals.",
  },
  {
    image: require("@/assets/images/openning3.png"),
    title: "AI-Powered",
    texts: "Eat better with smart guidance.",
  },
];

export default function OpeningPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const animateFade = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateFade(); // Animate on mount
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === openingDataset.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    animateFade(); // Animate on slide change
  }, [currentIndex]);

  const currentOpening = openingDataset[currentIndex];

  return (
    <View className="flex-1 bg-[#122938] items-center justify-start">
      <Animated.View
        className="flex-1 w-full h-1/2 items-start justify-start"
        style={{ opacity: fadeAnim }}
      >
        <Image
          source={currentOpening.image}
          className="w-full h-[550px]"
          resizeMode="cover"
        />
      </Animated.View>

      <Animated.Text
        className="text-4xl font-lexend-extrabold text-white mb-2"
        style={{ opacity: fadeAnim }}
      >
        {currentOpening.title}
      </Animated.Text>

      <Animated.Text
        className="text-white text-center mb-12 text-sm font-noto px-14"
        style={{ opacity: fadeAnim }}
      >
        {currentOpening.texts}
      </Animated.Text>

      {/* Static Dot Indicator */}
      <View className="flex-row mb-8">
        {openingDataset.map((_, index) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 6,
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
