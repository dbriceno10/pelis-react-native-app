import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, TextInput } from "react-native";
import { Button, Card, Avatar } from "react-native-paper";
import axios, { AxiosResponse } from "axios";
import { useIsFocused } from "@react-navigation/native";

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
  const isFocused = useIsFocused();
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
      if (newMovies.data.Search) {
        setMovies(newMovies.data.Search);
      } else {
        throw new Error("No se encontraron resultados");
      }
      return newMovies;
    } catch (error) {
      alert(error);
      // console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, [isFocused]);

  const handleSearch = (e: string) => {
    clearTimeout(timeId);
    setSearch(e);
    timeId = setTimeout(async () => {
      try {
        const newMovies = await getData(e);
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
      // console.error(error);
      alert(error);
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
      // console.error(error);
      alert(error);
      setPage(1);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={handleSearch}
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
        <Button
          buttonColor="#6750a4"
          textColor="#fff"
          onPress={prevPage}
          style={styles.buttom}
        >
          Anterior
        </Button>
        <Button
          buttonColor="#6750a4"
          textColor="#fff"
          onPress={nextPage}
          style={styles.buttom}
        >
          Siguiente
        </Button>
      </View>
      <View style={styles.buttomResetContainer}>
        <Button
          buttonColor="#6750a4"
          textColor="#fff"
          icon="reload"
          onPress={() => {
            getData();
            setSearch("");
            setPage(1);
          }}
          style={styles.resetButtom}
        >
          Resetear
        </Button>
      </View>
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
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  textInput: {
    backgroundColor: "#fff",
    marginTop: 10,
    width: "75%",
    borderRadius: 4,
    padding: 5,
  },
  buttomContainer: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  buttomResetContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttom: {
    margin: 5,
  },
  resetButtom: {
    marginBottom: 10,
  },
});
