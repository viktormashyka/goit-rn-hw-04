import React from "react";
import { View } from "react-native";
import Map from "../components/Map";

const MapScreen = ({ route }) => {
  const { item } = route.params;
  console.log("Map screen item => ", item);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Map item={item} />
    </View>
  );
};

export default MapScreen;
