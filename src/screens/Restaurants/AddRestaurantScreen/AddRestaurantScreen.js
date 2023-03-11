import React from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { styles } from "./AddRestaurantScreen.styles";
import {
  InfoForm,
  UploadImageForm,
} from "../../../components/Restaurants/AddRestaurant";
import { ImageRestaurant } from "../../../components/Restaurants/AddRestaurant/ImageRestaurant/ImageRestaurant";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddRestaurantScreen.data";
import Toast from "react-native-toast-message";
import { v4 as uuid } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../utils";
import { useNavigation } from "@react-navigation/native";

export function AddRestaurantScreen() {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.id = uuid();
        newData.createdAt = new Date();
        // const database = doc(db, "restaurants", newData.id);
        // await setDoc(database, newData );

        await setDoc(doc(db, "restaurants", newData.id), newData);

        navigation.goBack();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Ocurrio un error, Intentelo mas tarde",
        });
      }
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageRestaurant formik={formik} />
      <InfoForm formik={formik} />
      <UploadImageForm formik={formik} />
      <Button
        title="Crear restaurante"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
}
