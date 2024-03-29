import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Movie } from "../../interfaces";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

interface CardItemProps {
  movie: Movie;
  actionButton: JSX.Element;
}

const CardItem: React.FC<CardItemProps> = ({ movie, actionButton }) => (
  <Card style={styles.margin}>
    <Card.Title title={movie.Title} subtitle={movie.Year} left={LeftContent} />
    <Card.Content>
      <Title>{movie.Title}</Title>
      <Paragraph>{movie.Type.toUpperCase()}</Paragraph>
    </Card.Content>
    <View style={styles.center}>
      <Card.Cover style={styles.img} source={{ uri: movie.Poster }} />
    </View>
    <View style={styles.buttom}>{actionButton}</View>
  </Card>
);

const styles = StyleSheet.create({
  img: {
    minWidth: 150,
    // minHeight: 150,
  },
  center: {
    alignItems: "center",
  },
  margin: {
    marginTop: 10,
    marginBottom: 10,
    maxWidth: 350,
    width: '100%'
  },
  buttom: {
    marginTop: 10,
  },
});

export default CardItem;
