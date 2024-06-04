import { getList } from "@/api/podcast";
import { ThemedText } from "@/components/ThemedText";
import { IResponse } from "@/models/response.interface";
import { useEffect, useState } from "react";
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
  const [themes, setThemes] = useState<IResponse | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const response = await getList();
      setThemes(response);
    })();
  }, []);

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
        data={themes?.episodes}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(pokemon, index) => String(index)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={{ flexDirection: "column", gap: 8 }}>
              <Text style={styles.title}>{item.title}</Text>
              {/* <Text>{item.title}</Text> */}
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
