import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { colors } from "../styles/global";
import Input from "../components/Input";
import Button from "../components/Button";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
const cameraWidth = SCREEN_WIDTH - 32;
const cameraHeight = cameraWidth * 0.7;

const InitialState = {
  title: "",
  locality: "",
};

type CameraStackProps = {
  photoUrl: string;
  toggleCameraFacing: () => void;
  facing: CameraType;
  camera: React.RefObject<CameraView>;
  handleTakePicture: () => void;
};

const CreatePostsScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState(InitialState);
  const [photoUrl, setPhotoUrl] = useState("");

  const camera = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (permission && !permission.granted) {
    // Camera permissions are not granted yet.
    requestPermission();
  }

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

  const handleSubmit = () => {
    const post = {
      id: Math.random().toString(36).substr(2, 9),
      pictureUrl: photoUrl,
      pictureName: location.title,
      comments: 0,
      locality: location.locality,
    };
    console.log({ post });
    navigation.navigate("Home", {
      screen: "Posts",
      params: post,
    });
    // navigation.navigate("Home", { screen: "Posts", params: { user } });
    setLocation(InitialState);
    setPhotoUrl("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        <CameraStack
          {...{
            photoUrl,
            camera,
            toggleCameraFacing,
            facing,
            handleTakePicture,
          }}
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
          onTextChange={(locality) => setLocation({ ...location, locality })}
          outerStyles={[styles.inputOuterStyles, { paddingLeft: 28 }]}
        />
      </View>
      <View style={{ width: "100%" }}>
        <Button onPress={handleSubmit}>
          <Text style={[styles.text, { color: colors.white }]}>
            Опубліковати
          </Text>
        </Button>
      </View>
    </View>
  );
};

const CameraStack = ({
  photoUrl,
  toggleCameraFacing,
  facing = "back",
  camera,
  handleTakePicture,
}: CameraStackProps) => {
  return (
    <View style={styles.cameraContainer}>
      <CameraView style={styles.camera} facing={facing} ref={camera} />
      {photoUrl ? (
        <TouchableOpacity
          style={[
            styles.iconPhotoContainer,
            { backgroundColor: colors.white_opacity },
          ]}
          onPress={handleTakePicture}
        >
          <MaterialCommunityIcons
            name="camera"
            size={24}
            color={colors.white}
            style={styles.iconPhoto}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.iconPhotoContainer, { backgroundColor: colors.white }]}
          onPress={handleTakePicture}
        >
          <MaterialCommunityIcons
            name="camera"
            size={24}
            color={colors.border_gray}
            style={styles.iconPhoto}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[
          styles.iconFlipContainer,
          { backgroundColor: colors.white_opacity },
        ]}
        onPress={toggleCameraFacing}
      >
        <MaterialCommunityIcons
          name="camera-flip-outline"
          size={24}
          color={colors.white}
          style={styles.iconPhoto}
        />
      </TouchableOpacity>
    </View>
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
  cameraContainer: {
    position: "relative",
    width: cameraWidth,
    height: cameraHeight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
  },
  camera: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    backgroundColor: colors.light_gray,
  },
  iconPhotoContainer: {
    position: "absolute",
    width: 60,
    height: 60,
    top: cameraHeight / 2 - 30, // cameraHeight is the height of the cameraContainer;
    left: cameraWidth / 2 - 30, // cameraWidth is the width of the cameraContainer;
    borderRadius: 100,
    backgroundColor: colors.light_gray,
  },
  iconFlipContainer: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 4,
    right: 4,
    borderRadius: 100,
    backgroundColor: colors.light_gray,
  },
  iconPhoto: {
    width: 24,
    height: 24,
    top: 60 / 2 - 12, // 60 is the height of the iconPhotoContainer;
    left: 60 / 2 - 12, // 60 is the width of the iconPhotoContainer;
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
  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },
  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
});

export default CreatePostsScreen;
