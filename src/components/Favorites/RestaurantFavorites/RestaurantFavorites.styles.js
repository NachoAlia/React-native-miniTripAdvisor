import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 150,
  },
  infoContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  heartContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    top: -30,
    right: 10,
    borderRadius: 50,
    padding: 15,
  },
  loadingHeart: {
    position: "absolute",
    top: -15,
    right: 25,
  },
});
