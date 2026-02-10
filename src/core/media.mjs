/**
 * Media Components (Next-Gen Core)
 *
 * Simplified media primitives for images, icons, spinners, and avatars.
 *
 * Components:
 * - Media: Generic media component that renders images or inline SVG
 * - Icon: Icon component using the icon registry
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

const MediaCore = (props, ...children) => {
  if ("svg" in props) {
    const { svg, ...restProps } = props;
    return span({ ...restProps, innerHTML: svg });
  }

  const { src, ...restProps } = props;
  return img({ ...restProps, src: src });
};

const IconCore = (props, ...children) => {
  const { name, ...restProps } = props;
  if (!name) return null;

  const svgContent = iconRegistry[name] || "";
  if (!svgContent) return null;

  return span({
    ...restProps,
    innerHTML: svgContent,
    class: `icon ${restProps.class || ""}`,
  });
};

const spinnerSvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <style>.spinner_P7sC{transform-origin:center;animation:spinner_svv2 .75s infinite linear}@keyframes spinner_svv2{100%{transform:rotate(360deg)}}</style>
    <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" class="spinner_P7sC"/>
</svg>`;

const SpinnerCore = (props, ...children) => {
  return span({
    ...props,
    innerHTML: spinnerSvg,
    class: `spinner ${props.class || ""}`,
  });
};

const AvatarCore = (props, ...children) => {
  let source = props.src;
  let letter = props.letter;

  delete props.src;
  delete props.letter;

  let stateSource = isStateLike(source) ? source : useState(source);

  return Show(
    stateSource.map((s) => ({ image: s, letter: letter })),
    (resolved) =>
      resolved.image
        ? span({
            ...props,
            style: {
              ...props.style,
              backgroundImage: `url(${resolved.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            },
            class: `avatar ${props.class || ""}`,
          })
        : span({
            ...props,
            "data-letter": resolved.letter,
            class: `avatar ${props.class || ""}`,
          }),
  );
};

/**
 * Generic media component for images and inline SVG.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.src] - Image source URL (renders as img element)
 * @param {string} [props.svg] - Inline SVG content (renders as span with innerHTML)
 * @param {number} [props.size] - Size in pixels (sets both width and height)
 * @param {number} [props.width] - Width in pixels
 * @param {number} [props.height] - Height in pixels
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Child elements
 * @returns {*} Media component
 */
export const Media = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    MediaCore(finalProps, ...children),
  )(props, ...children),
);

/**
 * Icon component using the icon registry.
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Icon name from the icon registry
 * @param {number} [props.size=22] - Icon size in pixels
 * @param {string} [props.color] - Icon color (CSS value)
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Child elements
 * @returns {*} Icon component
 */
export const Icon = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    IconCore(finalProps, ...children),
  )({ size: 22, ...props }, ...children),
);

/**
 * Animated loading spinner component.
 * 
 * @param {Object} props - Component props
 * @param {number} [props.size=22] - Spinner size in pixels
 * @param {string} [props.color] - Spinner color (CSS value, defaults to currentColor)
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Child elements
 * @returns {*} Spinner component
 */
export const Spinner = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    SpinnerCore(finalProps, ...children),
  )({ size: 22, ...props }, ...children),
);

/**
 * User avatar component with image or letter initial support.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.src] - Avatar image source URL
 * @param {string} [props.letter] - Letter initial to display when no image provided
 * @param {number} [props.size=32] - Avatar size in pixels
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Child elements
 * @returns {*} Avatar component
 */
export const Avatar = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    AvatarCore(finalProps, ...children),
  )({ size: 32, ...props }, ...children),
);
