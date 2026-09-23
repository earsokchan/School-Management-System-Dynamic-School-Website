import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			navy: {
  				DEFAULT: '#003399',
  				light: '#0052CC',
  				dark: '#002266'
  			},
  			creeper: {
  				DEFAULT: '#cc0000',
  				dark: '#a80000',
  				light: '#d92626'
  			},
  			gold: {
  				DEFAULT: '#d4a72c',
  				dark: '#b0891f',
  				light: '#e0b952'
  			},
  			canvas: '#ffffff',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
   				DEFAULT: 'hsl(var(--destructive))',
   				foreground: 'hsl(var(--destructive-foreground))'
   			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-khmer)',
  				'system-ui',
  				'sans-serif'
  			],
  			khmer: [
  				'var(--font-khmer)',
  				'system-ui',
  				'sans-serif'
  			],
  			display: [
  				'var(--font-moul)',
  				'var(--font-khmer)',
  				'system-ui',
  				'sans-serif'
  			],
  			notosans: [
  				'var(--font-noto-sans-khmer)',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		letterSpacing: {
  			tightest: '-0.03em'
  		},
  		boxShadow: {
  			card: '0 10px 40px -12px rgba(0, 51, 153, 0.14)',
  			lift: '0 24px 60px -16px rgba(0, 34, 102, 0.24)'
  		},
  		animation: {
  			'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
  			'fade-in': 'fadeIn 0.9s ease both',
  			marquee: 'marquee 30s linear infinite',
  			'slow-zoom': 'slowZoom 18s ease-in-out infinite alternate'
  		},
  		keyframes: {
  			fadeUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(24px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			marquee: {
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(-50%)'
  				}
  			},
  			slowZoom: {
  				'0%': {
  					transform: 'scale(1)'
  				},
  				'100%': {
  					transform: 'scale(1.08)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [animate],
};

export default config;