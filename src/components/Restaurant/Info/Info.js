import React, { useState } from "react";
import {
  View,
  ScrollView,
  Linking,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Text, ListItem, Icon, Avatar, Image } from "react-native-elements";
import { map } from "lodash";
import { styles } from "./Info.styles";
import { Modal, Loading } from "../../Shared";

//import * as Permissions from "expo-permissions";

export function Info(props) {
  const { restaurant } = props;
  const [imageModal, setImageModal] = useState(null);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [openAction, setOpenAction] = useState(false);

  const listInfo = [
    {
      text: restaurant.address,
      iconName: "map-marker",
      iconType: "material-community",
      handleAction: () => onHandleOpenMap(restaurant.address),
    },
    {
      text: restaurant.phone,
      iconName: "phone",
      iconType: "material-community",
      handleAction: () => onHandlePhoneCall(restaurant.phone),
    },
    {
      text: restaurant.web,
      iconName: "web",
      iconType: "material-community",
      handleAction: () => onHandleOpenBrowser(restaurant.web),
    },
  ];

  const showModalImage = (image) => {
    setImageModal(image);
    setOpenImageModal(true);
  };
  const closeModalImage = () => {
    setOpenImageModal(false);
  };

  const onHandlePhoneCall = async (phone) => {
    setOpenAction(true);

    if (Platform.OS === "android") {
      const phoneUrl = `tel:${phone}`;
      const supported = await Linking.canOpenURL(phoneUrl);
      if (supported) {
        await Linking.openURL(phoneUrl);
      } else {
        console.log(`No se puede abrir el enlace de teléfono: ${phoneUrl}`);
      }
    } else {
      console.log("This feature is only available on Android");
    }
    setTimeout(() => {
      setOpenAction(false);
    }, 2000);
  };

  const onHandleOpenMap = async (address) => {
    setOpenAction(true);
    const encodedAddress = encodeURIComponent(address); //se asegura que la url sea valida
    const url = Platform.select({
      ios: `maps://?q=${encodedAddress}`,
      android: `geo:0,0?q=${encodedAddress}`,
    });
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`No se puede abrir el enlace de mapas: ${url}`);
    }
    setTimeout(() => {
      setOpenAction(false);
    }, 2000);
  };

  const onHandleOpenBrowser = async (url) => {
    setOpenAction(true);

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`No se puede abrir el enlace: ${url}`);
    }

    setTimeout(() => {
      setOpenAction(false);
    }, 2000);
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Informacion sobre el restaurante</Text>
      <Modal show={openImageModal} close={closeModalImage}>
        <Image
          source={{ uri: imageModal }}
          style={{ width: 350, height: 300, alignSelf: "center" }}
        />
      </Modal>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5, marginBottom: 15 }}
      >
        {map(restaurant.images, (element, index) => (
          <Avatar
            key={index}
            source={{ uri: element }}
            size="large"
            containerStyle={{ marginHorizontal: 5 }}
            onPress={() => showModalImage(element)}
          />
        ))}
      </ScrollView>
      {openAction && <ActivityIndicator size={30} color="#00a680" />}
      {map(listInfo, (item, index) => (
        <ListItem key={index} bottomDivider>
          <Icon type={item.iconType} name={item.iconName} color="#00a680" />
          <ListItem.Content>
            <ListItem.Title onPress={item.handleAction}>
              {item.text}
            </ListItem.Title>
          </ListItem.Content>

          <Icon type={item.iconType} name="chevron-right" color="#00a680" />
        </ListItem>
      ))}
    </View>
  );
}
