import React from "react";

export const useOnOutsideClick = <T extends HTMLElement>(ref: React.RefObject<T>, callback: (event?: MouseEvent) => void) => {
  React.useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [callback, ref]);
};
