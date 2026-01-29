// Branded email templates for John's Glazenwassersbedrijf
// Colors match the website: Primary blue (#1e40af), Navy (#0f172a), Accent yellow (#fbbf24)

const brandColors = {
    primary: '#1e40af',
    primaryDark: '#1e3a8a',
    navy: '#0f172a',
    accent: '#fbbf24',
    gray: '#6b7280',
    lightGray: '#f3f4f6',
    white: '#ffffff',
};

const baseStyles = `
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: ${brandColors.navy};
        margin: 0;
        padding: 0;
        background-color: ${brandColors.lightGray};
    }
    .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: ${brandColors.white};
    }
    .header {
        background-color: ${brandColors.primary};
        padding: 32px 24px;
        text-align: center;
    }
    .header h1 {
        color: ${brandColors.white};
        font-size: 24px;
        font-weight: 800;
        margin: 0;
    }
    .header h1 span {
        color: ${brandColors.accent};
    }
    .content {
        padding: 32px 24px;
    }
    .greeting {
        font-size: 20px;
        font-weight: 700;
        color: ${brandColors.navy};
        margin-bottom: 16px;
    }
    .intro {
        color: ${brandColors.gray};
        margin-bottom: 24px;
    }
    .details-box {
        background-color: ${brandColors.lightGray};
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 24px;
    }
    .details-box h2 {
        font-size: 16px;
        font-weight: 700;
        color: ${brandColors.navy};
        margin: 0 0 16px 0;
        padding-bottom: 12px;
        border-bottom: 2px solid ${brandColors.primary};
    }
    .detail-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid #e5e7eb;
    }
    .detail-row:last-child {
        border-bottom: none;
    }
    .detail-label {
        color: ${brandColors.gray};
        font-size: 14px;
    }
    .detail-value {
        color: ${brandColors.navy};
        font-weight: 600;
        font-size: 14px;
    }
    .price-box {
        background: linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.primaryDark} 100%);
        border-radius: 12px;
        padding: 24px;
        text-align: center;
        margin-bottom: 24px;
    }
    .price-label {
        color: rgba(255,255,255,0.9);
        font-size: 14px;
        margin-bottom: 8px;
    }
    .price-value {
        color: ${brandColors.white};
        font-size: 48px;
        font-weight: 800;
    }
    .price-note {
        color: rgba(255,255,255,0.7);
        font-size: 12px;
        margin-top: 8px;
    }
    .cta-button {
        display: inline-block;
        background-color: ${brandColors.accent};
        color: ${brandColors.navy};
        font-weight: 700;
        text-decoration: none;
        padding: 16px 32px;
        border-radius: 8px;
        font-size: 16px;
    }
    .next-steps {
        background-color: #ecfdf5;
        border-left: 4px solid #10b981;
        padding: 16px;
        border-radius: 0 8px 8px 0;
        margin-bottom: 24px;
    }
    .next-steps h3 {
        color: #065f46;
        font-size: 14px;
        font-weight: 700;
        margin: 0 0 8px 0;
    }
    .next-steps ul {
        color: #047857;
        font-size: 13px;
        margin: 0;
        padding-left: 20px;
    }
    .next-steps li {
        margin-bottom: 4px;
    }
    .footer {
        background-color: ${brandColors.navy};
        padding: 24px;
        text-align: center;
    }
    .footer p {
        color: rgba(255,255,255,0.7);
        font-size: 13px;
        margin: 4px 0;
    }
    .footer a {
        color: ${brandColors.accent};
        text-decoration: none;
    }
    .footer .company-name {
        color: ${brandColors.white};
        font-weight: 700;
        font-size: 14px;
    }
    .services-list {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .services-list li {
        padding: 8px 0;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
    }
    .services-list li:last-child {
        border-bottom: none;
    }
`;

interface OfferteData {
    name: string;
    email: string;
    phone: string;
    postcode: string;
    propertyType: string;
    services: { name: string; price: number }[];
    totalPrice: number;
    preferredDate?: string;
    notes?: string;
}

interface ContactData {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    city?: string;
    message: string;
}

