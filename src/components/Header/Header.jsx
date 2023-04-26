import { useState, Fragment } from "react";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import api from "../../main-app/http/api";
import styles from "./Header.module.css";

const topNav = [
  {
    id: 1,
    name: "</> Blog",
    route: "/",
    classes: `${styles.logo} ${styles.item}`,
  },
  {
    id: 2,
    name: "Home",
    route: "/",
    classes: styles.item,
  },
  {
    id: 3,
    name: "New Blog",
    route: "/blog/new",
    classes: styles.item,
    protected: true,
  },
  {
    id: 4,
    name: "My Blogs",
    route: "/blog/user",
    classes: styles.item,
    protected: true,
  },
  {
    id: 5,
    name: "sign in",
    route: "/sign-in",
    classes: `${styles.item} ${styles.right}`,
    public: true,
  },
  {
    id: 6,
    name: "sign up",
    route: "/sign-up",
    classes: `${styles.item}`,
    public: true,
  },
  {
    id: 7,
    name: "logout",
    classes: `${styles.item} ${styles.right}`,
  },
];

const Header = () => {
  const { user, setUser } = useAuth();
  const [redirect, setRediect] = useState(false);
  const handleLogout = async () => {
    const { data } = await api.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(null);
    setRediect(true);
    window.location.reload();
  };
  const location = useLocation();
  return (
    <>
      {redirect && <Navigate to="/" state={{ from: location }} replace />}
      <header className={styles.header}>
        <div className={styles["nav-container"]}>
          <ul className={styles.nav}>
            {topNav.map((item) => {
              if (item.public) {
                return user ? (
                  <Fragment key={item.id} />
                ) : (
                  <li key={item.id} className={item.classes}>
                    <NavLink
                      key={item.id}
                      className={({ isActive }) =>
                        isActive && item.id != 1 ? styles.active : ""
                      }
                      to={item.route}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                );
              } else if (item.protected) {
                return user ? (
                  <li key={item.id} className={item.classes}>
                    <NavLink
                      key={item.id}
                      className={({ isActive }) =>
                        isActive && item.id != 1 ? styles.active : ""
                      }
                      to={item.route}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ) : (
                  <Fragment key={item.id} />
                );
              } else if (item.name === "logout") {
                return user ? (
                  <li
                    key={item.id}
                    style={{ textAlign: "center" }}
                    className={item.classes}
                  >
                    <span className={styles.btn}>
                      {user ? `Hi! ${user.firstName}` : ""}
                    </span>
                    <br />
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                ) : (
                  <></>
                );
              }
              return (
                <li key={item.id} className={item.classes}>
                  <NavLink
                    key={item.id}
                    className={({ isActive }) =>
                      isActive && item.id != 1 ? styles.active : ""
                    }
                    to={item.route}
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
