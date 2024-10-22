import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { CameraView, CameraType } from "expo-camera";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../styles/global";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const cameraWidth = SCREEN_WIDTH - 32;
const cameraHeight = cameraWidth * 0.7;

export type CameraProps = {
  toggleCameraFacing: () => void;
  facing: CameraType;
  camera: React.RefObject<CameraView>;
  handleTakePicture: () => void;
};

const Camera = ({
  toggleCameraFacing,
  facing = "back",
  camera,
  handleTakePicture,
}: CameraProps) => {
  return (
    <View style={styles.cameraContainer}>
      <CameraView style={styles.camera} facing={facing} ref={camera} />
      <TouchableOpacity
        style={[
          styles.iconPhotoContainer,
          { backgroundColor: colors.white_opacity },
        ]}
        onPress={handleTakePicture}
      >
        <MaterialCommunityIcons
          name="camera-outline"
          size={24}
          color={colors.white}
          style={styles.iconPhoto}
        />
      </TouchableOpacity>
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
});

export default Camera;
