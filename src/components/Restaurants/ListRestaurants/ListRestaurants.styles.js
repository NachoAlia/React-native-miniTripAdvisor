import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    
    restaurantContent:{
        flexDirection:"row",
        padding:10,
        borderBottomWidth:0.2,
        borderBottomColor:"#828282"
    },
    
    image:{
        width:80,
        height:80,
        marginRight:15
    },
    restaurantName:{
        fontWeight:"bold",
    },
    restaurantInfo:{
        color:"#828282",
        paddingRight:100,
        marginTop:3,
    }
});