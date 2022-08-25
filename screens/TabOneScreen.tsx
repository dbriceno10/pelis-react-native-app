import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import axios, { AxiosResponse } from "axios";

import EditScreenInfo from "../components/EditScreenInfo";
// import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Movie, ResponseMovies } from "../interfaces";
import Card from "../components/Card";

const URL_BASE = "http://www.omdbapi.com/?i=tt3896198&apikey=1bc6c554";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [data, setData] = useState<Movie[]>([]);
  const getData = async () => {
    const pelis: AxiosResponse<ResponseMovies> = await axios.get(
      `${URL_BASE}&s=avengers`
    );
    setData(pelis.data.Search);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  console.log(JSON.stringify(data));
  return (
    <View style={styles.container}>
      <ScrollView>
        {data?.map((movie) => (
          <View key={movie.imdbID}>
            <Card movie={movie} />
          </View>
        ))}
      </ScrollView>
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
