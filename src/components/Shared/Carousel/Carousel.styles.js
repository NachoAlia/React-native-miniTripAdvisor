import { height, width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content:{
        position:"relative",
        
    },
    dotsContainer:{
        position:"absolute",
        bottom:0,
        left:0,
        width:"100%",
        height:70,
        paddingBottom:0,
    },
    dot:{
        backgroundColor:"#00a680",
        width:15,
        height:15,
        borderRadius:15
    }
});