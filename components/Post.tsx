import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { colors } from "../styles/global";
import { SimpleLineIcons, FontAwesome5 } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const pictureWidth = SCREEN_WIDTH - 32;
const pictureHeight = pictureWidth * 0.7;

export type PostProps = {
  id?: string;
  pictureUrl: string;
  pictureName: string;
  comments: [];
  locality: string;
  geoLocation?: { latitude: number; longitude: number };
  navigateToComments?: (item: PostProps) => void;
  navigateToMap?: (item: PostProps) => void;
};

const Post = ({
  pictureUrl = " ",
  pictureName,
  comments = [],
  locality,
  geoLocation = { latitude: 0, longitude: 0 },
  navigateToComments,
  navigateToMap,
}: PostProps) => (
  <>
    <View style={styles.pictureContainer}>
      <Image
        style={styles.picture}
        source={
          pictureUrl
            ? {
                uri: pictureUrl,
              }
            : require("../assets/images/default-image.png")
        }
      />
    </View>
    <Text style={styles.text}>{pictureName && pictureName}</Text>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TouchableOpacity
        style={{ flexDirection: "row", gap: 4 }}
        onPress={() =>
          navigateToComments({ pictureUrl, pictureName, comments, locality })
        }
      >
        <FontAwesome5 name="comment" size={24} color={colors.gray} />
        <Text style={styles.pictureCopy}>{comments.length}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: "row", gap: 6 }}
        onPress={() => navigateToMap(pictureName, locality, geoLocation)}
      >
        <SimpleLineIcons name="location-pin" size={24} color={colors.gray} />
        <Text style={styles.pictureCopy}>{locality && locality}</Text>
      </TouchableOpacity>
    </View>
  </>
);

const styles = StyleSheet.create({
  pictureContainer: {
    width: pictureWidth,
    height: pictureHeight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
  },
  picture: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    backgroundColor: colors.light_gray,
  },
  pictureCopy: {
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
  },
});

export default Post;
