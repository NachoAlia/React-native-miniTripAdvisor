import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { styles } from "./RestaurantsScreen.styles";
import { screen, db } from "../../../utils";
import { useNavigation, useFocusEffect } from "@react-navigation/native"; //hook para no usar props
import { getAuth, onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { LoadingModal, ListRestaurants } from "../../../components";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

//Laburar con exportaciones normales y no default

export function RestaurantsScreen() {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setEmailVerified(user?.emailVerified);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      // let docs = [];
      // snapshot.forEach(doc => docs.push({ ...doc.data(), id: doc.id }));
      setRestaurants(snapshot.docs);
    });
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      setEmailVerified(user?.emailVerified);
    });
    return unsubscribe;
  }, []);

  const goToAddRestaurant = () => {
    //navigation.navigate(screen.restaurant.addRestaurant);
    //por ejemplo si quisieramos navegar a una screen de otro tab
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.addRestaurant,
    });
  };

  return (
    <View style={styles.container}>
      {!restaurants ? (
        <LoadingModal show={!restaurants} text="Cargando.." />
      ) : (
        <ListRestaurants restaurants={restaurants} />
      )}

      {currentUser && emailVerified && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#00a680"
          containerStyle={styles.bntCotainter}
          onPress={goToAddRestaurant}
        />
      )}
    </View>
  );
}
