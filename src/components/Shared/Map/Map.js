import React from "react";
import { View, Linking } from "react-native";
import { Text } from "react-native-elements";
import { styles } from "./Map.styles";
import MapView, { Marker } from "react-native-maps";

export function Map(props) {
  const { location, name, description } = props;
  const openAppMap = () => {
    Linking.openURL(`geo:${location.latitude},${location.longitude}`);
  };
  return (
    <MapView
      initialRegion={location}
      style={styles.mapContent}
      showsUserLocation={true}
      onPress={openAppMap}
    >
      <Marker
        coordinate={location}
        pinColor={"purple"}
        title={name}
        description={description}
      />
    </MapView>
  );
}
