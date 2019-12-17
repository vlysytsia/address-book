import { useEffect } from "react";
/**
 * Call callback function on Escape keydown
 * @param {Function} callback
 */
const useEscPress = callback => {
  useEffect(() => {
    const handler = e => {
      if (e.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [callback]);
};

export default useEscPress;
