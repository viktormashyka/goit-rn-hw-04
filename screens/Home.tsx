import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp } from "@react-navigation/native";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/global";

const Tabs = createBottomTabNavigator();

const Home = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const logOut = () => {
    return (
      <View style={styles.iconContainer}>
        <Feather
          name="log-out"
          size={24}
          color={colors.border_gray}
          onPress={handleLogOut}
        />
      </View>
    );
  };

  const handleLogOut = () => {
    navigation.navigate("Login");
  };

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          size = focused ? 32 : 24;

          if (route.name === "Posts") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "CreatePosts") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.black_primary_opacity,
        tabBarLabel: () => null,
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerRight: logOut,
        }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    paddingRight: 16,
  },
});

export default Home;
