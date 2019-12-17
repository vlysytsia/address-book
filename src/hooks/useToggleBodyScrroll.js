import { useEffect } from "react";

/**
 * Toggle preventScroll class on document body
 * @param {Boolean} isDisabled
 */
const useToggleBodyScrroll = isDisabled => {
  useEffect(() => {
    if (isDisabled) {
      document.body.classList.add("preventScroll");
    } else {
      document.body.classList.remove("preventScroll");
    }
  }, [isDisabled]);
};

export default useToggleBodyScrroll;
