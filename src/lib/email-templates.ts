// Branded email templates for John's Glazenwassersbedrijf
// Colors match the website - Sky Blue primary, Yellow accent
// Uses inline styles for iOS Mail compatibility (iOS strips <style> tags)

const brandColors = {
    primary: '#0EA5E9',    // Sky Blue 500 - matches website
    primaryDark: '#0284C7', // Sky Blue 600 - matches website
    navy: '#0f172a',
    accent: '#FACC15',      // Yellow 400 - matches website
    gray: '#6b7280',
    lightGray: '#f3f4f6',
    white: '#ffffff',
};

// Dark mode prevention styles for iOS Mail
// iOS Mail auto-darkens emails; these meta tags and styles prevent that
const darkModePrevention = `
    :root { color-scheme: light only; supported-color-schemes: light only; }
    body, .email-body { background-color: ${brandColors.lightGray} !important; }
    .header-bg { background-color: ${brandColors.primary} !important; }
    .price-bg { background-color: ${brandColors.primary} !important; }
    .footer-bg { background-color: ${brandColors.navy} !important; }
    .cta-bg { background-color: ${brandColors.accent} !important; }
`;

const emailHead = (title: string) => `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light only">
    <meta name="supported-color-schemes" content="light only">
    <meta name="x-apple-disable-message-reformatting">
    <title>${title}</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        ${darkModePrevention}
        @media (prefers-color-scheme: dark) {
            .email-body { background-color: ${brandColors.lightGray} !important; }
            .header-bg { background-color: ${brandColors.primary} !important; }
            .price-bg { background-color: ${brandColors.primary} !important; }
            .footer-bg { background-color: ${brandColors.navy} !important; }
        }
    </style>
`;

