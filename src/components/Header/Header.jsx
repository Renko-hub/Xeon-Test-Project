import { useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Header.module.css";

const MENU_ITEMS = [
  { to: "/ram", label: "Xeon Ram Tool" },
  { to: "/memory", label: "Memory Configuration" },
  { to: "/dram", label: "DRAM RAPL Configuration" },
  { to: "/thermal", label: "Memory Thermal" },
  { to: "/fivr", label: "FIVR Configuration" },
  { to: "/power", label: "Power Management" },
  { to: "/advanced", label: "Advanced Configuration" },
  { to: "/iio", label: "IIO Configuration" },
  { to: "/csm", label: "CSM Configuration" },
  { to: "/usb", label: "USB Configuration" },
  { to: "/fan", label: "Fan Configuration" },
  { to: "/pci", label: "PCI Configuration" },
  { to: "/about", label: "About" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={clsx(s.header, isOpen && s.header_open)}>
      <button className={s.header__toggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕ Закрыть" : "Разделы"}
      </button>

      <div
        className={clsx(
          s.header__container,
          isOpen && s.header__container_open,
        )}
      >
        {MENU_ITEMS.map((item, index) => (
          <NavLink
            key={`${item.to}-${index}`}
            to={item.to}
            end
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              clsx(s.header__link, isActive && s.header__link_active)
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Header;
