import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, TextInput, Button } from "react-native";
import axios, { AxiosResponse } from "axios";
import EditScreenInfo from "../components/EditScreenInfo";
// import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Movie, ResponseMovies } from "../interfaces";
import Card from "../components/Card";

const URL_BASE = "http://www.omdbapi.com/?i=tt3896198&apikey=1bc6c554";

let timeId: any = null;

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
    timeId = setTimeout(async() => {
      try {
        const newMovies = await getData(e.target.value);
        if(!newMovies?.data.Search || newMovies === undefined) throw new Error()
        setPage(1)
      } catch (error) {
        
      }
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
      alert(error);
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
        style={{ backgroundColor: "#fff", marginTop: "10px", width: '60%',borderRadius: 4 }}
      />

      <ScrollView>
        {movies?.map((movie) => (
          <View key={movie.imdbID}>
            <Card movie={movie}/>
          </View>
        ))}
      </ScrollView>
      <View style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
        <Button title="Anterior" onPress={prevPage} />
        <Button title="Siguiente" onPress={nextPage} />
      </View>
      <Button
        title="Resetear"
        onPress={() => {
          getData();
          setSearch("");
          setPage(1);
        }}
      />
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
