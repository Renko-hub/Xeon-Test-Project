import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = () => (
  <nav className={s.header}>
    <div className={s.header__container}>
      <NavLink to="/ram" className={({ isActive }) => `${s.header__link} ${isActive ? s.header__link_active : ''}`}>Xeon Ram Tool</NavLink>
      <NavLink to="/power" className={({ isActive }) => `${s.header__link} ${isActive ? s.header__link_active : ''}`}>Power Management</NavLink>
      <NavLink to="/iio" className={({ isActive }) => `${s.header__link} ${isActive ? s.header__link_active : ''}`}>IIO Configuration</NavLink>
      <NavLink to="/csm" className={({ isActive }) => `${s.header__link} ${isActive ? s.header__link_active : ''}`}>CSM Configuration</NavLink>
      <NavLink to="/fan" className={({ isActive }) => `${s.header__link} ${isActive ? s.header__link_active : ''}`}>Fan Configuration</NavLink>
      <NavLink to="/pci" className={({ isActive }) => `${s.header__link} ${isActive ? s.header__link_active : ''}`}>PCI Configuration</NavLink>
    </div>
  </nav>
);

export default Header;
