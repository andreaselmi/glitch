export interface NavbarProps {
  links: { name: string; path: string }[];
}

export interface UserFormValues {
  email: string;
  password: string;
}

export interface Route {
  name: string;
  path: string;
}
