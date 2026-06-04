import { NavLink } from "react-router-dom";
import clsx from "clsx";
import useHeaderCarousel from "./hooks/useHeaderCarousel";
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
  const containerRef = useHeaderCarousel(s.header__link_active, s.header__link);
  const extendedItems = [...MENU_ITEMS, ...MENU_ITEMS, ...MENU_ITEMS];

  return (
    <nav className={s.header}>
      <div className={s.header__container} ref={containerRef}>
        {extendedItems.map((item, index) => (
          <NavLink
            key={`${item.to}-${index}`}
            to={item.to}
            end
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
