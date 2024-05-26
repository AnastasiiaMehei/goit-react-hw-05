import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
const getLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
export default function Navigation() {
  const location = useLocation();
  const backLinkHref = location.state ?? "/";
  return (
    <nav>
      <ul className={css.container}>
        <li>
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" state={backLinkHref} className={getLinkClass}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
