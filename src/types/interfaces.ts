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
