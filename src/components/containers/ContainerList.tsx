import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { ListProps, Games, Streams } from "../../types/interfaces";
import GridList from "./GridList";
import HorizontalList from "./HorizontalList";

import placeholder from "../../assets/images/placeholder.png";

interface ContainerListProps extends ListProps {
  type: "horizontal" | "grid";
  itemTypeError: string | null;
  title: string;
}

const ContainerList = ({
  items,
  itemTypeError,
  type,
  title,
}: ContainerListProps) => {
  const [data, setData] = useState<Games[] | Streams[]>();
  const { favoriteGames } = useAppSelector((state) => state.games);
  const notAvailable = "Data not available";

  //function that replaces width and height with dimensions
  //Currently the categories endpoint of TWITCH API returns a bug in the image string, instead of passing width and height like the other endpoints it returns 52x72 images
  const replaceImgDimensions = () => {
    if (items && items.length > 0) {
      if ("box_art_url" in items[0]) {
        const text = items[0].box_art_url.indexOf("width");
        let games;
        if (text === -1) {
          games = items.map((game: any) => ({
            ...game,
            box_art_url: game.box_art_url.replace("52x72", "500x500"),
          }));
        } else {
          games = items.map((game: any) => ({
            ...game,
            box_art_url: game.box_art_url.replace(/{width}|{height}/g, "500"),
          }));
        }
        setData(games);
      } else if ("thumbnail_url" in items[0]) {
        const text = items[0].thumbnail_url.indexOf("width");
        let streams;
        if (text === -1) {
          streams = items.map((game: any) => ({
            ...game,
            thumbnail_url: game.thumbnail_url.replace("52x72", "500x500"),
          }));
        } else {
          streams = items.map((game: any) => ({
            ...game,
            thumbnail_url: game.thumbnail_url.replace(
              /{width}|{height}/g,
              "500"
            ),
          }));
        }
        setData(streams);
      }
    }
  };

  useEffect(() => {
    replaceImgDimensions();
  }, [favoriteGames]);

  return (
    <div>
      {type === "horizontal" && data && (
        <HorizontalList
          title={title}
          itemTypeError={itemTypeError}
          placeholder={placeholder}
          notAvailable={notAvailable}
          items={data}
        />
      )}
      {type === "grid" && data && (
        <GridList
          title={title}
          placeholder={placeholder}
          notAvailable={notAvailable}
          items={data}
        />
      )}
    </div>
  );
};

export default ContainerList;
