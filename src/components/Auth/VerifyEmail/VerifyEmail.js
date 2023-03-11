import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { Button, Text} from 'react-native-elements';
import {getAuth, sendEmailVerification, onIdTokenChanged} from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { db } from '../../../utils/firebase';
import { ref } from 'firebase/database';

export function VerifyEmail(props) {

  const {setCheck} = props;

  const [isVerified, setIsVerified] = useState(false);
  

  const sendVerificationEmail = async() => {
    const user = getAuth().currentUser;
    await sendEmailVerification(user)
      .then(() => {
        Toast.show({
          type:"info",
          position:"bottom",
          text1:"Email de verificación enviado"
        })
      })
      .catch(error => {
        Toast.show({
          type:"info",
          position:"bottom",
          text1:"Error al enviar email de verificacion. Intentelo mas tarde"
        })
      });
  };
  const handleVerifyEmail = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    user.reload()
      .then(() => {
        setIsVerified(user.emailVerified);
        //setCheck(false);
      })
      .catch(error => {
        console.log('Error al verificar correo electrónico:', error);
      });
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onIdTokenChanged(auth, async user => {
      if (user) {
        await user.reload(); // Esperar a que se actualice el estado del correo electrónico
        setIsVerified(user.emailVerified);
        setCheck(user.emailVerified);
      } else {
        setIsVerified(false);
      }
    });

    handleVerifyEmail(); // Verificar automáticamente el correo electrónico al montar el componente

    return () => unsubscribe();
  }, []);


  return (
    <View>
      {!isVerified && 
        (
          <Button title="Enviar correo de verificacion" onPress={sendVerificationEmail}/>
        )
      }
    </View>
  );
}