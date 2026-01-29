// Lightweight Resend API wrapper (replaces heavy SDK)
interface SendEmailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
}

interface SendEmailResult {
    data?: { id: string };
    error?: { message: string };
}

export async function sendEmail(apiKey: string, options: SendEmailOptions): Promise<SendEmailResult> {
    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: options.from,
                to: options.to,
                subject: options.subject,
                html: options.html,
                reply_to: options.replyTo,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: { message: data.message || 'Failed to send email' } };
        }

        return { data: { id: data.id } };
    } catch (error) {
        return { error: { message: error instanceof Error ? error.message : 'Unknown error' } };
    }
}
