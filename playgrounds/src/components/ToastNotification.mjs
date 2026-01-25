import Bunnix, { useEffect, useRef, useState } from "@bunnix/core";
const { div, h4 } = Bunnix;

const defaultToast = {
  open: false,
  message: "",
  duration: 3,
  anchor: "topRight"
};

export const toastState = useState(defaultToast);

export const showToast = ({ message, duration = 3, anchor = "topRight", size = "regular" } = {}) => {
  toastState.set({
    open: true,
    message: message ?? "",
    size,
    duration,
    anchor
  });
};

export const hideToast = () => {
  toastState.set({ ...toastState.get(), open: false });
};

export default function ToastNotification() {
  const popoverRef = useRef(null);
  const timerRef = useRef(null);

  useEffect((value) => {
    const popover = popoverRef.current;
    if (!popover) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (value.open) {
      popover.showPopover();
      if (value.duration && value.duration > 0) {
        timerRef.current = setTimeout(() => {
          hideToast();
        }, value.duration * 1000);
      }
    } else {
      if (popover.matches(":popover-open")) {
        popover.hidePopover();
      }
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [toastState]);

  const anchorClass = toastState.map((value) => {
    const base = "fixed inset-auto z-99";
    if (value.anchor === "topLeft") return `${base} top-md left-md`;
    if (value.anchor === "bottomRight") return `${base} bottom-md right-md`;
    if (value.anchor === "bottomLeft") return `${base} bottom-md left-md`;
    return `${base} top-md right-md`;
  });

  const sizeClass = toastState.map((value) => {
    if (value.size === "lg") return "p-lg";
    if (value.size === "xl") return "p-xl";
    return "p-base";
  });
  const textSizeClass = toastState.map((value) => {
    if (value.size === "lg") return "text-lg";
    if (value.size === "xl") return "text-xl";
    return "text-base";
  });

  return div({
    ref: popoverRef,
    popover: "manual",
    class: anchorClass.map(cls => `popover-base ${cls} overflow-visible`)
  }, [
    div({ class: sizeClass.map(cls => `box-capsule card shadow bg-base ${cls} w-300 overflow-visible`.trim()) }, [
      h4({ class: textSizeClass.map(cls => `no-margin ${cls}`.trim()) }, toastState.map((value) => value.message))
    ])
  ]);
}
