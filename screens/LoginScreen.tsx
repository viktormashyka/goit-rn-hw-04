import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { colors } from "../styles/global";
import Button from "../components/Button";
import Link from "../components/Link";
import Input from "../components/Input";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
const InitialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [user, setUser] = useState(InitialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const showPassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const showButton = (
    <TouchableOpacity
      onPress={showPassword}
      style={{ position: "absolute", top: 12, right: 16 }}
    >
      <Text style={[styles.text, { color: colors.navy_blue }]}>
        {isPasswordVisible ? "Показати" : "Сховати"}
      </Text>
    </TouchableOpacity>
  );

  const handleSubmit = () => {
    console.log({ user });
    setUser(InitialState);
    navigation.navigate("Home", { screen: "Posts", params: { user } });
  };

  const navigateToRegistration = () => {
    navigation.navigate("Registration");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <ImageBackground
            style={styles.backgroundImage}
            source={require("../assets/images/backgroundImage.png")}
            resizeMode="cover"
          />
          <View style={styles.formContainer}>
            <Text style={[styles.title, { marginBottom: 32 }]}>Увійти</Text>
            <View style={{ gap: 16, marginBottom: 42 }}>
              {/* // TODO: Add validation */}
              <Input
                value={user.email}
                autofocus={true}
                placeholder="Адреса електронної пошти"
                onTextChange={(email) => setUser({ ...user, email })}
              />
              <Input
                value={user.password}
                placeholder="Пароль"
                rightButton={showButton}
                onTextChange={(password) => setUser({ ...user, password })}
                secureTextEntry={isPasswordVisible}
              />
            </View>
            <View style={{ gap: 16 }}>
              <Button onPress={handleSubmit}>
                <Text style={[styles.text, { color: colors.white }]}>
                  Увійти
                </Text>
              </Button>
              <Link onPress={navigateToRegistration}>
                <Text style={[styles.text, { color: colors.navy_blue }]}>
                  Немає акаунту?{" "}
                  <Text style={{ textDecorationLine: "underline" }}>
                    Зареєструватися
                  </Text>
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  formContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.white,
    width: SCREEN_WIDTH,
    height: "60%",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 45,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    textAlign: "center",
    lineHeight: 35.16,
    letterSpacing: 0.01,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "center",
  },
});

export default LoginScreen;