// Common inline styles for iOS compatibility
const styles = {
    body: `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: ${brandColors.navy}; margin: 0; padding: 0; background-color: ${brandColors.lightGray};`,
    container: `max-width: 600px; margin: 0 auto; background-color: ${brandColors.white};`,
    header: `background-color: ${brandColors.primary}; padding: 32px 24px; text-align: center;`,
    headerTitle: `color: ${brandColors.white}; font-size: 24px; font-weight: 800; margin: 0;`,
    headerAccent: `color: ${brandColors.accent};`,
    content: `padding: 32px 24px;`,
    greeting: `font-size: 20px; font-weight: 700; color: ${brandColors.navy}; margin-bottom: 16px;`,
    intro: `color: ${brandColors.gray}; margin-bottom: 24px;`,
    detailsBox: `background-color: ${brandColors.lightGray}; border-radius: 12px; padding: 24px; margin-bottom: 24px;`,
    detailsBoxH2: `font-size: 16px; font-weight: 700; color: ${brandColors.navy}; margin: 0 0 16px 0; padding-bottom: 12px; border-bottom: 2px solid ${brandColors.primary};`,
    detailRow: `padding: 8px 0; border-bottom: 1px solid #e5e7eb;`,
    detailRowLast: `padding: 8px 0;`,
    detailLabel: `color: ${brandColors.gray}; font-size: 14px;`,
    detailValue: `color: ${brandColors.navy}; font-weight: 600; font-size: 14px;`,
    priceBox: `background-color: ${brandColors.primary}; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;`,
    priceLabel: `color: rgba(255,255,255,0.9); font-size: 14px; margin: 0 0 8px 0;`,
    priceValue: `color: ${brandColors.white}; font-size: 48px; font-weight: 800; margin: 0;`,
    priceNote: `color: rgba(255,255,255,0.7); font-size: 12px; margin: 8px 0 0 0;`,
    ctaButton: `display: inline-block; background-color: ${brandColors.accent}; color: ${brandColors.navy}; font-weight: 700; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px;`,
    nextSteps: `background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 16px; border-radius: 0 8px 8px 0; margin-bottom: 24px;`,
    nextStepsH3: `color: #065f46; font-size: 14px; font-weight: 700; margin: 0 0 8px 0;`,
    nextStepsUl: `color: #047857; font-size: 13px; margin: 0; padding-left: 20px;`,
    nextStepsLi: `margin-bottom: 4px;`,
    footer: `background-color: ${brandColors.navy}; padding: 24px; text-align: center;`,
    footerP: `color: rgba(255,255,255,0.7); font-size: 13px; margin: 4px 0;`,
    footerLink: `color: ${brandColors.accent}; text-decoration: none;`,
    footerCompany: `color: ${brandColors.white}; font-weight: 700; font-size: 14px; margin: 4px 0;`,
    servicesList: `margin: 0; padding: 0; list-style: none;`,
    servicesListItem: `padding: 8px 0; border-bottom: 1px solid #e5e7eb;`,
    servicesListItemLast: `padding: 8px 0;`,
    table: `width: 100%; border-collapse: collapse;`,
};

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

    const servicesHtml = data.services.map((s, i, arr) => `
        <tr style="${i === arr.length - 1 ? styles.servicesListItemLast : styles.servicesListItem}">
            <td style="color: ${brandColors.navy};">${s.name}</td>
            <td style="color: ${brandColors.primary}; font-weight: 600; text-align: right;">€${s.price}</td>
        </tr>
    `).join('');

    return `
<!DOCTYPE html>
<html lang="nl" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    ${emailHead("Je offerte-aanvraag bij John's Glazenwassersbedrijf")}
</head>
<body class="email-body" style="${styles.body}">
    <div style="${styles.container}">
        <div class="header-bg" style="${styles.header}">
            <h1 style="${styles.headerTitle}">John's Glazenwassersbedrijf<span style="${styles.headerAccent}">.</span></h1>
        </div>

        <div style="${styles.content}">
            <p style="${styles.greeting}">Beste ${data.name},</p>

            <p style="${styles.intro}">
                Bedankt voor je offerte-aanvraag! We hebben je gegevens ontvangen en nemen zo snel mogelijk contact met je op om de details te bespreken.
            </p>

            <div class="price-bg" style="${styles.priceBox}">
                <p style="${styles.priceLabel}">Geschatte prijs</p>
                <p style="${styles.priceValue}">€${data.totalPrice}</p>
                <p style="${styles.priceNote}">Vrijblijvend - exacte prijs na inspectie ter plaatse</p>
            </div>

            <div style="${styles.detailsBox}">
                <h2 style="${styles.detailsBoxH2}">Jouw gegevens</h2>
                <table style="${styles.table}">
                    <tr style="${styles.detailRow}">
                        <td style="${styles.detailLabel}">Naam</td>
                        <td style="${styles.detailValue}">${data.name}</td>
                    </tr>
                    <tr style="${styles.detailRow}">
                        <td style="${styles.detailLabel}">E-mail</td>
                        <td style="${styles.detailValue}">${data.email}</td>
                    </tr>
                    <tr style="${styles.detailRow}">
                        <td style="${styles.detailLabel}">Telefoon</td>
                        <td style="${styles.detailValue}">${data.phone}</td>
                    </tr>
                    <tr style="${styles.detailRow}">
                        <td style="${styles.detailLabel}">Postcode</td>
                        <td style="${styles.detailValue}">${data.postcode}</td>
                    </tr>
                    <tr style="${data.preferredDate ? styles.detailRow : styles.detailRowLast}">
                        <td style="${styles.detailLabel}">Type woning</td>
                        <td style="${styles.detailValue}">${propertyTypeNames[data.propertyType] || data.propertyType}</td>
                    </tr>
                    ${data.preferredDate ? `
                    <tr style="${styles.detailRowLast}">
                        <td style="${styles.detailLabel}">Voorkeursdatum</td>
                        <td style="${styles.detailValue}">${data.preferredDate}</td>
                    </tr>
                    ` : ''}
                </table>
            </div>

            <div style="${styles.detailsBox}">
                <h2 style="${styles.detailsBoxH2}">Geselecteerde diensten</h2>
                <table style="${styles.table}">
                    ${servicesHtml}
                </table>
            </div>

            ${data.notes ? `
            <div style="${styles.detailsBox}">
                <h2 style="${styles.detailsBoxH2}">Opmerkingen</h2>
                <p style="margin: 0; color: ${brandColors.gray};">${data.notes}</p>
            </div>
            ` : ''}

            <div style="${styles.nextSteps}">
                <h3 style="${styles.nextStepsH3}">Wat gebeurt er nu?</h3>
                <ul style="${styles.nextStepsUl}">
                    <li style="${styles.nextStepsLi}">We nemen binnen 24 uur contact met je op</li>
                    <li style="${styles.nextStepsLi}">We plannen een moment in om de klus te bekijken</li>
                    <li style="${styles.nextStepsLi}">Je ontvangt een definitieve offerte</li>
                    <li style="${styles.nextStepsLi}">Geen verplichtingen - volledig vrijblijvend</li>
                </ul>
            </div>

            <p style="text-align: center; margin-top: 32px;">
                <a href="tel:0623545276" class="cta-bg" style="${styles.ctaButton}">
                    Bel ons: 06 23545276
                </a>
            </p>
        </div>

        <div class="footer-bg" style="${styles.footer}">
            <p style="${styles.footerCompany}">John's Glazenwassersbedrijf</p>
            <p style="${styles.footerP}">De glazenwasser uit de Betuwe met een persoonlijke benadering</p>
            <p style="${styles.footerP}"><a href="tel:0623545276" style="${styles.footerLink}">06 23545276</a> | <a href="mailto:info@johnsglazenwassersbedrijf.nl" style="${styles.footerLink}">info@johnsglazenwassersbedrijf.nl</a></p>
            <p style="${styles.footerP} margin-top: 16px; font-size: 11px;">VCA Gecertificeerd | Sinds 2007</p>
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

    const servicesHtml = data.services.map((s, i, arr) => `
        <tr style="${i === arr.length - 1 ? styles.servicesListItemLast : styles.servicesListItem}">
            <td style="color: ${brandColors.navy};">${s.name}</td>
            <td style="color: ${brandColors.primary}; font-weight: 600; text-align: right;">€${s.price}</td>
        </tr>
    `).join('');

    return `
