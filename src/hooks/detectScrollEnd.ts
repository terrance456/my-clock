import React from "react";

export const DetectScrollEnd = <T extends HTMLElement>(ref: React.RefObject<T>, callBack: () => void) => {
  React.useEffect(() => {
    if (ref?.current) {
      const currentRef: T = ref.current;
      const listener = () => {
        if (currentRef && Math.round(currentRef.offsetHeight + currentRef.scrollTop + 100) >= currentRef.scrollHeight) {
          callBack();
        }
      };
      currentRef.addEventListener("scroll", listener);
      return () => currentRef.removeEventListener("scroll", listener);
    }
  }, [ref, callBack]);
};
