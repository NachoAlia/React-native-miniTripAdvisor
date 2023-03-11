import React,{ useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { styles } from './MapForm.styles';
import { Modal } from '../../../../components/Shared';
import * as Location from "expo-location"; 
import MapView, {Marker} from 'react-native-maps'; //mostrar mapa
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';

export function MapForm(props) {
    const {show, close, formik} = props;
    const [location, setLocation] = useState({
        latitude:0.001, 
        longitude:0.001,
        latitudeDelta:0.001,
        longitudeDelta:0.001
    });
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted"){
                Toast.show({
                    type:"info",
                    position:"bottom",
                    text1:"Tienes que habilitar los permisos para la localizacion en ajustes"
                });
                return
            }
            const locationTemp = await Location.getCurrentPositionAsync({});
            setLocation({ 
                latitude:locationTemp.coords.latitude, 
                longitude:locationTemp.coords.longitude,
                latitudeDelta:0.001,
                longitudeDelta:0.001
            });

        })()
    }, [])
    
    const saveLocation = () => {
        formik.setFieldValue("location", location)
        close();
    }
    return (
        <Modal show={show} close={close}>
                <MapView 
                    initialRegion={location} 
                    showsUserLocation={true} 
                    style={styles.mapStyle}
                    onRegionChange={(locationTemp) => {setLocation(locationTemp)}}
                >
                    <Marker 
                        draggable 
                        coordinate={location} 
                        pinColor={"purple"}
                    />
                </MapView>
                <View style={styles.mapActions}>
                    <Button 
                        title="Guardar" 
                        containerStyle={styles.btnContainerSave}
                        buttonStyle={styles.btnSave}
                        onPress={saveLocation}
                    />
                    <Button 
                        title="Cerrar" 
                        containerStyle={styles.btnContainerClose} 
                        buttonStyle={styles.btnClose}
                        onPress={close}/>
                </View>
        </Modal>    
    
    )
}