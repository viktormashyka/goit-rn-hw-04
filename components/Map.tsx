import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const Map = () => {
  return (
    <MapView
      style={styles.mapStyle}
      region={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      mapType="standard"
      minZoomLevel={15}
      onMapReady={() => console.log("Map is ready")}
      onRegionChange={() => console.log("Region change")}
    >
      <Marker
        title="I am here"
        coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
        description="Hello"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});

export default Map;
