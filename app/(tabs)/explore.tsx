import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function TabTwoScreen() {
  const [themes, setThemes] = useState([
    {
      id: 1,
      name: "Podcast No.01 - Retorno al puente",
      description:
        "RETORNO AL PUENTE, es una novela ambientada en el universo de Star Trek. Un improvisado podcast para hablar sobre el nuevo proyecto para el Blog de Star Trek Colombia.",
      image: require("@/assets/images/season1epi1.jpg"),
    },
    {
      id: 2,
      name: "Star trek colombia 2",
      image: require("@/assets/images/startrekcolombia.jpg"),
    },
    {
      id: 3,
      name: "Star trek colombia 3",
      image: require("@/assets/images/startrekcolombia.jpg"),
    },
    {
      id: 4,
      name: "Star trek colombia 4",
      image: require("@/assets/images/startrekcolombia.jpg"),
    },
    {
      id: 5,
      name: "Star trek colombia 4",
      image: require("@/assets/images/startrekcolombia.jpg"),
    },
    {
      id: 6,
      name: "Star trek colombia 4",
      image: require("@/assets/images/startrekcolombia.jpg"),
    },
    {
      id: 7,
      name: "Star trek colombia 4",
      image: require("@/assets/images/startrekcolombia.jpg"),
    },
  ]);
  return (
    <SafeAreaView
      style={{
        ...styles.container,
        marginBottom: 62,
        marginLeft: 16,
        marginRight: 16,
      }}
    >
      <ThemedText type="title">Todos los episodios</ThemedText>
      <FlatList
        data={themes}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(pokemon) => String(pokemon.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={{ flexDirection: "column", gap: 8 }}>
              <Text style={styles.title}>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.flatListContentContainer}
        // onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        // ListFooterComponent={
        //   isNext && (
        //     <ActivityIndicator size="large" style={styles.spinner} color="#aeaeae" />
        //   )
        // }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
  },
  flatListContentContainer: {
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 90 : 60,
  },
  card: {
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
    padding: 10,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 150,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
});
