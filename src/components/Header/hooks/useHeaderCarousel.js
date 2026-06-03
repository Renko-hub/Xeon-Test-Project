import { useEffect, useRef } from "react";

const useHeaderCarousel = (activeClass, itemClass) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    if (window.innerWidth > 768) {
      return;
    }

    const centerElement = (element) => {
      const containerHeight = container.clientHeight;
      const elementHeight = element.clientHeight;
      const elementOffsetTop = element.offsetTop;

      container.scrollTo({
        top: elementOffsetTop - containerHeight / 2 + elementHeight / 2,
        behavior: "smooth",
      });
    };

    const handleClick = (e) => {
      const link = e.target.closest(`.${itemClass}`);
      if (link) {
        centerElement(link);
      }
    };

    const observerOptions = {
      root: container,
      rootMargin: "-33% 0px -33% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        const link = entry.target;
        const ratio = entry.intersectionRatio;

        link.style.transform = `scale(${0.8 + ratio * 0.2})`;
        link.style.opacity = String(0.4 + ratio * 0.6);
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const links = container.querySelectorAll(`.${itemClass}`);
    links.forEach((link) => observer.observe(link));

    container.addEventListener("click", handleClick);

    return () => {
      observer.disconnect();
      container.removeEventListener("click", handleClick);
    };
  }, [activeClass, itemClass]);

  return containerRef;
};

export default useHeaderCarousel;
