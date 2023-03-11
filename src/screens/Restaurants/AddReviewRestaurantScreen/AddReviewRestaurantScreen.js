import React from "react";
import { View } from "react-native";
import { Text, AirbnbRating, Input, Button } from "react-native-elements";
import { styles } from "./AddReviewRestaurantScreen.styles";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddReviewRestaurantScreen.data";

import Toast from "react-native-toast-message";
import {v4 as uuid} from "uuid";
import { map, mean } from "lodash";
import { getAuth } from "firebase/auth";
import { db } from "../../../utils";
import { 
  query, 
  doc, 
  setDoc, 
  collection, 
  where, 
  onSnapshot, 
  updateDoc 
} from "firebase/firestore";

import { useNavigation } from "@react-navigation/native";

export function AddReviewRestaurantScreen(props) {
  const {route} = props
  const navigation = useNavigation();


  const formik = useFormik({
    initialValues:initialValues(),
    validationSchema:validationSchema(),
    validateOnChange:false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const idDoc = uuid();
        const newData = formValue;
        newData.id = idDoc;
        newData.idRestaurant=route.params.idRestaurant;
        newData.idUser = auth.currentUser.uid;
        newData.avatar = auth.currentUser.photoURL;
        newData.createdAt = new Date();
        
        await setDoc(doc(db, "reviews", idDoc), newData);
        await updateRestaurant();
      } catch (error) {
        Toast.show({
          type:"error",
          position:"bottom",
          text1:String(error)
        });
      }
     
    },

  });

  const updateRestaurant = async() =>{
    const q = query(
      collection(db, "reviews"), 
      where("idRestaurant", "==", route.params.idRestaurant)
    );
    onSnapshot(q, async(snapshot)=>{
      const reviews = snapshot.docs;
      const arrayStars = map(reviews, (review)=>review.data().rating);
      const media = mean(arrayStars);
      const restaurantRef = doc(db, "restaurants", route.params.idRestaurant);
      await updateDoc(restaurantRef, {
        ratingMedia: media
      });
      
      navigation.goBack();
    });

  }
  return (
    <View style={styles.content}>
      <View>
        <View style={styles.ratingContent}>
          <AirbnbRating 
            count={5} 
            reviews={["Pesimo", "Deficiente", "Normal", "Muy bueno", "Excelente"]}
            defaultRating={formik.values.rating}
            size={35}
            onFinishRating={(rating)=>{
              formik.setFieldValue("rating", rating); 
              formik.errorMessage
            }}
            errorMessage={formik.errors.rating}
          />
        </View>
      </View>
      <View style={styles.inputContent}>
        <Input 
          placeholder="Titulo" 
          onChangeText={(text)=>formik.setFieldValue("title",text)}
          errorMessage={formik.errors.title}
        />
        <Input 
          placeholder="Comentario" 
          multiline 
          inputContainerStyle={styles.comment}
          onChangeText={(text)=>formik.setFieldValue("comment",text)}
          errorMessage={formik.errors.comment}
        />
      </View>
      <Button 
        title="Aceptar" 
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}  
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}