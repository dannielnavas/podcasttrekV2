import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

export default function HomeScreen() {
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
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Good morning Trekkie</ThemedText>
        <Link href={"/explorer"} asChild style={styles.button}>
          <Pressable>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </Pressable>
        </Link>
      </View>
      <ThemedView style={(styles.stepContainer, styles.stepContainerCenter)}>
        <LinearGradient
          style={{ ...styles.fancyCard, ...styles.fancyCardLarge }}
          colors={["#990000", "#ff0000"]} // Gradiente de rojo oscuro a rojo brillante
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.containerText}>
            <ThemedText type="title" style={{ color: "#FFF" }}>
              Los mejores capitulos de lavadero sonico
            </ThemedText>
            <ThemedText style={{ color: "#FFF" }}>
              Inicia sesión y guarda los capitulos
            </ThemedText>
          </View>
        </LinearGradient>
      </ThemedView>
      <ThemedView style={{ ...styles.stepContainer, marginRight: 16 }}>
        <ThemedText type="subtitle">Nuevos episodios</ThemedText>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: "row", gap: 16, marginRight: 16 }}
        >
          {themes.map((theme, index) => (
            <TouchableWithoutFeedback key={theme.id} onPress={() => alert("clik")}>
              <LinearGradient
                style={{ ...styles.fancyCard, ...styles.fancyCardSmall }}
                colors={["#1e3c72", "#2a5298"]} // Gradiente de azul claro a azul oscuro
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    gap: 16,
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Image
                    source={theme.image}
                    resizeMode="cover"
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                  />
                  <View style={styles.overlay} />
                  <View style={{ flexDirection: "column", gap: 8 }}>
                    <ThemedText
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{ maxWidth: 150, color: "#ffffff" }}
                      type="subtitle"
                    >
                      {theme.name}
                    </ThemedText>
                    <Text
                      numberOfLines={3}
                      ellipsizeMode="tail"
                      style={{ maxWidth: 150, color: "#ffffff" }}
                    >
                      {theme.description}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    marginLeft: 16,
    marginTop: 16,
    flexDirection: "column",
  },
  stepContainerCenter: {
    alignItems: "center",
  },
  reactLogo: {
    height: 250,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  button: {
    padding: 10,
    borderRadius: 100,
    borderWidth: 1,
  },
  containerText: {
    flexDirection: "column",
    width: 280,
    gap: 8,
  },
  fancyCard: {
    borderRadius: 6,
    padding: 25,
    color: "#fff",
  },
  fancyCardLarge: {
    marginTop: 16,
    width: "90%",
    height: 250,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Ocupa todo el espacio de la tarjeta
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Color de superposición con opacidad
    borderRadius: 8, // Opcional: agrega bordes redondeados a la superposición
  },
  fancyCardSmall: {
    width: 300,
    height: 150,
    borderRadius: 10,
    padding: 10,
    color: "#fff",
  },
});
