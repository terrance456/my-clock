import React from "react";

type OutsideClickProps = <T extends HTMLElement>(ref: React.RefObject<T>, callback: (event: MouseEvent) => void) => void;

export const useOnOutsideClick: OutsideClickProps = (ref, callback) => {
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
