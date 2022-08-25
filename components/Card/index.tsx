import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Movie } from "../../interfaces";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

interface CardItemProps {
  movie: Movie;
}

const styles = StyleSheet.create({
  img: {
    width: "300px",
    height: "429px",
  },
  center: {
    display: "flex",
    alignItems: "center",
  },
  margin: {
    marginTop: "10px",
    marginBottom: "10px",
  },
});

const CardItem: React.FC<CardItemProps> = ({ movie }) => (
  <Card style={styles.margin}>
    <Card.Title title={movie.Title} subtitle={movie.Year} left={LeftContent} />
    <Card.Content>
      <Title>{movie.Title}</Title>
      <Paragraph>{movie.Type.toUpperCase()}</Paragraph>
    </Card.Content>
    <View style={styles.center}>
      <Card.Cover style={styles.img} source={{ uri: movie.Poster }} />
    </View>
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
);

export default CardItem;
