import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ichef.bbci.co.uk",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "**",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
