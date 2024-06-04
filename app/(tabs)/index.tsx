import { getList } from "@/api/podcast";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Episode, IResponse } from "@/models/response.interface";
import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { SetStateAction, useEffect, useRef, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [playAndPauseIcon, setPlayAndPauseIcon] = useState("pause-circle");
  const [actualSong, setActualSong] = useState<Episode | undefined>(undefined);
  const [themes, setThemes] = useState<IResponse | undefined>(undefined);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getList();
      setThemes(response);
    })();
  }, []);

  async function playSound(song: Episode) {
    try {
      setActualSong(song);
      console.log(`http://192.168.10.41:3000/audio/${song.name}.mp3`);

      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync(
        { uri: `http://192.168.10.41:3000/audio/${song.name}.mp3` }, // Reemplaza con tu IP local
        {
          shouldPlay: true,
          isLooping: false,
        },
        onPlaybackStatusUpdate
      );
      setSound(sound);
      soundRef.current = sound;
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
      });
      await sound.playAsync();
    } catch (error) {
      console.log("Error playing sound", error);
    }
  }

  const handleSliderValueChange = (value: number) => {
    const seekPosition = value * duration;
    if (soundRef.current) {
      soundRef.current.setPositionAsync(seekPosition);
    }
  };

  const onPlaybackStatusUpdate = (status: {
    isLoaded: any;
    durationMillis: SetStateAction<number>;
    positionMillis: SetStateAction<number>;
    isPlaying: boolean | ((prevState: boolean) => boolean);
    error: any;
  }) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis);
      setPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);
    } else {
      if (status.error) {
        console.log(`Error: ${status.error}`);
      }
    }
  };

  const playAndPauseSound = () => {
    if (sound) {
      sound.getStatusAsync().then((status) => {
        if (status.isLoaded && status.isPlaying) {
          setPlayAndPauseIcon("play-circle");
          sound.pauseAsync();
        } else {
          setPlayAndPauseIcon("pause-circle");
          sound.playAsync();
        }
      });
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.titleContainer}>
          <View
            style={{
              backgroundColor: "#000",
              width: 180,
              height: 32,
              paddingLeft: 16,
              paddingTop: 6,
              paddingRight: 16,
              paddingBottom: 6,
              borderRadius: 20,
              gap: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: 19,
              }}
            >
              Good morning Trekkie
            </Text>
          </View>
          <Link href={"/explorer"}>
            <Pressable>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </Pressable>
          </Link>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 132,
            borderRadius: 24,
          }}
        >
          <LinearGradient
            style={{ ...styles.fancyCard, ...styles.fancyCardLarge }}
            colors={["#f8e71c", "#7ed321", "#4a90e2"]} // Gradiente de rojo oscuro a rojo brillante
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          ></LinearGradient>
        </View>
        {/* <ThemedView style={{ ...styles.stepContainer, ...styles.stepContainerCenter }}>
        <LinearGradient
          style={{ ...styles.fancyCard, ...styles.fancyCardLarge }}
          colors={["#f8e71c", "#7ed321", "#4a90e2"]} // Gradiente de rojo oscuro a rojo brillante
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.containerText}>
            <ThemedText type="title" style={{ color: "#000" }}>
              Los mejores capitulos de lavadero sonico
            </ThemedText>
            <ThemedText style={{ color: "#000" }}>
              Inicia sesión y guarda los capitulos
            </ThemedText>
          </View>
        </LinearGradient>
      </ThemedView> */}
        <ThemedView style={{ ...styles.stepContainer, marginRight: 16 }}>
          <ThemedText type="subtitle">Nuevos episodios</ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row",
              gap: 16,
              marginRight: 16,
            }}
          >
            {themes?.episodes?.slice(0, 5).map((theme, index) => (
              <TouchableOpacity key={index} onPress={() => playSound(theme)}>
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
                      source={{ uri: theme.thumbnail }}
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
                        {theme.title}
                      </ThemedText>
                      {/* <Text
                      numberOfLines={3}
                      ellipsizeMode="tail"
                      style={{ maxWidth: 150, color: "#ffffff" }}
                    >
                      {theme.title}
                    </Text> */}
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ThemedView>
        <ThemedView style={{ ...styles.stepContainer, marginRight: 16 }}>
          <ThemedText type="subtitle">Recomendados</ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row",
              gap: 16,
              marginRight: 16,
            }}
          >
            <LinearGradient
              style={{ ...styles.fancyCard, ...styles.anotherCard, marginTop: 16 }}
              colors={["#990000", "#ff0000"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.overlayLight} />
              <ThemedText type="title" style={{ color: "#000" }}>
                Live Long and Prospery
              </ThemedText>
            </LinearGradient>
            <LinearGradient
              style={{ ...styles.fancyCard, ...styles.anotherCard, marginTop: 16 }}
              colors={["#f6d365", "#fda085", "#fbc687"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.overlayLight} />
              <ThemedText type="title" style={{ color: "#000" }}>
                Live Long and Prospery
              </ThemedText>
            </LinearGradient>
          </ScrollView>
        </ThemedView>
        {actualSong && (
          <View
            style={{
              zIndex: 1,
              position: "absolute",
              bottom: 60,
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              backgroundColor: "#0f0f0f",
              opacity: 0.9,
              padding: 16,
              width: "100%",
              marginHorizontal: 16,
              borderRadius: 16,
            }}
          >
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={position / duration}
              onValueChange={handleSliderValueChange}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#FFFFFF"
              thumbTintColor="#FFFFFF"
            />

            <Image
              style={{
                width: 40,
                height: 40,
                bottom: 0,
                left: 0,
              }}
              source={{ uri: actualSong.thumbnail }}
            />
            <View>
              <Text style={{ color: "#fff" }}>{actualSong.title}</Text>
            </View>
            <View>
              <Pressable onPress={playAndPauseSound}>
                <Ionicons name={playAndPauseIcon} size={44} color="white" />
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 16,
    marginRight: 16,
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
  slider: {
    width: "110%",
    height: 40,
    position: "absolute",
    bottom: "-24%",
  },
  reactLogo: {
    height: 250,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
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
    borderRadius: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Ocupa todo el espacio de la tarjeta
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Color de superposición con opacidad
    borderRadius: 8, // Opcional: agrega bordes redondeados a la superposición
  },
  overlayLight: {
    ...StyleSheet.absoluteFillObject,
    margin: 3,
    backgroundColor: "rgba(256, 256, 256, 1)", // Color de superposición con opacidad
    borderRadius: 6, // Opcional: agrega bordes redondeados a la superposición
  },
  anotherCard: {
    height: 280,
    width: 260,
  },
  fancyCardSmall: {
    width: 300,
    height: 150,
    borderRadius: 10,
    padding: 10,
    color: "#fff",
  },
});
