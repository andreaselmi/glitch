//types for data of games retrieving from API
export interface Games {
  name: string;
  box_art_url: string;
  id: number | string;
}
//types for data of streams retrieving from API
export interface Streams {
  id: string;
  user_name: string;
  game_id: string;
  game_name: string;
  title: string;
  thumbnail_url: string;
  viewer_count: number;
  type: "live" | "";
}
export interface StreamsWithPagination {
  streams: Streams[];
  pagination: {
    cursor: string;
  };
}
//types route react-router-dom
export interface Route {
  name: string;
  path: string;
  private: boolean;
  component: any;
}

export interface NavbarProps {
  links: NavLinksProps[];
}

//types for login/registration forms
export interface UserFormValues {
  fullName?: string;
  email: string;
  password: string;
}

//types for list items horizontal/grid
export interface ListProps {
  items: Games[] | Streams[];
}

//interfaces for card container and card
export interface GameCardProps {
  buttonTitle: string;
  likeButton: boolean;
  buttonPath: string;
  redirectTo: "internal" | "external";
  title: string;
  urlImg: string;
  savedItemsList?: Games[];
  savedItem?: Games;
}

export interface StreamCardProps {
  buttonTitle: string;
  buttonPath: string;
  urlImg: string;
  title: string;
  redirectTo: "internal" | "external";
  viewerCount: number;
  isLive: boolean;
  userName: string;
}

export interface MyCardProps {
  buttonTitle: string;
  likeButton: boolean;
  buttonPath: string;
  redirectTo: "internal" | "external";
  title: string;
  urlImg: string;
  isSaved?: boolean;
  toggleLike?: () => void;
}

//types for links in navbar
export type NavLinksProps = Omit<Route, "component">;
