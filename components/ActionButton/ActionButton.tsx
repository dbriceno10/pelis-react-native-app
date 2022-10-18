import React from "react";
import { Button, Card } from "react-native-paper";
import { Movie } from "../../interfaces";

interface ActionButtonProps {
  icon: string;
  movieFunction: (movie: Movie) => void;
  movie: Movie;
  title: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  movie,
  movieFunction,
  title,
}) => {
  return (
    <Card.Actions>
      <Button icon={icon} onPress={() => movieFunction(movie)}>
        {title}
      </Button>
    </Card.Actions>
  );
};

export default ActionButton;
