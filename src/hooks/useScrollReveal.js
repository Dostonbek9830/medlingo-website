import { useEffect, useRef, useState } from "react";

function useScrollReveal(providedRef = null) {
  const internalRef = useRef(null);
  const ref = providedRef ?? internalRef;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return [ref, isVisible];
}

export default useScrollReveal;
