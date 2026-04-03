import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => (
  <nav className={styles.navigationShell}>
    <div className={styles.navigationContainer}>
      {[
        ['/ram', 'Xeon Ram Tool'],
        ['/power', 'Power Management'],
        ['/fan', 'Fan Configuration'],
        ['/iio', 'IIO Configuration'],
        ['/csm', 'CSM Configuration'],
        ['/pci', 'PCI Configuration']
      ].map(([to, label]) => (
        <NavLink 
          key={to} 
          to={to} 
          // Используем новые названия классов и camelCase
          className={({ isActive }) => 
            `${styles.navLink} ${isActive ? styles.isActiveLink : ''}`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  </nav>
);

export default Header;
