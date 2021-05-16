export interface Games {
  name: string;
  box_art_url: string;
  id: number | string;
}
export interface Streams {
  id: string;
  user_name: string;
  game_id: string;
  game_name: string;
  title: string;
  thumbnail_url: string;
}
export interface Route {
  name: string;
  path: string;
  private: boolean;
}
export interface NavbarProps {
  links: Route[];
}

export interface UserFormValues {
  fullName?: string;
  email: string;
  password: string;
}
