/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				inter: ["Inter", "sans-serif"],
			},
			colors: {
				white: "#EEEEEE",
				purple: "#6525ED",
				gray: "#61656C",
				"dark-grey": "#767A7D",
				"darker-grey": "#282B30",
				graphite: "#19191C",
				black: "#121315",
				red: "#C92733",
				green: "#0DDA89",
			},
			letterSpacing: {
				logo: "1.16em",
			},
		},
	},
	plugins: [],
};
