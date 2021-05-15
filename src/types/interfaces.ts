export interface Games {
  name: string;
  box_art_url: string;
  id: number | string;
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
