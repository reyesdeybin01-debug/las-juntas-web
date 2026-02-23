import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#C62828",
                    light: "#E53935",
                    dark: "#8E0000",
                },
                accent: {
                    DEFAULT: "#D4A017",
                    light: "#FFD54F",
                },
                dark: {
                    DEFAULT: "#0A0A0A",
                    card: "#111111",
                    surface: "#1A1A1A",
                },
            },
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
            },
            keyframes: {
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "pulse-soft": {
                    "0%, 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.05)" },
                },
                "bounce-soft": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-8px)" },
                },
            },
            animation: {
                "fade-in-up": "fade-in-up 0.6s ease-out forwards",
                "fade-in": "fade-in 0.5s ease-out forwards",
                "pulse-soft": "pulse-soft 2s ease-in-out infinite",
                "bounce-soft": "bounce-soft 2s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};

export default config;
