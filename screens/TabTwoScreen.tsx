import { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { deleteMovie, getMovies } from "../assets/utils/localStorage";
import CardItem from "../components/Card";
import { Movie } from "../interfaces";
import ActionButton from "../components/ActionButton/ActionButton";

export default function TabTwoScreen() {
  // let movies: Movie[] = [];
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    console.log("useEffect");
    setMovies(getMovies);
    console.log(movies);
  }, [getMovies, setMovies]);

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
                    movieFunction={deleteMovie}
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
