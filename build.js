/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-06 22:19:39
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-07 17:22:33
 */

import path from "path";
import { build } from "esbuild";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

try {
  await build({
    bundle: true,
    sourcemap: true,
    format: "cjs",
    target: "esnext",
    entryPoints: [path.join(__dirname, "src", "index.ts")],
    outdir: path.join(__dirname, "dist"),
    outExtension: { ".js": ".mjs" },
  });
} catch {
  process.exitCode = 1;
}