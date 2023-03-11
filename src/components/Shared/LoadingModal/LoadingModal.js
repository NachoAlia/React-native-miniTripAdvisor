import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styles } from './LoadingModal.styles';
import { Overlay, Text} from "react-native-elements";

export function LoadingModal(props) {

    const { show, text } = props; 

    return (
        <View>
            <Overlay 
                isVisible={show}
                overlayStyle={styles.overlay}         
            >
                <View style={styles.aIndicator}>
                    <ActivityIndicator 
                        size="large" 
                        color="#00a680"
                    /> 
                {text && <Text style={styles.text}>{text}</Text> }
                </View>
            </Overlay>
        </View>
    )
    
}

LoadingModal.defaultProps = {
    show: false,

};
