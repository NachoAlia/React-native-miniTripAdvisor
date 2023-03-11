import React, { useState } from "react";
import { View } from "react-native";
import { Avatar, Text, Icon } from "react-native-elements";
import { styles } from "./InfoUser.styles";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";

import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function InfoUser(props) {
  const { setLoading, setLoadingText, check } = props;
  const { uid, email, photoURL, displayName } = getAuth().currentUser;
  const [avatar, setAvatar] = useState(photoURL);

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, //aceptar todos los tipos
      allowsEditing: true, // dar zoom a las imagenes, editarlas, etc
      aspect: [4, 3], //aspecto cuatro tercios
    });
    if (!result.canceled) uploadImage(result.assets[0].uri);
  };

  const uploadImage = async (uri) => {
    setLoadingText("Actualizando Avatar");
    setLoading(true);

    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${uid}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoUrl(snapshot.metadata.fullPath);
    });
  };

  const updatePhotoUrl = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(imageRef);
    const auth = getAuth();
    updateProfile(auth.currentUser, { photoURL: imageUrl });
    setAvatar(imageUrl);
    setLoading(false);
  };

  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        icon={getIcon(avatar)}
        source={avatar ? { uri: avatar } : { uri: "no-image" }}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>
          {displayName || "Anonimo"}

          {(check || getAuth().currentUser.emailVerified) && (
            <Icon
              type="material-community"
              name="check-decagram"
              color="#00a680"
              onPress={() => {
                Toast.show({
                  type: "info",
                  position: "bottom",
                  text1: "Esta cuenta ha sido verificada",
                });
              }}
            />
          )}
        </Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}

export function getIcon(avatar) {
  if (avatar == null)
    return {
      type: "material",
      name: "person",
      color: "white",
    };
  return null;
}
