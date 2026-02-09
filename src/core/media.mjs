/**
 * Media Components (Next-Gen Core)
 *
 * Simplified media primitives for images, icons, spinners, and avatars.
 *
 * Components:
 * - Media: Generic media component that renders images or inline SVG
 * - Icon2: Icon component using the icon registry
 * - Spinner: Animated loading spinner with customizable size
 * - Avatar: User avatar with support for images or letter initials
 *
 * Features:
 * - Automatic style extraction (width, height, size, etc.)
 * - Flexible props normalization (supports both props object and direct children)
 * - SVG support via innerHTML for icons and spinners
 * - Avatar size and appearance customization
 */
import Bunnix, { Show, useState } from "@bunnix/core";
import {
  withNormalizedArgs,
  withExtractedStyles,
  isStateLike,
} from "./utils.mjs";
import { iconRegistry } from "../utils/iconRegistry.generated.mjs";

const { span, img } = Bunnix;

export const Media = withNormalizedArgs(
  withExtractedStyles((props, ...children) => {
    if ("svg" in props) {
      const { svg, ...restProps } = props;
      return span({ ...restProps, innerHTML: svg });
    }

    const { src, ...restProps } = props;
    return img({ ...restProps, src: src });
  }),
);

export const Icon2 = withNormalizedArgs(
  withExtractedStyles((props, ...children) => {
    const { name, ...restProps } = props;
    if (!name) return null;

    const svgContent = iconRegistry[name] || "";
    if (!svgContent) return null;

    return span({
      ...restProps,
      innerHTML: svgContent,
      class: `icon ${restProps.class || ""}`,
    });
  }),
);

const spinnerSvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <style>.spinner_P7sC{transform-origin:center;animation:spinner_svv2 .75s infinite linear}@keyframes spinner_svv2{100%{transform:rotate(360deg)}}</style>
    <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" class="spinner_P7sC"/>
</svg>`;

const SpinnerCore = withNormalizedArgs((props, ...children) => {
  return withExtractedStyles((finalProps, ...children) => {
    return span({
      ...finalProps,
      innerHTML: spinnerSvg,
      class: `spinner ${finalProps.class || ""}`,
    });
  })(props, ...children);
});

// Apply default Spinner props at export
export const Spinner = (props = {}, ...children) => {
  const propsWithDefaults = { size: 22, ...props };
  return SpinnerCore(propsWithDefaults, ...children);
};

const AvatarCore = withNormalizedArgs((props, ...children) => {
  return withExtractedStyles((finalProps, ...children) => {
    let baseClass =
      "border-primary radius-circle bg-primary fg-secondary overflow-hidden";
    let source = finalProps.src;
    let letter = finalProps.letter;

    delete finalProps.src;
    delete finalProps.letter;

    let stateSource = isStateLike(source) ? source : useState(source);

    return Show(
      stateSource.map((s) => ({ image: s, letter: letter })),
      (resolved) =>
        resolved.image
          ? span({
              ...finalProps,
              style: {
                ...finalProps.style,
                backgroundImage: `url(${resolved.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              },
              class: `avatar flex-column flex-center weight-heavier ${baseClass} ${finalProps.class || ""}`,
            })
          : span({
              ...finalProps,
              "data-letter": resolved.letter,
              class: `avatar flex-column flex-center weight-heavier ${baseClass} ${finalProps.class || ""}`,
            }),
    );
  })(props, ...children);
});

// Apply default Avatar props at export
export const Avatar = (props = {}, ...children) => {
  const propsWithDefaults = { size: 32, ...props };
  return AvatarCore(propsWithDefaults, ...children);
};
