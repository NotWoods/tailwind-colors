import { writeFile } from "fs/promises";
import colors from "tailwindcss/colors.js";

/** @type {string[]} */
let rootSrc = [];
/** @type {string[]} */
let rootTypes = [];
function iterateColors(colors, prefix = "") {
  for (const [name, value] of Object.entries(colors)) {
    if (typeof value === "string") {
      rootSrc.push(`export const ${prefix}${name} = "${value}";`);
      rootTypes.push(`export const ${prefix}${name}: "${value}";`);
    } else {
      iterateColors(value, name);
    }
  }
}
iterateColors(colors);

await writeFile(
  new URL("../colors.js", import.meta.url),
  rootSrc.join("\n"),
  "utf8"
);
await writeFile(
  new URL("../colors.d.ts", import.meta.url),
  rootTypes.join("\n"),
  "utf8"
);