export function generateOfferteEmailForCustomer(data: OfferteData): string {
    const propertyTypeNames: Record<string, string> = {
        'rijtjeshuis': 'Rijtjeshuis',
        '2onder1kap': '2-onder-1-kap woning',
        'vrijstaand': 'Vrijstaande woning',
    };

    const servicesHtml = data.services.map(s => `
        <li>
            <span>${s.name}</span>
            <span style="color: ${brandColors.primary}; font-weight: 600;">€${s.price}</span>
        </li>
    `).join('');

    return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Je offerte-aanvraag bij John's Glazenwassersbedrijf</title>
    <style>${baseStyles}</style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>John's Glazenwassersbedrijf<span>.</span></h1>
        </div>

        <div class="content">
            <p class="greeting">Beste ${data.name},</p>

            <p class="intro">
                Bedankt voor je offerte-aanvraag! We hebben je gegevens ontvangen en nemen zo snel mogelijk contact met je op om de details te bespreken.
            </p>

            <div class="price-box">
                <p class="price-label">Geschatte prijs</p>
                <p class="price-value">€${data.totalPrice}</p>
                <p class="price-note">Vrijblijvend - exacte prijs na inspectie ter plaatse</p>
            </div>

            <div class="details-box">
                <h2>Jouw gegevens</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr class="detail-row">
                        <td class="detail-label">Naam</td>
                        <td class="detail-value">${data.name}</td>
                    </tr>
                    <tr class="detail-row">
                        <td class="detail-label">E-mail</td>
                        <td class="detail-value">${data.email}</td>
                    </tr>
                    <tr class="detail-row">
                        <td class="detail-label">Telefoon</td>
                        <td class="detail-value">${data.phone}</td>
                    </tr>
                    <tr class="detail-row">
                        <td class="detail-label">Postcode</td>
                        <td class="detail-value">${data.postcode}</td>
                    </tr>
                    <tr class="detail-row">
                        <td class="detail-label">Type woning</td>
                        <td class="detail-value">${propertyTypeNames[data.propertyType] || data.propertyType}</td>
                    </tr>
                    ${data.preferredDate ? `
                    <tr class="detail-row">
                        <td class="detail-label">Voorkeursdatum</td>
                        <td class="detail-value">${data.preferredDate}</td>
                    </tr>
                    ` : ''}
                </table>
            </div>

            <div class="details-box">
                <h2>Geselecteerde diensten</h2>
                <ul class="services-list">
                    ${servicesHtml}
                </ul>
            </div>

            ${data.notes ? `
            <div class="details-box">
                <h2>Opmerkingen</h2>
                <p style="margin: 0; color: ${brandColors.gray};">${data.notes}</p>
            </div>
            ` : ''}

            <div class="next-steps">
                <h3>Wat gebeurt er nu?</h3>
                <ul>
                    <li>We nemen binnen 24 uur contact met je op</li>
                    <li>We plannen een moment in om de klus te bekijken</li>
                    <li>Je ontvangt een definitieve offerte</li>
                    <li>Geen verplichtingen - volledig vrijblijvend</li>
                </ul>
            </div>

            <p style="text-align: center; margin-top: 32px;">
                <a href="tel:0623545276" class="cta-button">
                    Bel ons: 06 23545276
                </a>
            </p>
        </div>

        <div class="footer">
            <p class="company-name">John's Glazenwassersbedrijf</p>
            <p>De glazenwasser uit de Betuwe met een persoonlijke benadering</p>
            <p><a href="tel:0623545276">06 23545276</a> | <a href="mailto:info@johnsglazenwassersbedrijf.nl">info@johnsglazenwassersbedrijf.nl</a></p>
            <p style="margin-top: 16px; font-size: 11px;">VCA Gecertificeerd | Sinds 2007</p>
        </div>
    </div>
</body>
</html>
    `;
}

export function generateOfferteEmailForBusiness(data: OfferteData): string {
    const propertyTypeNames: Record<string, string> = {
        'rijtjeshuis': 'Rijtjeshuis',
        '2onder1kap': '2-onder-1-kap woning',
        'vrijstaand': 'Vrijstaande woning',
    };

    const servicesHtml = data.services.map(s => `
        <li>
            <span>${s.name}</span>
            <span style="color: ${brandColors.primary}; font-weight: 600;">€${s.price}</span>
        </li>
    `).join('');

    return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nieuwe offerte-aanvraag</title>
    <style>${baseStyles}</style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Nieuwe Offerte-aanvraag<span>!</span></h1>
        </div>

        <div class="content">
            <p class="greeting">Nieuwe aanvraag ontvangen</p>

            <p class="intro">
                Er is een nieuwe offerte-aanvraag binnengekomen via de website.
            </p>

            <div class="price-box">
                <p class="price-label">Geschatte prijs</p>
                <p class="price-value">€${data.totalPrice}</p>
            </div>

            <div class="details-box">
                <h2>Klantgegevens</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr class="detail-row">
                        <td class="detail-label">Naam</td>
                        <td class="detail-value">${data.name}</td>
                    </tr>
                    <tr class="detail-row">
                        <td class="detail-label">E-mail</td>
                        <td class="detail-value"><a href="mailto:${data.email}">${data.email}</a></td>
                    </tr>
                    <tr class="detail-row">
                        <td class="detail-label">Telefoon</td>
                        <td class="detail-value"><a href="tel:${data.phone}">${data.phone}</a></td>
                    </tr>
                    <tr class="detail-row">
                        <td class="detail-label">Postcode</td>
                        <td class="detail-value">${data.postcode}</td>
                    </tr>
                    <tr class="detail-row">
                        <td class="detail-label">Type woning</td>
                        <td class="detail-value">${propertyTypeNames[data.propertyType] || data.propertyType}</td>
                    </tr>
                    ${data.preferredDate ? `
                    <tr class="detail-row">
                        <td class="detail-label">Voorkeursdatum</td>
                        <td class="detail-value">${data.preferredDate}</td>
                    </tr>
                    ` : ''}
                </table>
            </div>

            <div class="details-box">
                <h2>Geselecteerde diensten</h2>
                <ul class="services-list">
                    ${servicesHtml}
                </ul>
            </div>

            ${data.notes ? `
            <div class="details-box">
                <h2>Opmerkingen van klant</h2>
                <p style="margin: 0; color: ${brandColors.gray};">${data.notes}</p>
            </div>
            ` : ''}

            <p style="text-align: center; margin-top: 32px;">
                <a href="tel:${data.phone}" class="cta-button">
                    Bel klant direct
                </a>
            </p>
        </div>

        <div class="footer">
            <p class="company-name">John's Glazenwassersbedrijf</p>
            <p>Automatisch verzonden via de website</p>
        </div>
    </div>
</body>
</html>
    `;
}

