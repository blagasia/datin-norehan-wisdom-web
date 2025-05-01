
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
				// Updated brand colors for a more elegant, cohesive palette
				brand: {
					"blush-rose": "#F5E1DB",    // Softer rose tone (was #FFCDC7)
					"creamy-ivory": "#F9F7F0",  // Kept as is - works well
					"sage-mist": "#D9E1D8",     // Slightly muted sage (was #E1E9DE)
					"gilded-gold": "#B8A084",   // Warm taupe instead of bright gold (was #D4AF37)
					"orchid-pink": "#E9D1DB",   // Muted mauve (was #F9B7FF)
					"deep-teal": "#3A5A60",     // Deeper, more muted teal (was #006D77)
					"soft-gray": "#8E9196",     // Kept as is
					"dark": "#3A3A3A",          // Kept as is
					"lavender": "#E2DFF4",      // New accent - soft lavender
					"amber": "#D6C9A0",         // New accent - soft amber
				},
				natural: {
					green: '#D9E1D8',           // Updated to match sage-mist
					purple: '#E2DFF4',          // Updated to match lavender
					peach: '#F5E1DB',           // Updated to match blush-rose
					gray: '#8E9196',            // Kept as is
					dark: '#3A3A3A',            // Kept as is
					taupe: '#B8A084',           // Added to match gilded-gold
				}
			},
			fontFamily: {
				// Kept existing font families
				italiana: ['Italiana', 'serif'],
				karla: ['Karla', 'sans-serif'],
				playfair: ['Playfair Display', 'serif'],
				cormorant: ['Cormorant Garamond', 'serif'],
				montserrat: ['Montserrat', 'sans-serif'],
				sans: ['Karla', 'sans-serif']
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
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'breathe': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'subtle-rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 1s ease-out',
				'fade-up': 'fade-up 0.7s ease-out',
				'scale-in': 'scale-in 0.5s ease-out',
				'shimmer': 'shimmer 3s infinite linear',
				'float': 'float 6s ease-in-out infinite',
				'breathe': 'breathe 8s ease-in-out infinite',
				'subtle-rotate': 'subtle-rotate 20s linear infinite'
			},
			backgroundImage: {
				'gradient-natural': 'linear-gradient(109.6deg, rgba(242,230,230,1) 11.2%, rgba(242,242,242,1) 91.1%)',
				'gradient-blush': 'linear-gradient(to right, #F5E1DB, #F9F7F0)',
				'gradient-sage': 'linear-gradient(to right, #D9E1D8, #F9F7F0)',
				'shimmer-gradient': 'linear-gradient(to right, #F5E1DB, #F9F7F0, #E2DFF4, #F9F7F0, #F5E1DB)',
				'dreamy-overlay': 'radial-gradient(circle at center, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
