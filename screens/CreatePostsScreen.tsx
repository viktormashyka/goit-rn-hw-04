import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { SimpleLineIcons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { colors } from "../styles/global";
import Input from "../components/Input";
import Button from "../components/Button";
import Camera from "../components/Camera";

import * as Location from "expo-location";

const InitialState = {
  title: "",
  locality: "",
};

const CreatePostsScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(InitialState);
  const [photoUrl, setPhotoUrl] = useState("");
  const [geoLocation, setGeoLocation] = useState(null);
  const camera = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  // TODO: move Camera to helpers
  const [permission, requestPermission] = useCameraPermissions();
  const isEnabled = location.title && location.locality;
  // const isEnabled = photoUrl && location.title && location.locality; TODO: uncomment after adding photoUrl

  useEffect(() => {
    // Geolocation
    // TODO: move Location to helpers
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };

      setGeoLocation(coords);
    })();
  }, []);

  const localityIcon = (
    <SimpleLineIcons
      name="location-pin"
      size={24}
      color={colors.gray}
      style={styles.iconLocality}
    />
  );

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleTakePicture = async () => {
    if (camera.current) {
      const picture = await camera.current.takePictureAsync();
      if (picture?.uri) {
        setPhotoUrl(picture.uri);
        await MediaLibrary.createAssetAsync(picture.uri);
      }
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (permission && !permission.granted) {
    // Camera permissions are not granted yet.
    requestPermission();
    // return <View />;
  }

  const handleSubmit = () => {
    if (!isEnabled) {
      alert("Please fill in all fields.");
      return;
    }
    const post = {
      id: uuid.v4(),
      pictureUrl: photoUrl,
      pictureName: location.title,
      comments: [],
      locality: location.locality,
      geoLocation,
    };
    navigation.navigate("Posts", { post });
    setLocation(InitialState);
    setPhotoUrl("");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.cameraWrapper}>
            <Camera
              {...{ toggleCameraFacing, facing, camera, handleTakePicture }}
            />
            <Text style={styles.cameraWrapperCopy}>
              {photoUrl ? "Редагувати фото" : "Завантажте фото"}
            </Text>
          </View>
          <View style={{ width: "100%", gap: 16 }}>
            {/* // TODO: Add validation */}
            <Input
              value={location.title}
              autofocus={true}
              placeholder="Назва..."
              onTextChange={(title) => setLocation({ ...location, title })}
              outerStyles={styles.inputOuterStyles}
            />
            <Input
              value={location.locality}
              autofocus={true}
              placeholder="Місцевість..."
              leftButton={localityIcon}
              onTextChange={(locality) =>
                setLocation({ ...location, locality })
              }
              outerStyles={[styles.inputOuterStyles, { paddingLeft: 28 }]}
            />
          </View>
          <View style={{ width: "100%" }}>
            <Button onPress={handleSubmit} disabled={!isEnabled}>
              <Text
                style={[
                  styles.text,
                  { color: isEnabled ? colors.white : colors.gray },
                ]}
              >
                Опубліковати
              </Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: "center",
    backgroundColor: colors.white,
    gap: 32,
  },
  cameraWrapper: {
    gap: 8,
  },
  cameraWrapperCopy: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "left",
    color: colors.gray,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "center",
  },
  iconLocality: {
    position: "absolute",
    width: 24,
    height: 24,
    top: 50 / 2 - 12, // 50 is the height of the inputContainer;
    left: 0,
  },
  inputOuterStyles: {
    paddingLeft: 0,
    borderColor: "transparent",
    backgroundColor: colors.white,
    borderBottomColor: colors.border_gray,
    borderRadius: 0,
  },
});

export default CreatePostsScreen;
