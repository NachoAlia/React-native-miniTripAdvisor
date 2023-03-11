import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, Image } from "react-native-elements";
import { RestaurantStack } from "./RestaurantStack";
import { FavoritesStack } from "./FavoriteStack";
import { AccountStack } from "./AccountStack";
import { RankingStack } from "./RankingStack";
import { SearchStack } from "./SearchStack";
import { screen } from "../utils";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#00a680",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({ color, size }) => screenOptions(route, color, size),
        tabBarLabelStyle: {
          fontSize: 10,
          margin: 1,
          padding: 1,
        },
      })}
    >
      <Tab.Screen
        name={screen.restaurant.tab}
        component={RestaurantStack}
        options={{
          title: "Restaurantes",
        }}
      />
      <Tab.Screen
        name={screen.favorites.tab}
        component={FavoritesStack}
        options={{
          title: "Favoritos",
        }}
      />
      <Tab.Screen
        name={screen.ranking.tab}
        component={RankingStack}
        options={{
          title: "Ranking",
          tabBarIcon: () => {
            return (
              <Image
                source={require("../../assets/img/icons8-star-filled.gif")}
                style={{ width: 30, height: 30 }}
              />
            );
          },
          tabBarActiveTintColor: "#fdcc0d",
        }}
      />
      <Tab.Screen
        name={screen.search.tab}
        component={SearchStack}
        options={{
          title: "Buscar",
        }}
      />
      <Tab.Screen
        name={screen.account.tab}
        component={AccountStack}
        options={{
          title: "Mi cuenta",
        }}
      />
    </Tab.Navigator>
  );
}

function screenOptions(route, color, size) {
  let iconName;

  if (route.name === screen.restaurant.tab) {
    iconName = "compass-outline";
  }
  if (route.name === screen.favorites.tab) {
    iconName = "heart-outline";
  }
  if (route.name === screen.ranking.tab) {
    //iconName = "star-outline";
    return null;
  }
  if (route.name === screen.account.tab) {
    iconName = "account-outline";
  }
  if (route.name === screen.search.tab) {
    iconName = "magnify";
  }

  return (
    <Icon type="material-community" name={iconName} color={color} size={size} />
  );
}
