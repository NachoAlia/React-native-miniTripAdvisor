import React from 'react';
import { View } from 'react-native';
import { styles } from './ChangeDisplayNameForm.styles';
import { Input, Button, Text} from 'react-native-elements'
import { useFormik } from "formik";
import { initialValues, validationSchema } from './ChangeDisplayNameForm.data';
import { getAuth, updateProfile } from 'firebase/auth';
import Toast from 'react-native-toast-message';

export function ChangeDisplayNameForm(props) {
    const {onClose, onReload} = props;
    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema:validationSchema(),
        validateOnChange:false,
        onSubmit: async (formValue) =>{
            try {
                const {displayName} = formValue 
                const auth = getAuth();
                await updateProfile(auth.currentUser, {displayName})
                onReload();//vuelve a renderizar el componente padre al cambiar el estado
                onClose();

            } catch (error) {
                Toast.show({
                    type:"error",
                    position:"bottom",
                    text1:"Ocurrio un error, Intentelo mas tarde"
                  });    
            }
        }

    });


    return (
        <View style={styles.content}>
            <Input 
                placeholder="Nombre y apellidos"
                rightIcon={{
                    type:"material-community",
                    name:"account-circle-outline",
                    color:"#c2c2c2"
                }}
                onChangeText={text => {formik.setFieldValue("displayName",text)}}
                errorMessage={formik.errors.displayName}

            />
            <Button 
                title="Aceptar"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            />
        </View>
  )
}