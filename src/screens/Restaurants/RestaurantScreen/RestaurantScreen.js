import React, { useState, useEffect } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Text, Image } from "react-native-elements";
import { styles } from "./RestaurantScreen.styles";
import { db } from "../../../utils";
import { doc, onSnapshot } from "firebase/firestore";

import {
  Loading,
  Header,
  Info,
  BtnReviewForm,
  Reviews,
  BtnFavorite,
} from "../../../components";

const { width } = Dimensions.get("window");

export function RestaurantScreen(props) {
  const { route } = props;
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    setRestaurant(null);
    onSnapshot(doc(db, "restaurants", route.params.id), (doc) => {
      setRestaurant(doc.data());
    });
  }, [route.params.id]);

  return (
    <>
      {!restaurant ? (
        <Loading show={true} text={"Cargando restaurante"} />
      ) : (
        <ScrollView style={styles.content}>
          <Image
            source={{ uri: restaurant.images[0] }}
            style={{ width: width, height: 300 }}
          />
          <Header restaurant={restaurant} />
          <Info restaurant={restaurant} />
          <BtnReviewForm idRestaurant={restaurant.id} />
          <Reviews idRestaurant={restaurant.id} />
          <BtnFavorite idRestaurant={restaurant.id} />
        </ScrollView>
      )}
    </>
  );
}
