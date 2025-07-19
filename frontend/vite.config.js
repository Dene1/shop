import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { fileURLToPath, URL } from "url"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@/": fileURLToPath(new URL("./src", import.meta.url)),
            "@/components": fileURLToPath(
                new URL("./src/components", import.meta.url),
            ),
            "@/pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
            "@/constants": fileURLToPath(
                new URL("./src/constants", import.meta.url),
            ),
            "@/actions": fileURLToPath(
                new URL("./src/actions", import.meta.url),
            ),
            "@/selectors": fileURLToPath(
                new URL("./src/selectors", import.meta.url),
            ),
            "@/hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
            "@/utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
            "@/reducers": fileURLToPath(
                new URL("./src/reducers", import.meta.url),
            ),
        },
    },
    server: {
        open: true,
    },
})
