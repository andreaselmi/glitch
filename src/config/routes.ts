import { Route } from "../types/interfaces";
import AccountPage from "../views/AccountPage";
import ExplorePage from "../views/ExplorePage";
import HomePage from "../views/HomePage";
import { NavLinksProps } from "../types/interfaces";
import SearchPage from "../views/SearchPage";

export const navLinks: NavLinksProps[] = [
  { name: "EXPLORE", path: "/explore", private: true },
  { name: "ACCOUNT", path: "/account", private: true },
];

const routes: Route[] = [
  {
    name: "Home",
    path: "/",
    private: false,
    component: HomePage,
  },
  {
    name: "Account",
    path: "/account",
    private: true,
    component: AccountPage,
  },
  {
    name: "Explore",
    path: "/explore",
    private: true,
    component: ExplorePage,
  },
  {
    name: "Search",
    path: "/search",
    private: true,
    component: SearchPage,
  },
];

export default routes;
