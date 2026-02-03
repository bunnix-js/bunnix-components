import Bunnix, { useEffect, useRef, useState } from "@bunnix/core";
import { clampSize, toSizeToken } from "../utils/sizeUtils.mjs";
import { resolveIconClass } from "../utils/iconUtils.mjs";
const { div, h4 } = Bunnix;

const defaultToast = {
  open: false,
  message: "",
  duration: 3,
  anchor: "topRight"
};

export const toastState = useState(defaultToast);

export const showToast = ({ message, duration = 3, anchor = "topRight", size = "regular", icon } = {}) => {
  // ToastNotification does not support small size (clamps to regular)
  const normalizeSize = (value) => clampSize(value, ["xsmall", "regular", "large", "xlarge"], "regular");
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
    const sizeToken = toSizeToken(value.size);
    const sizeClass = sizeToken === "xl" ? "p-xl" : sizeToken === "lg" ? "p-lg" : sizeToken === "md" ? "p-base" : "p-sm";
    return `box-control card shadow bg-base ${sizeClass} w-300 overflow-visible ${motionClass}`.trim();
  });
  const textSizeClass = toastState.map((value) => {
    const sizeToken = toSizeToken(value.size);
    if (sizeToken === "xl") return "text-xl";
    if (sizeToken === "lg") return "text-lg";
    if (sizeToken === "md") return "text-base";
    return "text-sm";
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
            (() => {
              const resolvedIcon = resolveIconClass(value.icon);
              return resolvedIcon ? `icon ${resolvedIcon} icon-base` : "hidden";
            })()
          )
        }),
        h4({ class: textSizeClass.map(cls => `no-margin ${cls}`.trim()) }, toastState.map((value) => value.message))
      ])
    ])
  ]);
}
