import React from "react";
import { View } from "react-native";
import { Text, Icon } from "react-native-elements";
import { styles } from "./NotFoundRestaurant.styles";

export function NotFoundRestaurant() {
  return (
    <View style={styles.content}>
      <Icon type="material-community" name="alert-outline" size={80} />
      <Text style={styles.text}>No tienes ningun favorito en tu lista</Text>
    </View>
  );
}
