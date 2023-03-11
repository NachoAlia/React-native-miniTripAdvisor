import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { SearchBar, ListItem, Avatar, Icon, Text } from "react-native-elements";
import { Loading } from "../components/Shared";
import { map, size } from "lodash";
import {
  query,
  collection,
  startAt,
  endAt,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db, screen } from "../utils";
import { useNavigation } from "@react-navigation/native";

export function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "restaurants"),
        orderBy("name"),
        startAt(searchText), //busca empezando por..
        endAt(`${searchText}\uf8ff`),
        limit(20)
      );
      const result = await getDocs(q);
      setSearchResults(result.docs);
    })();
  }, [searchText]);

  return (
    <>
      <SearchBar
        placeholder="Busca tu restaurante"
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
        }}
        inputContainerStyle={{
          backgroundColor: "white",
          padding: 2,
          width: "100%",
          borderBottomColor: "gray",
          borderBottomWidth: 1,
          borderWidth: 1,
          borderRadius: 50,
        }}
        inputStyle={{
          backgroundColor: "white",
          padding: 0,
        }}
        containerStyle={{
          height: 100,
          backgroundColor: "white",
          width: "100%",
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
        }}
        placeholderTextColor={"#g5g5g5"}
      />
      {!searchResults && <Loading show text="Cargando" />}
      <ScrollView style={{ backgroundColor: "white" }}>
        {size(searchResults) === 0 ? (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text>No se encontraron resultados</Text>
          </View>
        ) : (
          map(searchResults, (item) => {
            const data = item.data();
            return (
              <ListItem
                key={data.id}
                bottomDivider
                onPress={() => {
                  navigation.navigate(screen.restaurant.tab, {
                    screen: screen.restaurant.restaurant,
                    params: {
                      id: data.id,
                      name: data.name,
                    },
                  });
                }}
              >
                <Avatar source={{ uri: data.images[0] }} rounded size={50} />
                <ListItem.Content>
                  <ListItem.Title>{data.name}</ListItem.Title>
                </ListItem.Content>
                <Icon
                  type="material-community"
                  name="chevron-right"
                  color="#828282"
                />
              </ListItem>
            );
          })
        )}
      </ScrollView>
    </>
  );
}
