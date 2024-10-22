import React, { FC, useState } from "react";
import { StyleSheet, TextInput, View, ViewProps } from "react-native";
import { colors } from "../styles/global";

type InputProps = {
  value: string;
  placeholder?: string;
  outerStyles?: ViewProps["style"];
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  onTextChange: (value: string) => void;
  secureTextEntry?: boolean;
  autofocus?: boolean;
};

const Input: FC<InputProps> = ({
  value,
  onTextChange,
  placeholder,
  outerStyles,
  leftButton,
  rightButton,
  autofocus = false,
  secureTextEntry = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.input, isFocused && styles.focused, outerStyles]}>
      {leftButton}
      <TextInput
        value={value}
        autoFocus={autofocus}
        onChangeText={onTextChange}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.baseText}
        autoCapitalize="none"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {rightButton}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border_gray,
    backgroundColor: colors.light_gray,
  },
  baseText: {
    padding: 16,
    height: 50,
    width: "100%",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
    color: colors.black_primary,
  },
  focused: {
    backgroundColor: colors.white,
    borderColor: colors.orange,
  },
});

export default Input;
