import React from "react";
import { View } from "react-native";
import { Text, Rating } from "react-native-elements";
import { styles } from "./Header.styles";

export function Header(props) {
  const {restaurant} = props;
  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <View style={styles.ratingContainer}>
          {restaurant.ratingMedia?
          <Text style={styles.ratingText}>{(restaurant.ratingMedia.toPrecision(2))+"/5"}</Text>
          : 
          <Text style={styles.ratingText}>0/5</Text>}
        <Rating 
          type="star" 
          startingValue={restaurant.ratingMedia | 0} 
          endingValue={restaurant.ratingMedia | 0} 
          imageSize={20} 
          readonly 
          style={styles.rating}
          
          />
          </View>
      </View> 
      <Text style={styles.description}>{restaurant.description}</Text>
    </View>
  )
}