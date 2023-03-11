import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screen } from "../utils";
import {
  RestaurantsScreen,
  RestaurantScreen,
  AddRestaurantScreen,
  AddReviewRestaurantScreen,
} from "../screens/Restaurants";
//import { RestaurantScreen } from "../screens/Restaurants/RestaurantScreen";
//import { AddRestaurantScreen } from "../screens/Restaurants/AddRestaurantScreen";
const Stack = createNativeStackNavigator();

export function RestaurantStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.restaurant.restaurants}
        component={RestaurantsScreen}
        options={{
          title: "Restaurantes",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name={screen.restaurant.addRestaurant}
        component={AddRestaurantScreen}
        options={{
          title: "Agregar Restaurante",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name={screen.restaurant.restaurant}
        component={RestaurantScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name={screen.restaurant.addReviewRestaurant}
        component={AddReviewRestaurantScreen}
        options={{
          title: "Nueva opinión",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
