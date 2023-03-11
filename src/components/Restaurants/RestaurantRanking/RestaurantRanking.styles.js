import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    marginVertical: 10,
    marginHorizontal: 15,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 150,
  },
  infoContent: {
    paddingHorizontal: 15,
    paddingTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  medal: {
    marginRight: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#828282",
    fontSize: 15,
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 5,
  },
});
