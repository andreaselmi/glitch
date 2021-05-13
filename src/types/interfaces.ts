export interface Route {
  name: string;
  path: string;
  private: boolean;
}
export interface NavbarProps {
  links: Route[];
}

export interface UserFormValues {
  email: string;
  password: string;
}
