import Bunnix, { useEffect, useRef, useState } from "@bunnix/core";
import Icon from "./Icon.mjs";
const { div, h4 } = Bunnix;

const defaultToast = {
  open: false,
  message: "",
  duration: 3,
  anchor: "topRight"
};

export const toastState = useState(defaultToast);

export const showToast = ({ message, duration = 3, anchor = "topRight", size = "md", icon } = {}) => {
  const normalizeSize = (value) => {
    if (!value || value === "default" || value === "regular" || value === "md") return "md";
    if (value === "sm") return "sm";
    if (value === "lg" || value === "xl") return value;
    return value;
  };
  toastState.set({
    open: true,
    message: message ?? "",
    size: normalizeSize(size),
    duration,
    anchor,
    icon: icon ?? ""
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
    if (value.anchor === "topLeft") return `${base} top-lg left-lg`;
    if (value.anchor === "bottomRight") return `${base} bottom-lg right-lg`;
    if (value.anchor === "bottomLeft") return `${base} bottom-lg left-lg`;
    return `${base} top-lg right-lg`;
  });

  const cardClass = toastState.map((value) => {
    const motionClass = value.anchor === "topLeft" || value.anchor === "bottomLeft"
      ? "slide-in-left"
      : "slide-in-right";
    const sizeClass = value.size === "lg" ? "p-lg" : value.size === "xl" ? "p-xl" : "p-base";
    return `box-control card shadow bg-base ${sizeClass} w-300 overflow-visible ${motionClass}`.trim();
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
    div({ class: cardClass }, [
      div({ class: "row-container items-center gap-sm no-margin" }, [
        div({
          class: toastState.map((value) =>
            value.icon ? `icon ${value.icon} icon-base` : "hidden"
          )
        }),
        h4({ class: textSizeClass.map(cls => `no-margin ${cls}`.trim()) }, toastState.map((value) => value.message))
      ])
    ])
  ]);
}
