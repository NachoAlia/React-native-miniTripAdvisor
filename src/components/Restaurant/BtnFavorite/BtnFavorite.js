import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, Icon } from "react-native-elements";
import {
  doc,
  setDoc,
  getDocs,
  query,
  collection,
  where,
  deleteDoc,
  onSnapshot,
  limit,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { v4 as uuid } from "uuid";
import { db } from "../../../utils";
import { size, forEach } from "lodash";
import { styles } from "./BtnFavorite.styles";
import Toast from "react-native-toast-message";

export function BtnFavorite(props) {
  const { idRestaurant, onRemoveFavorite } = props;
  const [favorite, setFavorite] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    (async () => {
      if (auth.currentUser) {
        const response = await getFavorites();
        if (size(response) > 0) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      }
    })();
  }, [idRestaurant, isReload, auth]);

  const onReload = () => setIsReload((prevState) => !prevState);

  const getFavorites = async () => {
    const q = query(
      collection(db, "favorites"),
      where("idRestaurant", "==", idRestaurant),
      where("idUser", "==", auth.currentUser.uid),
      limit(1)
    );

    const result = await getDocs(q);
    return result.docs[0];
  };

  const addFavorite = async () => {
    try {
      const idFavorite = uuid();
      const data = {
        id: idFavorite,
        idRestaurant: idRestaurant,
        idUser: auth.currentUser.uid,
      };
      await setDoc(doc(db, "favorites", data.id), data);

      onReload();
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al agregar a favoritos, Intentelo mas tarde",
      });
    }
  };

  const removeFavorite = async () => {
    try {
      const response = await getFavorites();
      // forEach(response, async (item) => {
      //   await deleteDoc(doc(db, "favorites", item.id));
      // });

      await deleteDoc(doc(db, "favorites", response.id));

      onReload();
    } catch (error) {
      onReload();
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error al eliminar de favoritos, Intentelo mas tarde",
      });
      console.log(error);
    }
  };

  return (
    getAuth().currentUser &&
    getAuth().currentUser.emailVerified && (
      <View style={styles.content}>
        {favorite !== undefined && (
          <Icon
            type="material-community"
            name={!favorite ? "heart-outline" : "heart"}
            color={favorite ? "#f00" : "#000"}
            size={35}
            onPress={!favorite ? addFavorite : removeFavorite}
          />
        )}
      </View>
    )
  );
}
