module.exports = {
    secret: require('crypto').randomBytes(64).toString('hex'),
    jwtExpiration: 86400,           // 24 hour
    jwtRefreshExpiration: '7d',   // 7 days
    Payment_Provider_20: [
        "Caisse Epargne",
        "Credit Agricole",
        "BNP",
        "LCL",
        "La Poste",
        " Societe Generale",
        "BRED",
        "Banque Populaire",
        "HSBC",
        "Banque Populaire",
        "Credit Mutuel"
    ],
    payment_Provider_80: [
        "N26",
        "Boursorama",
        "ING",
        "Fortuneo",
        "Amazon Pay",
        "Apple Pay",
        "Atos",
        "Authorize.Net",
        "Ingenico",
        "Klarna",
        "Paypal",
        "Stripe",
        "Trustly",
        "Revolut"
    ],
    card_Nationality_30: [
        "BE", "EL", "LT", "PT", "BG", "UK", "ES", "LU", "RO", "CZ", "FR", "HU", "SI", "DK", "HR", "MT", "SK", "DE", "IT", "NL", "FI", "EE", "CY", "AT", "SE", "IE", "LV", "PL", "NO", "CH", "LI", "IS"
    ],
    card_Nationality_40: [
        "AL", "ME", "RS", "MK", "TR", "BA", "XK", "AM", "BY", "GE", "AZ", "MD", "UA"
    ],
    card_Nationality_20: [
        "DZ", "LB", "SY", "EG", "LY", "TN", "IL", "MA", "JO", "PS"
    ],
    card_Nationality_10: ["RU"],
    delivery_options: ["Standard", "Priority", "Express"],
    delivery_places: ["collection_point", "home", "shop"],
    delivery_companies: [
        "Colissimo",
        "Chronospost",
        "DPD",
        "Mondial Relay",
        "DHL",
        "FedEx",
        "UPS",
        "GLS",
        "DB Schenker",
        "Whistl",
        "Heyworld",
        "Omniva",
        " Direct Link",
        "Bpost",
        "BRT",
        "Asendia",
        "PostNL",
        " Hermes UK",
        "Royal Mail"
    ],

    options: {
        'method': process.env.URI_METHOD,
        'url': 'http://api.3geonames.org/randomland.fr.json',
        'headers': {
        }
    }
};