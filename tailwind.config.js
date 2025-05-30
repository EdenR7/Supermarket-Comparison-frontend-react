/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "3xl": "1600px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
      },
      transitionProperty: {
        height: "height",
      },
      backgroundImage: {
        "gradient-yellow":
          "linear-gradient(to right, #FFE97C, hsl(45, 80%, 71%))",
        "gradient-yellow-reverse":
          "linear-gradient(to right, hsl(45, 80%, 61%), #FFE97C)",
      },
      screens: {
        "1col": "350px",
        "break-370px": "370px",
        "break-390px": "390px",
        "break-400px": "400px",
        "break-450px": "450px",
        "break-500px": "500px",
        "break-600px": "600px",
        "break-650px": "650px",
        "break-700px": "700px",
        "break-800px": "800px",
        "break-850px": "850px",
        "break-950px": "950px",
        "break-1000px": "1000px",
        "2col": "750px",
        "3col": "1100px",
      },
      spacing: {
        400: "400px",
        500: "500px",
        600: "600px",
        700: "700px",
        800: "800px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      gridTemplateRows: {
        layout: "auto 1fr",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
