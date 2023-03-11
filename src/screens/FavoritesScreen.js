import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../utils";
import { Loading } from "../components";
import { size, map } from "lodash";
import { UserNotLogged, NotFoundRestaurant } from "../components";
import { RestaurantFavorites } from "../components";

export function FavoritesScreen() {
  const [hasLoggued, setHasLoggued] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const [newFavorite, setNewFavorite] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLoggued(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (auth.currentUser) {
      const q = query(
        collection(db, "favorites"),
        where("idUser", "==", auth.currentUser.uid)
      );

      onSnapshot(q, async (snapshot) => {
        let restaurants = [];

        for await (const item of snapshot.docs) {
          const data = item.data();
          const docRef = doc(db, "restaurants", data.idRestaurant);
          const docSnap = await getDoc(docRef);
          const newData = docSnap.data();
          newData.idFavorite = data.id;
          restaurants.push(newData);
        }
        setRestaurants(restaurants);
      });
    }
  }, [auth]);

  if (!hasLoggued) return <UserNotLogged />;

  if (size(restaurants) == 0) return <NotFoundRestaurant />;

  return (
    <>
      <Loading show={!restaurants} text="Cargando" />
      <ScrollView>
        {map(restaurants, (restaurant) => (
          <RestaurantFavorites
            key={restaurant.idFavorite}
            restaurant={restaurant}
          />
        ))}
      </ScrollView>
    </>
  );
}
