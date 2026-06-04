import { useState, useEffect, useRef } from "react";
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
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav ref={menuRef} className={clsx(s.header, isOpen && s.header_open)}>
      <button
        className={clsx(s.header__toggle, isOpen && s.header__toggle_open)}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={clsx(
          s.header__container,
          isOpen && s.header__container_open,
        )}
      >
        {MENU_ITEMS.map((item) => (
          <NavLink
            key={item.to}
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
