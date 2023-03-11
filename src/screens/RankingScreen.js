import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../utils";
import { size, map } from "lodash";
import { RestaurantRanking } from "../components";
export function RankingScreen() {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("ratingMedia", "desc"),
      limit(10)
    );
    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs);
    });
  }, [restaurants]);

  return (
    <ScrollView>
      {map(restaurants, (restaurant, index) => (
        <RestaurantRanking
          key={index}
          index={index}
          restaurant={restaurant.data()}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
