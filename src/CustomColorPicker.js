import React from "react";
import PropTypes from "prop-types";
import reactCSS from "reactcss";
import merge from "lodash/merge";
import * as color from "./helpers";

import { CustomPicker } from "react-color";

import tinycolor from "tinycolor2";
var {
  EditableInput,
  Checkboard,
  Saturation,
  Hue,
  Alpha,
} = require("react-color/lib/components/common");

const styles = reactCSS({
  default: {
    fields: {
      display: "flex",
      paddingTop: "4px",
    },
    single: {
      flex: "1",
      paddingLeft: "6px",
    },
    alpha: {
      flex: "1",
      paddingLeft: "6px",
    },
    double: {
      flex: "2",
    },
    input: {
      width: "80%",
      padding: "4px 10% 3px",
      border: "none",
      boxShadow: "inset 0 0 0 1px #ccc",
      fontSize: "11px",
    },
    label: {
      display: "block",
      textAlign: "center",
      fontSize: "11px",
      color: "#222",
      paddingTop: "3px",
      paddingBottom: "4px",
      textTransform: "capitalize",
    },
  },
  disableAlpha: {
    alpha: {
      display: "none",
    },
  },
});

export const Block = ({
  onChange,
  // onSwatchHover,
  hex,
  colors,
  width,
  triangle,
  styles: passedStyles = {},
  className = "",
  rgb,
  ...restProps
}) => {
  const transparent = hex === "transparent";

  const handleChange = (data, e) => {
    let alpha = undefined;
    let rgbColor = undefined;

    // For Alpha input
    if (typeof data.a === "string") {
      alpha = Number(data.a) / 100;
      rgbColor = { r: rgb.r, g: rgb.g, b: rgb.b, a: alpha, source: "rgb" };
      onChange(rgbColor, e);
    } else if (data.a) {
      alpha = data.a;
      rgbColor = { ...tinycolor(data).toRgb(), source: "rgb" };
      onChange(rgbColor, e);
    } else {
      // hex
      const validHex = color.isValidHex(data);
      if (validHex) {
        onChange({ hex: tinycolor(data).toHex(), source: "hex" }, e);
      }
    }
  };

  const styles = reactCSS(
    merge(
      {
        default: {
          card: {
            width,
            background: "#fff",
            boxShadow: "0 1px rgba(0,0,0,.1)",
            borderRadius: "6px",
            position: "relative",
          },
          head: {
            height: "110px",
            border: "1px solid green",
            background: tinycolor(rgb).toRgbString(),
            borderRadius: "6px 6px 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          },
          body: {
            padding: "10px",
          },
          hue: {
            height: 10,
            position: "relative",
            marginBottom: 10,
          },
          label: {
            fontSize: "18px",
            color: color.getContrastingColor(hex),
            position: "relative",
          },
          triangle: {
            width: "0px",
            height: "0px",
            borderStyle: "solid",
            borderWidth: "0 10px 10px 10px",
            borderColor: `transparent transparent ${hex} transparent`,
            position: "absolute",
            top: "-10px",
            left: "50%",
            marginLeft: "-10px",
          },
          input: {
            width: "100%",
            fontSize: "12px",
            color: "#666",
            border: "0px",
            outline: "none",
            height: "22px",
            boxShadow: "inset 0 0 0 1px #ddd",
            borderRadius: "4px",
            padding: "0 7px",
            boxSizing: "border-box",
          },
        },
        "hide-triangle": {
          triangle: {
            display: "none",
          },
        },
      },
      passedStyles
    ),
    { "hide-triangle": triangle === "hide" }
  );

  return (
    <div style={styles.card} className={`block-picker ${className}`}>
      <div style={styles.triangle} />

      <div
        style={{
          width: "100%",
          paddingBottom: "75%",
          position: "relative",
          overflow: "hidden",
          borderRadius: "4px",
        }}
      >
        {/* <Saturation onChange={handleChange} hsl={restProps.hsl} hsv={restProps.hsv} /> */}
        <Saturation
          onChange={handleChange}
          hsl={restProps.hsl}
          hsv={restProps.hsv}
        />
      </div>

      <div style={styles.head}>
        {transparent && <Checkboard borderRadius="6px 6px 0 0" />}
        <div style={styles.label}>{hex}</div>
      </div>

      <div style={styles.body}>
        <div style={{ border: "1px solid red" }}>
          <EditableInput
            style={{ input: styles.input }}
            value={hex}
            onChange={handleChange}
          />
        </div>
      </div>

      <hr />

      <div style={styles.hue}>
        <Alpha
          rgb={rgb}
          hsv={restProps.hsv}
          hsl={restProps.hsl}
          onChange={handleChange}
        />
      </div>

      <hr />

      <div style={styles.fields} className="flexbox-fix">
        <div style={styles.single}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="r"
            value={rgb.r}
            onChange={handleChange}
            dragLabel="true"
            dragMax="255"
          />
        </div>
        <div style={styles.single}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="g"
            value={rgb.g}
            onChange={handleChange}
            dragLabel="true"
            dragMax="255"
          />
        </div>
        <div style={styles.single}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="b"
            value={rgb.b}
            onChange={handleChange}
            dragLabel="true"
            dragMax="255"
          />
        </div>
        <div style={styles.alpha}>
          <EditableInput
            style={{ input: styles.input, label: styles.label }}
            label="a"
            value={Math.round(rgb.a * 100)}
            onChange={handleChange}
            dragLabel="true"
            dragMax="100"
          />
        </div>
      </div>
    </div>
  );
};

Block.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.arrayOf(PropTypes.string),
  triangle: PropTypes.oneOf(["top", "hide"]),
  styles: PropTypes.object,
};

Block.defaultProps = {
  width: 170,
  triangle: "top",
  styles: {},
};

export default CustomPicker(Block);
