import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../styles/global";

const Comment = ({ comment }) => {
  return (
    <View style={styles.commentsWrapper}>
      <View style={styles.commentAvatarContainer}>
        <Text style={styles.commentAvatar}>{comment?.author[0]}</Text>
      </View>
      <View style={styles.commentContainer}>
        <Text style={styles.text}>{comment?.comment}</Text>
        <Text style={styles.dateTime}>{comment?.dateTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentsWrapper: {
    flexDirection: "row",
    gap: 16,
  },
  commentAvatarContainer: {
    width: 28,
    height: 28,
    borderRadius: 100,
    backgroundColor: colors.light_gray,
    justifyContent: "center",
    alignItems: "center",
  },
  commentAvatar: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    lineHeight: 18.75,
  },
  commentContainer: {
    width: "100%",
    padding: 16,
    gap: 8,
    borderRadius: 8,
    backgroundColor: "#00000003",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
  },
  dateTime: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: colors.gray,
  },
});

export default Comment;
