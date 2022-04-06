/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-06 22:19:39
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-06 23:13:42
 */

import path from "path";
import { build } from "esbuild";

const init =  async() => {
  try {
    await build({
      bundle: true,
      sourcemap: true,
      format: "esm",
      target: "esnext",
      entryPoints: [path.join(__dirname, "src", "index.ts")],
      outdir: path.join(__dirname, "dist"),
      outExtension: { ".js": ".mjs" },
    });
  } catch {
    process.exitCode = 1;
  }
}
init()