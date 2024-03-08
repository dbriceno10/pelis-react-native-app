import { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { deleteMovie, getMovies } from "../assets/utils/localStorage";
import CardItem from "../components/Card";
import { Movie } from "../interfaces";
import ActionButton from "../components/ActionButton/ActionButton";

export default function TabTwoScreen() {
  const start = async () => {
    console.log("useEffect");
    const mv = await getMovies();
    setMovies(mv);
    console.log(movies);
  };
  // let movies: Movie[] = [];
  const isFocused = useIsFocused();
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    start();
  }, [getMovies, setMovies, deleteMovie, isFocused]);

  return (
    <View style={styles.container}>
      {movies.length > 0 ? (
        <ScrollView>
          {movies?.map((movie) => (
            <View key={movie.imdbID}>
              <CardItem
                movie={movie}
                actionButton={
                  <ActionButton
                    icon="delete"
                    movie={movie}
                    movieFunction={() => deleteMovie(movie, setMovies)}
                    title="Borrar"
                  />
                }
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.title}>No se han añadido favoritos aún</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
