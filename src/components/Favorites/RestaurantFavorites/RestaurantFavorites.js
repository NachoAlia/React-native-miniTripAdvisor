import React, { useState } from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Image, Icon, Text } from "react-native-elements";
import { styles } from "./RestaurantFavorites.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { getAuth } from "firebase/auth";
import { db } from "../../../utils";
import {
  query,
  doc,
  collection,
  onSnapshot,
  where,
  deleteDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";

export function RestaurantFavorites(props) {
  const { restaurant } = props;
  const [isRemovingFavorite, setIsRemovingFavorite] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();
  const goToRestaurant = (restaurant) => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: {
        id: restaurant.id,
        name: restaurant.name,
      },
    });
  };
  const onRemoveFavorite = async () => {
    try {
      setIsRemovingFavorite(true);
      const docRef = doc(db, "favorites", restaurant.idFavorite);
      await deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity onPress={() => goToRestaurant(restaurant)}>
      <View style={styles.content}>
        <Image source={{ uri: restaurant.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <Text style={styles.name}>{restaurant.name}</Text>
          {!isRemovingFavorite ? (
            <Icon
              type="material-community"
              name="heart"
              color="#f00"
              size={35}
              containerStyle={styles.heartContainer}
              onPress={onRemoveFavorite}
            />
          ) : (
            <View style={styles.loadingHeart}>
              <ActivityIndicator size="large" color="#f00" />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
