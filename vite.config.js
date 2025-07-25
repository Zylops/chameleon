import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import qrcode from 'qrcode-terminal';
import os from 'os';


function getLocalNetworkIP() {
	const interfaces = os.networkInterfaces();
	for (const name of Object.keys(interfaces)) {
		for (const iface of interfaces[name] || []) {
			if (iface.family === 'IPv4' && !iface.internal) {
				return iface.address;
			}
		}
	}
	return null;
}

const showQRPlugin = () => {
	return {
		name: 'vite-plugin-show-network-qr',
		configureServer(server) {
			server.httpServer?.once('listening', () => {
				const address = server.httpServer.address();
				if (typeof address === 'object' && address?.port) {
					const networkIP = getLocalNetworkIP();
					if (networkIP) {
						const url = `http://${networkIP}:${address.port}`;
						console.log(`\n🔗 Network: ${url}`);
						qrcode.generate(url, { small: true });
					} else {
						console.warn('⚠️ Could not determine local network IP.');
					}
				}
			});
		}
	};
};

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), showQRPlugin()]
});
