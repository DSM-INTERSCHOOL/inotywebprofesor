import { Container, MenuItem, MenuList } from "@material-ui/core";
import React from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./Layout.module.css";

export const Layout = ({ children }: any) => {
  return (
    <Container>
      <div className={styles.container}>
        <ul className={styles.menu}>
          <li className={styles["menu-item"]}>
            <NavLink
              to="/profesor/cuestionarios"
              className={(isActive) => (isActive ? styles.active : "")}
            >
              Cuestionarios
            </NavLink>
          </li>
          <li className={styles["menu-item"]}>
            <NavLink
              to="/profesor/reactivos"
              className={(isActive) => (isActive ? styles.active : "")}
            >
              Reactivos
            </NavLink>
          </li>
        </ul>
        <main className={styles.main}>{children}</main>
      </div>
    </Container>
  );
};
