import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { generateOfferteEmailForCustomer, generateOfferteEmailForBusiness } from '../../lib/email-templates';

export const prerender = false;

const serviceNames: Record<string, string> = {
    'svc-glasbewassing': 'Glasbewassing',
    'svc-zonnepanelen': 'Zonnepanelen reinigen',
    'svc-dakgoten': 'Dakgoten leegmaken',
    'svc-houtwerk': 'Houtwerk & Trespa',
    'svc-dakpannen': 'Dakpannen reinigen',
    'svc-telewash': 'Telewash systeem',
};

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const data = await request.json();

        // Validate required fields
        if (!data.name || !data.email || !data.phone || !data.postcode || !data.propertyType || !data.services?.length) {
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

        const resend = new Resend(apiKey);

        // Transform services to proper format
        const services = data.services.map((s: { id: string; price: number }) => ({
            name: serviceNames[s.id] || s.id,
            price: s.price
        }));

        const emailData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            postcode: data.postcode,
            propertyType: data.propertyType,
            services,
            totalPrice: data.totalPrice,
            preferredDate: data.preferredDate,
            notes: data.notes
        };

        // Send email to customer
        const customerEmail = await resend.emails.send({
            from: "John's Glazenwassersbedrijf <noreply@knapgemaakt.nl>",
            to: data.email,
            subject: `Je offerte-aanvraag - €${data.totalPrice} geschat`,
            html: generateOfferteEmailForCustomer(emailData),
        });

        if (customerEmail.error) {
            console.error('Failed to send customer email:', customerEmail.error);
        }

        // Send notification to business
        const businessEmail = await resend.emails.send({
            from: "John's Glazenwassersbedrijf <noreply@knapgemaakt.nl>",
            to: 'info@johnsglazenwassersbedrijf.nl',
            subject: `Nieuwe offerte-aanvraag van ${data.name} - €${data.totalPrice}`,
            html: generateOfferteEmailForBusiness(emailData),
            replyTo: data.email,
        });

        if (businessEmail.error) {
            console.error('Failed to send business email:', businessEmail.error);
        }

        return new Response(JSON.stringify({
            success: true,
            message: 'Offerte-aanvraag succesvol verzonden'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error processing offerte:', error);
        return new Response(JSON.stringify({
            error: 'Er ging iets mis bij het verzenden. Probeer het opnieuw.'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
