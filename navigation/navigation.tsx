import "react-native-gesture-handler";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/global";
import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MapScreen from "../screens/MapScreen";
import CommentsScreen from "../screens/CommentsScreen";
import LogoutButton from "../components/LogoutButton";
import BackButton from "../components/BackButton";

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const PostsStack = createStackNavigator();

const Navigation = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true); // Update this line after refactoring

  const forwardBackButton = (navigation) => (
    <BackButton onPress={() => navigation.goBack()} />
  );

  const logOut = () => <LogoutButton onPress={handleLogOut} />;

  const handleLogOut = () => {
    setIsUserLoggedIn(false); // Update this line after refactoring
  };

  const TabNavigator = () => {
    const getTabBarVisibility = (route) => {
      const routeName = getFocusedRouteNameFromRoute(route) ?? "";
      if (routeName === "Comments" || routeName === "Map") {
        return { display: "none" };
      }
      return { display: "flex" };
    };

    const getHeaderVisibility = (route) => {
      const routeName = getFocusedRouteNameFromRoute(route) ?? "";
      return !(routeName === "Comments" || routeName === "Map");
    };

    const getTabIcon = (routeName, focused) => {
      const icons = {
        PostsStack: focused ? "grid" : "grid-outline",
        CreatePosts: focused ? "add-circle" : "add-circle-outline",
        Profile: focused ? "person" : "person-outline",
      };
      return icons[routeName] || "help-circle-outline";
    };

    return (
      <Tabs.Navigator
        initialRouteName="PostsStack"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={getTabIcon(route.name, focused)}
              size={focused ? 32 : 24}
              color={color}
            />
          ),
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
          tabBarActiveTintColor: colors.orange,
          tabBarInactiveTintColor: colors.black_primary_opacity,
          tabBarLabel: () => null,
        })}
      >
        <Tabs.Screen
          name="PostsStack"
          component={PostsStackNavigator}
          options={({ route }) => ({
            title: "Публікації",
            headerRight: logOut,
            tabBarStyle: getTabBarVisibility(route),
            headerShown: getHeaderVisibility(route),
          })}
        />
        <Tabs.Screen
          name="CreatePosts"
          component={CreatePostsScreen}
          options={({ navigation }) => ({
            title: "Створити публікацію",
            tabBarStyle: { display: "none" },
            headerLeft: () => forwardBackButton(navigation),
          })}
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
      <PostsStack.Navigator
        initialRouteName="PostsScreen"
        screenOptions={{
          headerRightContainerStyle: { paddingRight: 16 },
          headerLeftContainerStyle: { paddingLeft: 16 },
        }}
      >
        <PostsStack.Screen
          name="Posts"
          component={PostsScreen}
          options={{ headerShown: false }}
        />
        <PostsStack.Screen
          name="Map"
          component={MapScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Мапа",
            headerLeft: () => forwardBackButton(navigation),
          })}
        />
        <PostsStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Коментарі",
            headerLeft: () => forwardBackButton(navigation),
          })}
        />
      </PostsStack.Navigator>
    );
  };

  return <>{isUserLoggedIn ? <TabNavigator /> : <AuthStackNavigator />}</>;
};

export default Navigation;
