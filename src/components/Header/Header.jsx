import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Header.module.css";

const Header = () => (
  <nav className={s.header}>
    <div className={s.header__container}>
      <NavLink
        to="/ram"
        className={({ isActive }) =>
          clsx(s.header__link, isActive && s.header__link_active)
        }
      >
        Xeon Ram Tool
      </NavLink>
      <NavLink
        to="/dram"
        className={({ isActive }) =>
          clsx(s.header__link, isActive && s.header__link_active)
        }
      >
        DRAM RAPL Configuration
      </NavLink>
      <NavLink
        to="/thermal"
        className={({ isActive }) =>
          clsx(s.header__link, isActive && s.header__link_active)
        }
      >
        Memory Thermal
      </NavLink>
      {/* Добавленная вкладка для конфигурации FIVR процессора */}
      <NavLink
        to="/fivr"
        className={({ isActive }) =>
          clsx(s.header__link, isActive && s.header__link_active)
        }
      >
        FIVR Configuration
      </NavLink>
      <NavLink
        to="/power"
        className={({ isActive }) =>
          clsx(s.header__link, isActive && s.header__link_active)
        }
      >
        Power Management
      </NavLink>
      <NavLink
        to="/advanced"
        className={({ isActive }) =>
          clsx(s.header__link, isActive && s.header__link_active)
        }
      >
        Advanced Configuration
      </NavLink>
      <NavLink
        to="/iio"
        className={({ isActive }) =>
          clsx(s.header__link, isActive && s.header__link_active)
        }
      >
        IIO Configuration
      </NavLink>
      <NavLink
        to="/csm"
        className={({ isActive }) =>
          clsx(s.header__link, isActive && s.header__link_active)
        }
      >
        CSM Configuration
      </NavLink>
      <NavLink
        to="/usb"
        className={({ isActive }) =>
          clsx(s.header__link, isActive && s.header__link_active)
        }
      >
        USB Configuration
      </NavLink>
      <NavLink
        to="/fan"
        className={({ isActive }) =>
          clsx(s.header__link, isActive && s.header__link_active)
        }
      >
        Fan Configuration
      </NavLink>
      <NavLink
        to="/pci"
        className={({ isActive }) =>
          clsx(s.header__link, isActive && s.header__link_active)
        }
      >
        PCI Configuration
      </NavLink>
    </div>
  </nav>
);

export default Header;
