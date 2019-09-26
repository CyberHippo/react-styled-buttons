import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/core";
import chroma from "chroma-js";

import defaultTheme from "../theme";

// CSS
const ButtonStyle = ({
  theme: {
    fontSizes: [, , , fourthFontSize] = [],
    space: [, , , fourthSpace] = [],
    radii: [, secondRadius] = [],
    shadows
  },
  themeColors: { background, primary }
}) => css`
  position: relative;
  cursor: pointer;
  outline: none;
  margin: 0;
  padding: ${fourthSpace}px;
  width: auto;
  text-align: center;
  display: inline-block;
  border: none;
  border-radius: ${secondRadius};
  background: ${primary};
  color: ${background};
  font-size: ${fourthFontSize};
  font-family: inherit;
  line-height: inherit;
  font-weight: inherit;
  transform: translate3d(0, 0, 0);
  transition: 0.3s ease-in-out;

  &:hover {
    background: ${chroma(primary)
      .darken(0.2)
      .saturate(1.5)
      .hex()};
    transform: translate3d(0, -3px, 0);
    box-shadow: ${shadows.default};
  }

  &:focus {
    box-shadow: 0 0px 8px
      ${chroma(primary)
        .brighten(1)
        .saturate(3)
        .hex()};
  }

  &:active {
    transform: translate3d(0, 1px, 0);
  }
`;

const disabledStyle = css`
  opacity: 0.6;
  cursor: default;
  transition: none;
  transform: translate3d(0, 0, 0);
  pointer-events: none;
  cursor: none;
`;

const activeStyle = ({ colors, variant }) => {
  const variantColor = colors[variant];
  return css`
    background: ${chroma(variantColor)
      .darken(0.5)
      .saturate(1.2)
      .hex()};
  `;
};

const VariantStyle = ({ colors, variant }) => {
  const variantColor = colors[variant];
  return css`
    background: ${variantColor};
    color: ${variant === "gray" || variant === "muted"
      ? colors.text
      : colors.background};

    &:hover {
      background: ${variant === "gray"
        ? chroma(variantColor)
            .darken(0.5)
            .hex()
        : chroma(variantColor)
            .saturate(0.5)
            .hex()};
    }

    &:focus {
      box-shadow: 0 0px 8px
        ${chroma(variantColor)
          .brighten(1)
          .saturate(3)
          .hex()};
    }
  `;
};

const SmallButtonStyle = ({
  space: [, secondSpace, thirdSpace],
  fontSizes: [, , thirdFontSize]
}) => css`
  padding: ${secondSpace}px ${thirdSpace}px;
  font-size: ${thirdFontSize}px;
`;

const MediumButtonStyle = ({ space: [, , thirdSpace] }) => css`
  padding: ${thirdSpace}px;
`;

const composeStyles = ({
  theme,
  themeColors,
  variant,
  size,
  disabled,
  active
}) => {
  const cssStyles = [ButtonStyle({ theme, themeColors })];
  const sizeCases = {
    small: () => cssStyles.push(SmallButtonStyle(theme)),
    medium: () => cssStyles.push(MediumButtonStyle(theme))
  };

  if (sizeCases[size]) {
    sizeCases[size]();
  }

  variant &&
    variant !== "primary" &&
    cssStyles.push(VariantStyle({ colors: themeColors, variant }));
  disabled && cssStyles.push(disabledStyle);
  active && cssStyles.push(activeStyle({ colors: themeColors, variant }));

  return cssStyles;
};

function Button({
  as: Element,
  id,
  onClick,
  variant,
  size,
  mode,
  disabled,
  theme,
  active,
  ...props
}) {
  const [mergedTheme, setMergedTheme] = useState(theme);
  const [themeColors, setThemeColors] = useState(theme.colors);

  useEffect(() => {
    if (mode !== "light") {
      const nextThemeColors = mergedTheme.colors.modes[mode];
      nextThemeColors && setThemeColors(nextThemeColors);
    }
    if (mode === "light") {
      const nextThemeColors = mergedTheme.colors;
      nextThemeColors && setThemeColors(nextThemeColors);
    }
  }, [mode, mergedTheme]);

  useEffect(() => {
    if (theme) {
      const nextMergedTheme = Object.assign(
        {},
        {
          colors: defaultTheme.colors,
          space: defaultTheme.space,
          fontSizes: defaultTheme.fontSizes,
          radii: defaultTheme.radii,
          shadows: defaultTheme.shadows
        },
        theme
      );
      setMergedTheme(nextMergedTheme);
      const nextThemeColors = nextMergedTheme.colors;
      setThemeColors(nextThemeColors);
    }
  }, [theme]);

  const composedStyles = composeStyles({
    theme: mergedTheme,
    themeColors,
    variant,
    size,
    disabled,
    active
  });
  const type = Element === "button" && !props.type ? "button" : null;

  return (
    <Element
      css={composedStyles}
      id={id}
      data-testid={id}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      <span>{props.children}</span>
    </Element>
  );
}

Button.defaultProps = {
  as: "button",
  id: "",
  testid: "",
  children: null,
  theme: defaultTheme,
  disabled: false,
  onClick: () => {},
  mode: "light",
  variant: "primary",
  size: "large"
};

Button.propTypes = {
  id: PropTypes.string,
  theme: PropTypes.object,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "accent",
    "accent2",
    "accent3",
    "accent4",
    "muted",
    "highlight",
    "gray"
  ]),
  size: PropTypes.oneOf(["large", "medium", "small"]),
  mode: PropTypes.oneOf(["light", "dark"]),
  active: PropTypes.bool
};

export default Button;
