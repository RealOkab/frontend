import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className }) {
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else dialog.current.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`${(className, !open && "hidden")} `}>
      {children}
    </dialog>,
    document.getElementById("portal-modal")
  );
}
