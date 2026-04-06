import { defineConfig } from "vitest/config";
export default defineConfig({
    test: {
        environment: "node",
        include: ["tests/**/*.test.ts"],
        globals: true
    }
});
//# sourceMappingURL=vitest.config.js.map