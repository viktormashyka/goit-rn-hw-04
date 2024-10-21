import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

type LinkProps = {
  children: React.ReactNode;
  buttonStyle?: ViewStyle;
  onPress: () => void;
};

const Link: FC<LinkProps> = ({ children, onPress, buttonStyle }) => {
  return (
    <TouchableOpacity style={[styles.link, buttonStyle]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {},
});

export default Link;
