import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, TextInput } from "react-native";
import { Button, Card, Avatar } from "react-native-paper";
import axios, { AxiosResponse } from "axios";
import EditScreenInfo from "../components/EditScreenInfo";
import { RootTabScreenProps } from "../types";
import { Movie, ResponseMovies } from "../interfaces";
import CardItem from "../components/Card";
import { saveMovie } from "../assets/utils/localStorage";
import ActionButton from "../components/ActionButton/ActionButton";

const URL_BASE = "http://www.omdbapi.com/?i=tt3896198&apikey=1bc6c554";

let timeId: any = null;

const LeftContent = (props: any) => (
  <Avatar.Icon {...props} icon="arrow-right" />
);

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const getData = async (search?: string, page?: number) => {
    try {
      let searchText = search;
      if (!searchText) searchText = "avengers";
      let query = `&s=${searchText}`;
      if (page) query = `${query}&page=${page}`;
      const newMovies: AxiosResponse<ResponseMovies> = await axios.get(
        `${URL_BASE}${query}`
      );
      console.log(newMovies);
      if (newMovies.data.Search) {
        setMovies(newMovies.data.Search);
      } else {
        throw new Error("No se encontraron resultados");
      }
      return newMovies;
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e: any) => {
    clearTimeout(timeId);
    setSearch(e.target.value);
    timeId = setTimeout(async () => {
      try {
        const newMovies = await getData(e.target.value);
        if (!newMovies?.data.Search || newMovies === undefined)
          throw new Error();
        setPage(1);
      } catch (error) {}
    }, 3000);
  };

  const nextPage = async () => {
    try {
      const newPage = page + 1;
      const newMovies = await getData(search, newPage);
      if (!newMovies?.data.Search || newMovies === undefined)
        throw new Error("No hay más peliculas");
      setPage(newPage);
    } catch (error) {
      console.error(error);
      setPage(page - 1);
    }
  };

  const prevPage = async () => {
    try {
      const newPage = page - 1;
      if (newPage < 1) throw new Error("Está en la primera página");
      await getData(search, newPage);
      setPage(newPage);
    } catch (error) {
      alert(error);
      console.error(error);
      setPage(1);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChange={handleSearch}
        style={styles.textInput}
      />

      <ScrollView>
        {movies?.map((movie) => (
          <View key={movie.imdbID}>
            <CardItem
              movie={movie}
              actionButton={
                <ActionButton
                  icon={"cards-heart"}
                  movie={movie}
                  movieFunction={saveMovie}
                  title="Guardar"
                />
              }
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttomContainer}>
        <Button buttonColor="#6750a4" textColor="#fff" onPress={prevPage}>
          Anterior
        </Button>
        <Button buttonColor="#6750a4" textColor="#fff" onPress={nextPage}>
          Siguiente
        </Button>
      </View>
      <Button
        buttonColor="#6750a4"
        textColor="#fff"
        icon="reload"
        onPress={() => {
          getData();
          setSearch("");
          setPage(1);
        }}
      >
        Resetear
      </Button>
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
  textInput: {
    backgroundColor: "#fff",
    marginTop: 10,
    width: "60%",
    borderRadius: 4,
  },
  buttomContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
