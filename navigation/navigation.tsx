import "react-native-gesture-handler";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MapScreen from "../screens/MapScreen";
import CommentsScreen from "../screens/CommentsScreen";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/global";

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const PostsStack = createStackNavigator();

const Navigation = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true); // Update this line after refactoring

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
    setIsUserLoggedIn(false); // Update this line after refactoring
  };

  const TabNavigator = () => {
    return (
      <Tabs.Navigator
        initialRouteName="PostsStack"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            size = focused ? 32 : 24;

            if (route.name === "PostsStack") {
              iconName = focused ? "grid" : "grid-outline";
            } else if (route.name === "CreatePosts") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }
            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: colors.orange,
          tabBarInactiveTintColor: colors.black_primary_opacity,
          tabBarLabel: () => null,
        })}
      >
        <Tabs.Screen
          name="PostsStack"
          component={PostsStackNavigator}
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

  const AuthStackNavigator = () => {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  };

  const PostsStackNavigator = () => {
    return (
      <PostsStack.Navigator initialRouteName="PostsScreen">
        <PostsStack.Screen
          name="Posts"
          component={PostsScreen}
          options={{ headerShown: false }}
        />
        <PostsStack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: true }}
        />
        <PostsStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{ headerShown: true }}
        />
      </PostsStack.Navigator>
    );
  };

  return <>{isUserLoggedIn ? <TabNavigator /> : <AuthStackNavigator />}</>;
};

const styles = StyleSheet.create({
  iconContainer: {
    paddingRight: 16,
  },
});

export default Navigation;
