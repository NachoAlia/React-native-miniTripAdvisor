import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Button, Text, Icon } from "react-native-elements";

import {
  getAuth,
  signOut,
  onAuthStateChanged,
  updateCurrentUser,
  onUserChange,
  updateProfile,
} from "firebase/auth";

import { doc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { screen, db } from "../../../utils";

import { InfoUser, AccountOptions } from "../../../components";
import { styles } from "./UserLoggedScreen.styles";

import { LoadingModal } from "../../../components";
import Toast from "react-native-toast-message";
import { VerifyEmail } from "../../../components/Auth/VerifyEmail/VerifyEmail";
import { update } from "firebase/database";

export function UserLoggedScreen() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [_, setReload] = useState(false);
  const [check, setCheck] = useState(false);
  const onReload = () => setReload((prevState) => !prevState);

  const navigation = useNavigation();

  const signOutUser = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.navigate(screen.restaurant.tab, {
          screen: screen.restaurant.restaurants,
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: String(error),
        });
      });
    // await auth.signOut();
    //navigation.navigate('restaurantTab', { screen: 'CommunityReply' });
  };

  return (
    <View style={styles.content}>
      <InfoUser
        setLoading={setLoading}
        setLoadingText={setLoadingText}
        check={check}
      />
      <AccountOptions onReload={onReload} />
      {!getAuth().currentUser.emailVerified && (
        <VerifyEmail setCheck={setCheck} />
      )}

      <Button
        title="Cerrar sesion"
        buttonStyle={styles.btnSignOut}
        titleStyle={styles.btnTitleSignOut}
        onPress={signOutUser}
      />
      <LoadingModal show={loading} text={loadingText} />
    </View>
  );
}
