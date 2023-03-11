import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { styles } from "./ListRestaurants.styles";
import { Text, Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { screen } from "../../../utils"
export function ListRestaurants(props) {

  const { restaurants } = props;
  const navigation = useNavigation();
  const goToRestaurant = (restaurant) => {
    navigation.navigate(screen.restaurant.restaurant,{ "id":restaurant.id, "name":restaurant.name})
  }



  return (
    <View>
      <FlatList
        data={restaurants}
        renderItem={(doc) => {
          const restaurant = doc.item.data();
          
          return (
            <TouchableOpacity onPress={()=>goToRestaurant(restaurant)}>
              <View style={styles.restaurantContent}>
                <Image
                  source={{uri:restaurant.images[0]}} style={styles.image}
                />
                <View >
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  <Text style={styles.restaurantInfo}>{restaurant.description}</Text>
                  <Text style={styles.restaurantInfo}>Direccion: {restaurant.address}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );

        }}
      >

      </FlatList>
    </View>
  )
}