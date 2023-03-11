import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserGuestScreen } from "./UserGuestScreen/UserGuestScreen";
import { UserLoggedScreen } from "./UserLoggedScreen";
import { LoadingModal } from "../../components";

export function AccountScreen(){
    const [hasLogged, setHasLogged] = useState(null);

    useEffect(()=>{
        const init = setTimeout(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            setHasLogged(user ? true : false);
            
        });
    }, 1000);
    }, []);

    if (hasLogged === null){
        return <LoadingModal show={true} text="Cargando"/>
    }

    return hasLogged ? <UserLoggedScreen/> : <UserGuestScreen/>;
}