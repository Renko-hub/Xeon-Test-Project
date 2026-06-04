import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // Подключаем локацию, чтобы знать об активном роуте

const useHeaderCarousel = (activeClass, itemClass) => {
  const containerRef = useRef(null);
  const location = useLocation(); // Следим за изменением страницы

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let observer;

    // Функция центрирования элемента по вертикали
    const centerElement = (element) => {
      const containerHeight = container.clientHeight;
      const elementHeight = element.clientHeight;
      const elementOffsetTop = element.offsetTop;

      container.scrollTo({
        top: elementOffsetTop - containerHeight / 2 + elementHeight / 2,
        behavior: "smooth",
      });
    };

    // Функция для очистки inline-стилей (нужна при переходе на десктоп)
    const clearStyles = (links) => {
      links.forEach((link) => {
        link.style.transform = "";
        link.style.opacity = "";
      });
    };

    const initMobileEffects = () => {
      if (window.innerWidth > 768) {
        const links = container.querySelectorAll(`.${itemClass}`);
        clearStyles(links);
        return;
      }

      // 1. Центрируем текущую активную ссылку (при загрузке или смене роута)
      const activeLink = container.querySelector(`.${activeClass}`);
      if (activeLink) {
        // Делаем небольшую задержку, чтобы DOM успел полностью отрисоваться
        setTimeout(() => centerElement(activeLink), 50);
      }

      // 2. Логика IntersectionObserver для плавного scale и opacity при скролле
      const observerOptions = {
        root: container,
        rootMargin: "-33% 0px -33% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      };

      const handleIntersect = (entries) => {
        entries.forEach((entry) => {
          const link = entry.target;
          const ratio = entry.intersectionRatio;

          link.style.transform = `scale(${0.85 + ratio * 0.15})`;
          link.style.opacity = String(0.75 + ratio * 0.25);
        });
      };

      observer = new IntersectionObserver(handleIntersect, observerOptions);
      const links = container.querySelectorAll(`.${itemClass}`);
      links.forEach((link) => observer.observe(link));
    };

    // Запускаем эффекты
    initMobileEffects();

    // Слушаем ресайз экрана, чтобы хук вовремя включался/выключался
    const handleResize = () => {
      if (observer) {
        observer.disconnect();
      }
      initMobileEffects();
    };

    window.addEventListener("resize", handleResize);

    // Чистим слушатели при размонтировании
    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [activeClass, itemClass, location.pathname]); // Хук перезапустится при смене страницы

  return containerRef;
};

export default useHeaderCarousel;
