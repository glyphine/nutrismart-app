import { COLORS } from "@/constants/themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, Platform, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TAB_COUNT = 5;
const TAB_WIDTH = SCREEN_WIDTH / TAB_COUNT;

export default function ClientLayout() {
  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: COLORS.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 86,
            paddingBottom: Platform.OS === "ios" ? 24 : 18,
            paddingTop: 8,
          },
          tabBarIcon: ({ focused }) => {
            const iconColor = focused ? COLORS.red : COLORS.primary;

            const iconProps = { size: 28, color: iconColor };
            let icon;

            switch (route.name) {
              case "index":
                icon = <Ionicons name="home" {...iconProps} />;
                break;
              case "inventory":
                icon = (
                  <MaterialCommunityIcons name="fridge-industrial" {...iconProps} />
                );
                break;
              case "favorites":
                icon = <MaterialIcons name="favorite" {...iconProps} />;
                break;
              case "generate":
                icon = <MaterialCommunityIcons name="robot" {...iconProps} />;
                break;
              case "add":
                return (
                  <View
                    className="h-16 w-16 rounded-full justify-center items-center mb-8"
                    style={{
                      backgroundColor: COLORS.primary,
                      ...Platform.select({
                        ios: {
                          shadowColor: COLORS.gray,
                          shadowOffset: { width: 0, height: 6 },
                          shadowOpacity: 0.3,
                          shadowRadius: 6,
                        },
                        android: {
                          elevation: 6,
                        },
                      }),
                    }}
                  >
                    <MaterialCommunityIcons name="line-scan" size={32} color={COLORS.white} />
                  </View>
                );
              default:
                icon = <Ionicons name="help" {...iconProps} />;
            }

            return <View className="items-center justify-center">{icon}</View>;
          },
        })}
      >
        <Tabs.Screen name="index" options={{ title: "Home", headerShown: false }} />
        <Tabs.Screen name="inventory" options={{ title: "Inventory", headerShown: false }} />
        <Tabs.Screen name="add" options={{ title: "Add", headerShown: false, tabBarStyle: { display: "none" }}} />
        <Tabs.Screen name="favorites" options={{ title: "Favorites", headerShown: false }} />
        <Tabs.Screen name="generate" options={{ title: "Generate", headerShown: false }} /> 
        <Tabs.Screen name="hidden/profile" options={{ href: null, headerShown: false }} />
        <Tabs.Screen name="ingredient/add" options={{ href: null, headerShown: false }} />
        <Tabs.Screen name="ingredient/scan" options={{ href: null, headerShown: false, tabBarStyle: { display: "none" }}} />
        <Tabs.Screen name="ingredient/[id]" options={{ href: null, headerShown: false }} />
        <Tabs.Screen name="recipes" options={{ href: null, headerShown: false }} />
      </Tabs>
    </>
  );
}
