import type { APIRoute } from 'astro';
import { sendEmail } from '../../lib/resend';
import { generateContactEmailForCustomer, generateContactEmailForBusiness } from '../../lib/email-templates';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const data = await request.json();

        // Validate required fields
        if (!data.firstName || !data.lastName || !data.email || !data.message) {
            return new Response(JSON.stringify({ error: 'Niet alle vereiste velden zijn ingevuld' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Get API key from environment
        const apiKey = (locals.runtime?.env as any)?.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;

        if (!apiKey) {
            console.error('RESEND_API_KEY not configured');
            return new Response(JSON.stringify({ error: 'E-mail service niet geconfigureerd' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const emailData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            city: data.city,
            message: data.message
        };

        // Send confirmation email to customer
        const customerEmail = await sendEmail(apiKey, {
            from: "John's Glazenwassersbedrijf <noreply@knapgemaakt.nl>",
            to: data.email,
            subject: "Bedankt voor je bericht - John's Glazenwassersbedrijf",
            html: generateContactEmailForCustomer(emailData),
        });

        if (customerEmail.error) {
            console.error('Failed to send customer email:', customerEmail.error);
        }

        // Send notification to business
        const businessEmail = await sendEmail(apiKey, {
            from: "John's Glazenwassersbedrijf <noreply@knapgemaakt.nl>",
            to: 'yannick@knapgemaakt.nl', // TODO: Change back to info@johnsglazenwassersbedrijf.nl before launch
            subject: `Nieuw bericht van ${data.firstName} ${data.lastName}`,
            html: generateContactEmailForBusiness(emailData),
            replyTo: data.email,
        });

        if (businessEmail.error) {
            console.error('Failed to send business email:', businessEmail.error);
        }

        return new Response(JSON.stringify({
            success: true,
            message: 'Bericht succesvol verzonden'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error processing contact form:', error);
        return new Response(JSON.stringify({
            error: 'Er ging iets mis bij het verzenden. Probeer het opnieuw.'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
