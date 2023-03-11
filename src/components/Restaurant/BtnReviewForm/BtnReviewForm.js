import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { size } from "lodash";

import { useNavigation } from "@react-navigation/native";
import { db, screen } from "../../../utils";
import { styles } from "./BtnReviewForm.styles";

export function BtnReviewForm(props) {
  const { idRestaurant } = props;
  const [hasLogged, setHasLogged] = useState(false);
  const [hasReview, setHasReview] = useState(false);

  const auth = getAuth();
  const navigation = useNavigation();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (hasLogged) {
      const q = query(
        collection(db, "reviews"),
        where("idRestaurant", "==", idRestaurant),
        where("idUser", "==", auth.currentUser.uid)
      );

      onSnapshot(q, (snapshot) => {
        if (size(snapshot.docs) > 0) setHasReview(true);
      });
    }
  }, [hasLogged]);

  const goToAddReview = () => {
    navigation.navigate(screen.restaurant.addReviewRestaurant, {
      idRestaurant,
    });
  };

  const goToLogin = () => {
    navigation.navigate(screen.account.tab, { screen: screen.account.login });
  };

  if (hasLogged && hasReview) {
    return (
      <View style={styles.content}>
        <Text style={styles.text}>
          Ya has enviado un review a este restaurante
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      {hasLogged && getAuth().currentUser.emailVerified ? (
        <Button
          title="Escribe una opinión"
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#00a680",
          }}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={goToAddReview}
        />
      ) : hasLogged && !getAuth().currentUser.emailVerified ? (
        <Text style={styles.text}>
          Para escribir una opinión debes verificar tu cuenta
        </Text>
      ) : (
        <Text style={styles.text}>
          Para escribir una opinión tienes que iniciar sesión, pulsa{" "}
          <Text style={styles.textLink} onPress={goToLogin}>
            Aquí para iniciar sesión
          </Text>
        </Text>
      )}
    </View>
  );
}