<!DOCTYPE html>
<html lang="nl" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    ${emailHead("Nieuwe offerte-aanvraag")}
</head>
<body class="email-body" style="${styles.body}">
    <div style="${styles.container}">
        <div class="header-bg" style="${styles.header}">
            <h1 style="${styles.headerTitle}">Nieuwe Offerte-aanvraag<span style="${styles.headerAccent}">!</span></h1>
        </div>

        <div style="${styles.content}">
            <p style="${styles.greeting}">Nieuwe aanvraag ontvangen</p>

            <p style="${styles.intro}">
                Er is een nieuwe offerte-aanvraag binnengekomen via de website.
            </p>

            <div class="price-bg" style="${styles.priceBox}">
                <p style="${styles.priceLabel}">Geschatte prijs</p>
                <p style="${styles.priceValue}">€${data.totalPrice}</p>
            </div>

            <div style="${styles.detailsBox}">
                <h2 style="${styles.detailsBoxH2}">Klantgegevens</h2>
                <table style="${styles.table}">
                    <tr style="${styles.detailRow}">
                        <td style="${styles.detailLabel}">Naam</td>
                        <td style="${styles.detailValue}">${data.name}</td>
                    </tr>
                    <tr style="${styles.detailRow}">
                        <td style="${styles.detailLabel}">E-mail</td>
                        <td style="${styles.detailValue}"><a href="mailto:${data.email}" style="color: ${brandColors.primary};">${data.email}</a></td>
                    </tr>
                    <tr style="${styles.detailRow}">
                        <td style="${styles.detailLabel}">Telefoon</td>
                        <td style="${styles.detailValue}"><a href="tel:${data.phone}" style="color: ${brandColors.primary};">${data.phone}</a></td>
                    </tr>
                    <tr style="${styles.detailRow}">
                        <td style="${styles.detailLabel}">Postcode</td>
                        <td style="${styles.detailValue}">${data.postcode}</td>
                    </tr>
                    <tr style="${data.preferredDate ? styles.detailRow : styles.detailRowLast}">
                        <td style="${styles.detailLabel}">Type woning</td>
                        <td style="${styles.detailValue}">${propertyTypeNames[data.propertyType] || data.propertyType}</td>
                    </tr>
                    ${data.preferredDate ? `
                    <tr style="${styles.detailRowLast}">
                        <td style="${styles.detailLabel}">Voorkeursdatum</td>
                        <td style="${styles.detailValue}">${data.preferredDate}</td>
                    </tr>
                    ` : ''}
                </table>
            </div>

            <div style="${styles.detailsBox}">
                <h2 style="${styles.detailsBoxH2}">Geselecteerde diensten</h2>
                <table style="${styles.table}">
                    ${servicesHtml}
                </table>
            </div>

            ${data.notes ? `
            <div style="${styles.detailsBox}">
                <h2 style="${styles.detailsBoxH2}">Opmerkingen van klant</h2>
                <p style="margin: 0; color: ${brandColors.gray};">${data.notes}</p>
            </div>
            ` : ''}

            <p style="text-align: center; margin-top: 32px;">
                <a href="tel:${data.phone}" class="cta-bg" style="${styles.ctaButton}">
                    Bel klant direct
                </a>
            </p>
        </div>

        <div class="footer-bg" style="${styles.footer}">
            <p style="${styles.footerCompany}">John's Glazenwassersbedrijf</p>
            <p style="${styles.footerP}">Automatisch verzonden via de website</p>
        </div>
    </div>
</body>
</html>
    `;
}

export function generateContactEmailForCustomer(data: ContactData): string {
    return `
