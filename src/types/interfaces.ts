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

//types for links in navbar
export type NavLinksProps = Omit<Route, "component">;
