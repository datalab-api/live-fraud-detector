const fs = require('fs');
const path = require('path');
const cert = path.join(__dirname, '../../certs/admin-temp.key') || process.env.SECRET_APP;
module.exports = {
    secret: fs.readFileSync(cert),
    jwtExpiration: 1800,           // 24 hour
    jwtRefreshExpiration: '1h',   // 7 days
    payment_provider1: [
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
    payment_provider2: [
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
    card_nationality1: [
        "BE", "LT", "PT", "BG", "UK", "ES", "LU", "RO", "CZ", "FR", "HU", "SI", "DK", "HR", "MT", "SK", "DE", "IT", "NL", "FI", "EE", "CY", "AT", "SE", "IE", "LV", "PL", "NO", "CH", "LI", "IS"
    ],
    card_nationality2: [
        "AL", "ME", "RS", "MK", "TR", "BA", "AM", "BY", "GE", "AZ", "MD", "UA"
    ],
    card_nationality3: [
        "DZ", "LB", "SY", "EG", "LY", "TN", "IL", "MA", "JO", "PS"
    ],
    card_nationality4: "RU",
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
    },
    list_countries : [
        {code:"BE", faker: "fr_BE"},
        {code:"EL", faker: "el"},
        {code:"LT", faker: "en"},
        {code:"PT", faker: "pt_PT"},
        {code:"BG", faker: "en"},        
        {code:"UK", faker: "uk"},
        {code:"ES", faker: "es"},
        {code:"LU", faker: "en"},
        {code:"RO", faker: "ro"},
        {code:"CZ", faker: "cz"},
        {code:"FR", faker: "fr"},
        {code:"HU", faker: "hu"},
        {code:"SI", faker: "en"},
        {code:"DK", faker: "en"},
        {code:"HR", faker: "hr"},
        {code:"MT", faker: "en"},
        {code:"SK", faker: "sk"},
        {code:"DE", faker: "de"},
        {code:"IT", faker: "it"},
        {code:"NL", faker: "nl"},
        {code:"FI", faker: "fi"},
        {code:"EE", faker: "en"},
        {code:"CY", faker: "en"},
        {code:"AT", faker: "en"},
        {code:"SE", faker: "en"},
        {code:"IE", faker: "en"},
        {code:"LV", faker: "lv"},
        {code:"PL", faker: "pl"},
        {code:"NO", faker: "nb_NO"},
        {code:"CH", faker: "en"},
        {code:"LI", faker: "en"},
        {code:"IS", faker: "en"},
        {code:"AL", faker: "en"},
        {code:"ME", faker: "en"},
        {code:"RS", faker: "en"},
        {code:"MK", faker: "mk"},
        {code:"TR", faker: "tr"},
        {code:"BA", faker: "en"},
        {code:"XK", faker: "en"},
        {code:"AM", faker: "en"},
        {code:"BY", faker: "en"},
        {code:"GE", faker: "ge"},
        {code:"AZ", faker: "az"},
        {code:"MD", faker: "en"},
        {code:"UA", faker: "en"},
        {code:"DZ", faker: "en"},
        {code:"LB", faker: "en"},
        {code:"SY", faker: "en"},
        {code:"EG", faker: "en"},
        {code:"LY", faker: "en"},
        {code:"TN", faker: "en"},
        {code:"IL", faker: "en"},
        {code:"MA", faker: "en"},
        {code:"JO", faker: "en"},
        {code:"PS", faker: "en"},
        {code:"RU", faker: "ge"}
    ]
};