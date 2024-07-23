import { useState } from "react";
import Logo from "../../assets/Logo";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { troggleSidebar } from "../../store/reducers/ThemeConfigSlice";

export default function Sidebar() {

  
  const isSidebar = useSelector((state) => state.theme.isSidebarActive);
  
  console.log(isSidebar)

  function toggleMenu() {
    dispatch(troggleSidebar(isSidebar))
  }

  

  const dispatch = useDispatch();

  

  return (
    <>
      <div className={classNames(styles.sidebar, {  [styles.active]: isSidebar, })}>
        
        <div className={styles.top}>
          <div className={styles.logo}>
            <Logo size={50} />
            <h1>English Field</h1>
          </div>
          <i className={"bx bx-menu"} onClick={toggleMenu}></i>
        </div>
        <ul>
          <li>
            <NavLink      to={"/"}           style={{ textDecoration: 'none', color: 'black' }}
 >

            <div className={styles.itemList}>
              <i className={`bx bxs-dashboard ${styles.iconList}`}></i>
              <span>Início</span>
            </div>
            </NavLink>

            <span className={styles.tooltip}>Início</span>
          </li>
          <li>
            <NavLink                 style={{ textDecoration: 'none', color: 'black' }} to={"/image-association"}
 >

            <div className={styles.itemList}>
              <i className={`bx bx-images ${styles.iconList}`}></i>
              <span>Picture Association </span>
            </div>
            </NavLink>

            <span className={styles.tooltip}>Picture Association </span>
          </li>
        </ul>
      </div>
    </>
  );
}