<!DOCTYPE html>
<html lang="nl" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    ${emailHead("Bedankt voor je bericht - John's Glazenwassersbedrijf")}
</head>
<body class="email-body" style="${styles.body}">
    <div style="${styles.container}">
        <div class="header-bg" style="${styles.header}">
            <h1 style="${styles.headerTitle}">John's Glazenwassersbedrijf<span style="${styles.headerAccent}">.</span></h1>
        </div>

        <div style="${styles.content}">
            <p style="${styles.greeting}">Beste ${data.firstName},</p>

            <p style="${styles.intro}">
                Bedankt voor je bericht! We hebben je vraag ontvangen en nemen zo snel mogelijk contact met je op.
            </p>

            <div style="${styles.detailsBox}">
                <h2 style="${styles.detailsBoxH2}">Jouw bericht</h2>
                <p style="margin: 0; color: ${brandColors.gray}; white-space: pre-wrap;">${data.message}</p>
            </div>

            <div style="${styles.nextSteps}">
                <h3 style="${styles.nextStepsH3}">Wat gebeurt er nu?</h3>
                <ul style="${styles.nextStepsUl}">
                    <li style="${styles.nextStepsLi}">We lezen je bericht zorgvuldig door</li>
                    <li style="${styles.nextStepsLi}">We nemen binnen 24 uur contact met je op</li>
                    <li style="${styles.nextStepsLi}">Bij spoed kun je ons altijd bellen</li>
                </ul>
            </div>

            <p style="text-align: center; margin-top: 32px;">
                <a href="tel:0623545276" class="cta-bg" style="${styles.ctaButton}">
                    Bel ons: 06 23545276
                </a>
            </p>
        </div>

        <div class="footer-bg" style="${styles.footer}">
            <p style="${styles.footerCompany}">John's Glazenwassersbedrijf</p>
            <p style="${styles.footerP}">De glazenwasser uit de Betuwe met een persoonlijke benadering</p>
            <p style="${styles.footerP}"><a href="tel:0623545276" style="${styles.footerLink}">06 23545276</a> | <a href="mailto:info@johnsglazenwassersbedrijf.nl" style="${styles.footerLink}">info@johnsglazenwassersbedrijf.nl</a></p>
            <p style="${styles.footerP} margin-top: 16px; font-size: 11px;">VCA Gecertificeerd | Sinds 2007</p>
        </div>
    </div>
</body>
</html>
    `;
}

export function generateContactEmailForBusiness(data: ContactData): string {
    const hasPhone = !!data.phone;
    const hasCity = !!data.city;

    return `
<!DOCTYPE html>
<html lang="nl" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    ${emailHead("Nieuw contactformulier bericht")}
</head>
<body class="email-body" style="${styles.body}">
    <div style="${styles.container}">
        <div class="header-bg" style="${styles.header}">
            <h1 style="${styles.headerTitle}">Nieuw Contactbericht<span style="${styles.headerAccent}">!</span></h1>
        </div>

        <div style="${styles.content}">
            <p style="${styles.greeting}">Nieuw bericht ontvangen</p>

            <p style="${styles.intro}">
                Er is een nieuw bericht binnengekomen via het contactformulier op de website.
            </p>

            <div style="${styles.detailsBox}">
                <h2 style="${styles.detailsBoxH2}">Contactgegevens</h2>
                <table style="${styles.table}">
                    <tr style="${styles.detailRow}">
                        <td style="${styles.detailLabel}">Naam</td>
                        <td style="${styles.detailValue}">${data.firstName} ${data.lastName}</td>
                    </tr>
                    <tr style="${!hasPhone && !hasCity ? styles.detailRowLast : styles.detailRow}">
                        <td style="${styles.detailLabel}">E-mail</td>
                        <td style="${styles.detailValue}"><a href="mailto:${data.email}" style="color: ${brandColors.primary};">${data.email}</a></td>
                    </tr>
                    ${data.phone ? `
                    <tr style="${!hasCity ? styles.detailRowLast : styles.detailRow}">
                        <td style="${styles.detailLabel}">Telefoon</td>
                        <td style="${styles.detailValue}"><a href="tel:${data.phone}" style="color: ${brandColors.primary};">${data.phone}</a></td>
                    </tr>
                    ` : ''}
                    ${data.city ? `
                    <tr style="${styles.detailRowLast}">
                        <td style="${styles.detailLabel}">Woonplaats</td>
                        <td style="${styles.detailValue}">${data.city}</td>
                    </tr>
                    ` : ''}
                </table>
            </div>

            <div style="${styles.detailsBox}">
                <h2 style="${styles.detailsBoxH2}">Bericht</h2>
                <p style="margin: 0; color: ${brandColors.gray}; white-space: pre-wrap;">${data.message}</p>
            </div>

            <p style="text-align: center; margin-top: 32px;">
                <a href="mailto:${data.email}" class="cta-bg" style="${styles.ctaButton}">
                    Beantwoord bericht
                </a>
            </p>
        </div>

        <div class="footer-bg" style="${styles.footer}">
            <p style="${styles.footerCompany}">John's Glazenwassersbedrijf</p>
            <p style="${styles.footerP}">Automatisch verzonden via de website</p>
        </div>
    </div>
</body>
</html>
    `;
}
