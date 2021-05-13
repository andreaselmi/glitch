import { Route } from "../types/interfaces";

const links: Route[] = [
  { name: "HOME", path: "/", private: false },
  { name: "SEARCH", path: "/search", private: true },
];

export default links;
