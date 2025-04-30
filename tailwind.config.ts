
import type { Config } from "tailwindcss";

export default {
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Brand colors based on the provided design
				brand: {
					"blush-rose": "#FFCDC7",    // Blush Rose - Signature warm pink
					"creamy-ivory": "#F9F7F0",  // Creamy Ivory - Warm off-white
					"sage-mist": "#E1E9DE",     // Sage Mist - Soft, muted green
					"gilded-gold": "#D4AF37",   // Accent - Gilded gold
					"orchid-pink": "#F9B7FF",   // Accent - Orchid pink
					"deep-teal": "#006D77",     // Accent - Deep teal
					"soft-gray": "#8E9196",     // Neutral gray for text
					"dark": "#3A3A3A",          // Dark text color
				},
				natural: {
					green: '#E1E9DE',           // Updated to Sage Mist
					purple: '#F9B7FF',          // Updated to Orchid Pink
					peach: '#FFCDC7',           // Updated to Blush Rose
					gray: '#8E9196',            // Kept as is
					dark: '#3A3A3A'             // Updated to a softer dark
				}
			},
			fontFamily: {
				cormorant: ['Cormorant Garamond', 'serif'],
				montserrat: ['Montserrat', 'sans-serif'],
				playfair: ['Playfair Display', 'serif'],
				sans: ['Montserrat', 'sans-serif'] // Default font
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 1s ease-out',
				'fade-up': 'fade-up 0.7s ease-out',
				'scale-in': 'scale-in 0.5s ease-out'
			},
			backgroundImage: {
				'gradient-natural': 'linear-gradient(109.6deg, rgba(242,230,230,1) 11.2%, rgba(242,242,242,1) 91.1%)',
				'gradient-blush': 'linear-gradient(to right, #FFCDC7, #F9F7F0)',
				'gradient-sage': 'linear-gradient(to right, #E1E9DE, #F9F7F0)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
