const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    important: true,
      content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",

         // Or if using `src` directory:    
         "./src/**/*.{js,ts,jsx,tsx,mdx}",
      ],
      darkMode: ["class"],
    theme: {
        extend: {
            screens: {
                'dark': {'raw': '(prefers-color-scheme: dark)'},
                // => @media (prefers-color-scheme: dark) { ... }
            },
        }
        ,
                extend: {
                    colors: {
                        clifford: '#f9ede7',
                        pallete: '#d08a85'
                        // d08a85
                    }
                }
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [require('@tailwindcss/forms') ],
}