export function generateContactEmailForCustomer(data: ContactData): string {
    return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bedankt voor je bericht - John's Glazenwassersbedrijf</title>
    <style>${baseStyles}</style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>John's Glazenwassersbedrijf<span>.</span></h1>
        </div>

        <div class="content">
            <p class="greeting">Beste ${data.firstName},</p>

            <p class="intro">
                Bedankt voor je bericht! We hebben je vraag ontvangen en nemen zo snel mogelijk contact met je op.
            </p>

            <div class="details-box">
                <h2>Jouw bericht</h2>
                <p style="margin: 0; color: ${brandColors.gray}; white-space: pre-wrap;">${data.message}</p>
            </div>

            <div class="next-steps">
                <h3>Wat gebeurt er nu?</h3>
                <ul>
                    <li>We lezen je bericht zorgvuldig door</li>
                    <li>We nemen binnen 24 uur contact met je op</li>
                    <li>Bij spoed kun je ons altijd bellen</li>
                </ul>
            </div>

            <p style="text-align: center; margin-top: 32px;">
                <a href="tel:0623545276" class="cta-button">
                    Bel ons: 06 23545276
                </a>
            </p>
        </div>

        <div class="footer">
            <p class="company-name">John's Glazenwassersbedrijf</p>
            <p>De glazenwasser uit de Betuwe met een persoonlijke benadering</p>
            <p><a href="tel:0623545276">06 23545276</a> | <a href="mailto:info@johnsglazenwassersbedrijf.nl">info@johnsglazenwassersbedrijf.nl</a></p>
            <p style="margin-top: 16px; font-size: 11px;">VCA Gecertificeerd | Sinds 2007</p>
        </div>
    </div>
</body>
</html>
    `;
}

export function generateContactEmailForBusiness(data: ContactData): string {
    return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nieuw contactformulier bericht</title>
    <style>${baseStyles}</style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Nieuw Contactbericht<span>!</span></h1>
        </div>

        <div class="content">
            <p class="greeting">Nieuw bericht ontvangen</p>

            <p class="intro">
                Er is een nieuw bericht binnengekomen via het contactformulier op de website.
            </p>

            <div class="details-box">
                <h2>Contactgegevens</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr class="detail-row">
                        <td class="detail-label">Naam</td>
                        <td class="detail-value">${data.firstName} ${data.lastName}</td>
                    </tr>
                    <tr class="detail-row">
                        <td class="detail-label">E-mail</td>
                        <td class="detail-value"><a href="mailto:${data.email}">${data.email}</a></td>
                    </tr>
                    ${data.phone ? `
                    <tr class="detail-row">
                        <td class="detail-label">Telefoon</td>
                        <td class="detail-value"><a href="tel:${data.phone}">${data.phone}</a></td>
                    </tr>
                    ` : ''}
                    ${data.city ? `
                    <tr class="detail-row">
                        <td class="detail-label">Woonplaats</td>
                        <td class="detail-value">${data.city}</td>
                    </tr>
                    ` : ''}
                </table>
            </div>

            <div class="details-box">
                <h2>Bericht</h2>
                <p style="margin: 0; color: ${brandColors.gray}; white-space: pre-wrap;">${data.message}</p>
            </div>

            <p style="text-align: center; margin-top: 32px;">
                <a href="mailto:${data.email}" class="cta-button">
                    Beantwoord bericht
                </a>
            </p>
        </div>

        <div class="footer">
            <p class="company-name">John's Glazenwassersbedrijf</p>
            <p>Automatisch verzonden via de website</p>
        </div>
    </div>
</body>
</html>
    `;
}
