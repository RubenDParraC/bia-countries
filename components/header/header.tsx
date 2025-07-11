"use client";

import { useEffect, useState } from "react";

// external components
import { twMerge } from "tailwind-merge";

// context
import { useTheme } from "../../context/context";

// components
import IconComponent from "../icon-component/icon-component";

function Header() {
  const { theme: darkMode, setTheme } = useTheme();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Mostrar el Header al desplazarse hacia arriba, ocultarlo al desplazarse hacia abajo
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // Ocultar Header
      } else {
        setIsVisible(true); // Mostrar Header
      }

      setLastScrollY(currentScrollY);
    };

    // Añadir el evento de scroll
    window.addEventListener("scroll", handleScroll);

    // Limpiar el evento de scroll al desmontar
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      data-testid="header"
      id="#header"
      className={twMerge(
        "w-full h-20 px-5 md:px-10 bg-white transition-transform duration-300 top-0 left-0 z-50 fixed flex items-center justify-center",
        darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900",
        !darkMode && isVisible && "shadow-gray-300",
        isVisible
          ? "transform translate-y-0 shadow-sm"
          : "transform -translate-y-full"
      )}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <span className="font-bold text-md md:text-xl">
          Where in the world?
        </span>
        <button
          onClick={() => setTheme(!darkMode)}
          className={twMerge(
            "flex flex-row items-center gap-2 cursor-pointer p-2 rounded hover:shadow",
            darkMode
              ? "text-gray-100 hover:shadow-white"
              : "text-gray-900 hover:shadow-gray-800"
          )}
        >
          <IconComponent
            iconName="MoonIcon"
            size={18}
            variant={darkMode ? "solid" : "outline"}
          />
          <span className="text-sm font-semibold">Dark Mode</span>
        </button>
      </div>
    </div>
  );
}

export default Header;
