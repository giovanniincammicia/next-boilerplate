// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const nextConfig = {
	// Security headers configuration
	async headers() {
		return [
			{
				headers: [
					// Content Security Policy (CSP)
					{
						key: "Content-Security-Policy",
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
							"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
							"font-src 'self' https://fonts.gstatic.com",
							"img-src 'self' data: https: blob:",
							"media-src 'self' https:",
							"connect-src 'self' https: wss: ws:",
							"frame-src 'self' https://vercel.live",
							"worker-src 'self' blob:",
							"object-src 'none'",
							"base-uri 'self'",
							"form-action 'self'",
							"frame-ancestors 'none'",
							"upgrade-insecure-requests",
						].join("; "),
					},
					// HTTP Strict Transport Security (HSTS)
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					// Prevent MIME type sniffing
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					// Prevent clickjacking
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					// XSS Protection
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					// Referrer Policy
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					// Permissions Policy
					{
						key: "Permissions-Policy",
						value: [
							"camera=()",
							"microphone=()",
							"geolocation=()",
							"interest-cohort=()",
							"payment=()",
							"usb=()",
							"accelerometer=()",
							"gyroscope=()",
							"magnetometer=()",
						].join(", "),
					},
					// Cross-Origin policies
					{
						key: "Cross-Origin-Embedder-Policy",
						value: "require-corp",
					},
					{
						key: "Cross-Origin-Opener-Policy",
						value: "same-origin",
					},
					{
						key: "Cross-Origin-Resource-Policy",
						value: "same-origin",
					},
				],
				// Apply security headers to all routes
				source: "/(.*)",
			},
			{
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
				// Cache static assets for better performance
				source: "/(.*)\\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot|otf)$",
			},
			{
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
				// Cache JavaScript and CSS files
				source: "/(.*)\\.(js|css)$",
			},
		];
	},
	output: "standalone",
	poweredByHeader: false,

	// Redirect HTTP to HTTPS in production
	async redirects() {
		return process.env.NODE_ENV === "production"
			? [
					{
						destination: "https://:host/:path*",
						has: [
							{
								key: "x-forwarded-proto",
								type: "header",
								value: "http",
							},
						],
						permanent: true,
						source: "/:path*",
					},
				]
			: [];
	},
	typedRoutes: true,
};

export default nextConfig;
