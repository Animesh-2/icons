import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import svgr from "@svgr/rollup"; // ⬅️ NEW IMPORT

const extensions = [".js", ".jsx", ".svg"]; // ⬅️ UPDATED EXTENSIONS

export default {
  // Use the index.js file we created in Step 3
  input: "index.js",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      sourcemap: true, // Recommended
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true, // Recommended
    },
  ],
  plugins: [
    // 1. Convert SVG files to React components FIRST
    svgr({
      // Configure SVGR to output a named export called 'ReactComponent'
      exportType: 'named', 
    }), 

    resolve({ extensions }),
    commonjs(),

    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      extensions,
      presets: [
        [
          "@babel/preset-react",
          {
            "throwIfNamespace": false,
            "runtime": "automatic"
          }
        ]
      ]
    }),
  ],
  external: ["react", "react-dom"],
};