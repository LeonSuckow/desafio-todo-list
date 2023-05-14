import { FunctionComponent } from "react";
import styles from './Header.module.css'
import logo from '../assets/logo.svg'
interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Logo ToDo" />
    </header>
  );
}

export default Header;