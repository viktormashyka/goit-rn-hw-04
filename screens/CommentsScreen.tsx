import React, { useState } from "react";
import {
  View,
  Dimensions,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { colors } from "../styles/global";
import Comment from "../components/Comment";
import Input from "../components/Input";
import SendButton from "../components/SendButton";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const pictureWidth = SCREEN_WIDTH - 32;
const pictureHeight = pictureWidth * 0.7;

const CommentsScreen = ({ navigation, route }) => {
  const [userComment, setUserComment] = useState("");
  const { item } = route.params;

  const handleSendComment = () => {
    console.log("TODO: add functionality to send comment from authorized user");
    if (!userComment) {
      alert("Please fill in field.");
      return;
    }
    navigation.navigate("Posts", { userComment });
  };

  const sendComment = (
    <TouchableOpacity
      onPress={handleSendComment}
      style={{ position: "absolute", top: 8, right: 16 }}
    >
      <SendButton onPress={handleSendComment} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.pictureContainer}>
        <Image
          style={styles.picture}
          source={
            item.pictureUrl
              ? {
                  uri: item.pictureUrl,
                }
              : require("../assets/images/default-image.png")
          }
        />
      </View>
      <FlatList
        data={item.comments}
        renderItem={({ item }) => {
          return <Comment comment={item} />;
        }}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
      />
      <Input
        value={userComment}
        autofocus={true}
        placeholder="Коментувати..."
        onTextChange={setUserComment}
        rightButton={sendComment}
        outerStyles={{ borderRadius: 50 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    justifyContent: "flex-start",
    backgroundColor: colors.white,
    gap: 32,
  },
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
});

export default CommentsScreen;
