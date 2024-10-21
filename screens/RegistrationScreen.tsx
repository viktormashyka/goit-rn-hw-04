import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { colors } from "../styles/global";
import Button from "../components/Button";
import Link from "../components/Link";
import Input from "../components/Input";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
const avatarUrl =
  "https://s3-alpha-sig.figma.com/img/d7eb/2439/565ee2bb708d7a3f27c90a7cd3c9f0fa?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CtHVPTuQB2H3rFOE7XWaC-UpOHFHPtGobXLWgjCZkGnv38OwOtuZksAAt4O0c2e4mgipUcqb~vTWB7cKDdlAGQ4xZA~gJrBaCn7ZEuv6d0oqMbWVMpVGmw29YRZKhhAuHecwcnOmNpCdN4aL5MggbUPVQuB4~YpPgLQUBCaet4K4rZqSCVSTGjydvpRnzErE9SI-bSaYnH17T81foyjbpPlCnOCUekmgzWEsgMyZw-WrpfgYEFxOLnYvICU64wKKQC5cB6YLLDuEz9NyLtxnY23gudoSLAZDGeugJYvcNORusfoShaoasR6bCka3-MFRrz8krBxYac3jAJVoDRRjVQ__";

const InitialState = {
  nickname: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
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
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
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
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={
                  avatarUrl && {
                    uri: avatarUrl,
                  }
                }
              />
              {avatarUrl ? (
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: colors.white },
                  ]}
                >
                  <AntDesign
                    name="closecircleo"
                    size={24}
                    color={colors.border_gray}
                    onPress={() => {
                      console.log(
                        "TODO: add functionality for removing avatar"
                      );
                    }}
                  />
                </View>
              ) : (
                <View style={styles.iconContainer}>
                  <AntDesign
                    name="pluscircleo"
                    size={24}
                    color={colors.orange}
                    onPress={() => {
                      console.log("TODO: add functionality for adding avatar");
                    }}
                  />
                </View>
              )}
            </View>
            <Text style={[styles.title, { marginBottom: 32 }]}>Реєстрація</Text>
            <View style={{ gap: 16, marginBottom: 42 }}>
              <Input
                value={user.nickname}
                autofocus={true}
                placeholder="Логін"
                onTextChange={(nickname) =>
                  setUser((prev) => ({ ...prev, nickname }))
                }
              />
              <Input
                value={user.email}
                autofocus={true}
                placeholder="Адреса електронної пошти"
                onTextChange={(email) =>
                  setUser((prev) => ({ ...prev, email }))
                }
              />
              <Input
                value={user.password}
                placeholder="Пароль"
                rightButton={showButton}
                onTextChange={(password) =>
                  setUser((prev) => ({ ...prev, password }))
                }
                secureTextEntry={isPasswordVisible}
              />
            </View>
            <View style={{ gap: 16 }}>
              <Button onPress={handleSubmit}>
                <Text style={[styles.text, { color: colors.white }]}>
                  Зареєструватися
                </Text>
              </Button>
              <Link onPress={navigateToLogin}>
                <Text style={[styles.text, { color: colors.navy_blue }]}>
                  Вже є акаунт? Увійти
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
    height: "68%",
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 45,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarContainer: {
    position: "absolute",
    width: 120,
    height: 120,
    top: -60,
    left: SCREEN_WIDTH / 2 - 60,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.light_gray,
    backgroundColor: colors.light_gray,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
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
  iconContainer: {
    position: "absolute",
    bottom: 26,
    right: -12,
    borderRadius: 100,
    overflow: "hidden",
  },
});

export default RegistrationScreen;
