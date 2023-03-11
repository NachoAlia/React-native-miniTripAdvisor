import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, AirbnbRating, ListItem, Avatar } from "react-native-elements";
import { styles } from "./Reviews.styles";
import { map } from "lodash";
import {
    doc,
    onSnapshot,
    collection,
    query,
    where,
    orderBy
} from "firebase/firestore";
import { db } from "../../../utils";
import { Loading } from "../../../components/Shared";
import { DateTime } from "luxon";
import "intl";
import "intl/locale-data/jsonp/es";


export function Reviews(props) {
    const {idRestaurant} = props;
    const [reviews, setReviews] = useState(null);


    useEffect(() => {
        const q = query(
            collection(db, "reviews"), 
            where("idRestaurant", "==", idRestaurant),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot)=>{
            setReviews(snapshot.docs);
        });
        
    }, [idRestaurant])

    
    if (!reviews){
        return <Loading show text="Cargando"/>
    }
    return (    
        <View style={styles.content}>
            {map(reviews, (review)=>{
                const dateReview= new Date(review.data().createdAt.seconds * 1000);
                return(
                    <ListItem 
                        key={review.data().id}
                        bottomDivider
                        containerStyle={styles.review}    
                    >
                    <Avatar 
                        source={{uri:review.data().avatar}}
                        size={50}
                        rounded
                    />
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>
                            {review.data().title}
                        </ListItem.Title>
                        <View style={styles.subtitle}>
                            <Text style={styles.comment}>{review.data().comment}</Text>
                            <View style={styles.contentRatingDate}>
                                <AirbnbRating 
                                    defaultRating={review.data().rating}
                                    showRating={false}
                                    size={15}
                                    isDisabled
                                    starContainerStyle={styles.startContainer}
                                />
                                <Text style={styles.date}>
                                    {DateTime.fromISO(dateReview.toISOString())
                                    .toFormat("yyyy/LL/dd - hh:mm")}
                                </Text>
                            </View>
                        </View>
                    </ListItem.Content>
                    </ListItem>
                );
            })}
        
        </View>
    )
}