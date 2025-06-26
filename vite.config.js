import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@constants": path.resolve(__dirname, "./src/constants"),
            "@actions": path.resolve(__dirname, "./src/actions"),
            "@selectors": path.resolve(__dirname, "./src/selectors"),
            "@bff": path.resolve(__dirname, "./src/bff"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@utils": path.resolve(__dirname, "./src/utils"),
        },
    },
    server: {
        open: true,
    },
})
