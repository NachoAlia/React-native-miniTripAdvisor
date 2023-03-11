import React,{useState} from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Text, Icon, Avatar } from 'react-native-elements';
import { styles } from './UploadImageForm.styles';
import * as ImagePicker from "expo-image-picker";
import { v4 as uuid} from "uuid";
import {map, filter} from "lodash";
import { 
  getStorage,
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import Toast from 'react-native-toast-message';

import {LoadingModal} from "../../../Shared"

export function UploadImageForm(props) {
  const {formik} = props;
  const [isLoading, setIsLoading] = useState(false);
  
  const openGallery = async () => {
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[ 4,3 ],
      quality:1, 
    });
    
    if (!result.canceled){
      setIsLoading(true);  
      uploadImage(result.assets[0].uri);
      setTimeout(() => {
        setIsLoading(false);
    }, 1000);
    }
    
    
  };

  const uploadImage = async (uri) => {
        
    const response = await fetch(uri); //identificador uniforme de recurso.
    const blob = await response.blob(); //Objeto binario grande.
    
    const storage = getStorage();
    const storageRef = ref(storage, `restaurants/${uuid()}`);
    
    uploadBytes(storageRef, blob).then((snapshot)=>{
      updatePhotosRestaurant(snapshot.metadata.fullPath);
    }).catch((error)=>{
      Toast.show({
        type:"error",
        position:"bottom",
        text1:"error"
      });
    });

  }

  //Obtiene url desde firebase y la guarda en el formulario
  const updatePhotosRestaurant = async (imagePath) => {
    const storage = getStorage();
    const storageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(storageRef);
    /*Utilizo spread operator para convertir el array a elementos
    individuales y asignarle uno nuevo */
    formik.setFieldValue("images", [...formik.values.images, imageUrl]);
  }

  const removeImage = (imagePath) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estas seguro de que deseas eliminar esta imagen?",
      [
        {
          text:"Eliminar",
          onPress: ()=>{
            const result = filter(formik.values.images, (image)=> image !== imagePath)
            formik.setFieldValue("images", result);
          }
          
        },
        {
          text:"Cancelar",
          style:"cancel"
        }
      ],
      {cancelable:false}
    );
  }

  return (
    <>
      <View style={styles.viewImage}>
        <Icon 
          type="material-community" 
          name="camera" 
          color="#a7a7a7" 
          containerStyle={styles.containerIcon}
          onPress={openGallery}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {map(formik.values.images, (element)=>(
            <Avatar 
              key={element} 
              source={{uri:element}} 
              size="large" 
              containerStyle={styles.image}
              onPress={()=>{removeImage(element)}}
            />
          
          ))}
        </ScrollView>
        
      </View>
        <Text style={styles.fieldImageError}>{formik.errors.images}</Text>
        <LoadingModal show={isLoading} text="Subiendo imagen"/>
    </>
    
  );
}