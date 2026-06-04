import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const useHeaderCarousel = (activeClass, itemClass) => {
  const containerRef = useRef(null);
  const location = useLocation();

  // 1. Логика бесконечного зацикливания при скролле пальцем
  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.innerWidth > 768) {
      return;
    }

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const oneThird = scrollHeight / 3;

      if (scrollTop <= 0) {
        container.scrollTop = oneThird;
      } else if (scrollTop + clientHeight >= scrollHeight - 2) {
        container.scrollTop = oneThird * 2 - clientHeight;
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    // Жесткое позиционирование первой вкладки (Xeon Ram Tool) в центр экрана при старте
    const links = container.querySelectorAll(`.${itemClass}`);
    if (links.length > 0) {
      const itemsPerSection = links.length / 3;
      // Берём самый первый элемент из ЦЕНТРАЛЬНОГО (второго) блока дубликатов
      const firstCentralItem = links[itemsPerSection];

      if (firstCentralItem) {
        const containerHeight = container.clientHeight;
        const elementHeight = firstCentralItem.clientHeight;
        const elementOffsetTop = firstCentralItem.offsetTop;

        // Вычисляем точную позицию центра без анимации (мгновенно при инициализации)
        container.scrollTop =
          elementOffsetTop - containerHeight / 2 + elementHeight / 2;
      }
    }

    return () => container.removeEventListener("scroll", handleScroll);
  }, [itemClass]);

  // 2. Авто-центрирование при кликах и переходе по страницам
  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.innerWidth > 768) {
      return;
    }

    const timer = setTimeout(() => {
      const links = container.querySelectorAll(`.${itemClass}`);
      const totalItems = links.length;
      const itemsPerSection = totalItems / 3;

      let centralActiveLink = null;
      for (let i = itemsPerSection; i < itemsPerSection * 2; i++) {
        if (links[i] && links[i].classList.contains(activeClass)) {
          centralActiveLink = links[i];
          break;
        }
      }

      const activeLink =
        centralActiveLink || container.querySelector(`.${activeClass}`);

      if (activeLink) {
        activeLink.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 80);

    return () => clearTimeout(timer);
  }, [location.pathname, activeClass, itemClass]);

  // 3. 3D-анимация (масштаб и прозрачность)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let observer = null;

    const clearStyles = () => {
      const links = container.querySelectorAll(`.${itemClass}`);
      links.forEach((link) => {
        link.style.transform = "";
        link.style.opacity = "";
      });
    };

    const initEffects = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      clearStyles();

      if (window.innerWidth > 768) {
        return;
      }

      const thresholds = Array.from({ length: 51 }, (_, i) => i * 0.02);

      const observerOptions = {
        root: container,
        rootMargin: "-15% 0px -15% 0px",
        threshold: thresholds,
      };

      const handleIntersect = (entries) => {
        entries.forEach((entry) => {
          const link = entry.target;
          const ratio = entry.intersectionRatio;

          requestAnimationFrame(() => {
            link.style.transform = `scale(${0.85 + ratio * 0.2})`;
            link.style.opacity = String(0.4 + ratio * 0.6);
          });
        });
      };

      observer = new IntersectionObserver(handleIntersect, observerOptions);
      const links = container.querySelectorAll(`.${itemClass}`);
      links.forEach((link) => observer.observe(link));
    };

    initEffects();

    const handleResize = () => initEffects();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener("resize", handleResize);
      clearStyles();
    };
  }, [activeClass, itemClass]);

  return containerRef;
};

export default useHeaderCarousel;
