export interface Games {
  name: string;
  box_art_url: string;
  id: number | string;
}
export interface Streams {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_coun: number;
  started_a: string;
  languag: string;
  thumbnail_url: string;
  tag_ids: string[];
  is_mature: boolean;
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
