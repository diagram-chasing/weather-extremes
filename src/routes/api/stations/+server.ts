import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import https from 'https';
import type { IncomingMessage } from 'http';


export const GET: RequestHandler = async () => {
	try {
	
		const data = await new Promise<any>((resolve, reject) => {
			const req = https.get(
				'https://dss.imd.gov.in/dwr_img/GIS/Observed_Stations.json',
				{ 
					headers: {
						'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36',
						'Accept': 'application/json'
					},
					rejectUnauthorized: false, 
					timeout: 10000 
				},
				(res: IncomingMessage) => {
					let data = '';
					
					res.on('data', (chunk: Buffer) => {
						data += chunk;
					});
					
					res.on('end', () => {
						if (res.statusCode !== 200) {
							reject(new Error(`HTTP error: ${res.statusCode}`));
							return;
						}
						
						try {
							const jsonData = JSON.parse(data);
							resolve(jsonData);
						} catch (err) {
							reject(new Error('Invalid JSON response'));
						}
					});
				}
			);
			
			req.on('error', (err: Error) => {
				reject(err);
			});
			
			req.on('timeout', () => {
				req.destroy();
				reject(new Error('Request timed out'));
			});
		});
		
		return json(data);
	} catch (error) {
		console.error('Error fetching stations:', error);
		
		return json({ 
			error: 'Failed to fetch weather stations data: ' + 
				(error instanceof Error ? error.message : 'Unknown error') 
		}, { status: 500 });
	}
}