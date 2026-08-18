export const siteConfig = {
  name: "SAŠA KOMERC",
  legalName: "САША КОМЕРЦ ДООЕЛ",
  url: "https://sasakomerc.mk",
  foundedYear: 1992,
  address: {
    street: "ул. 534 бр. 23-1/26, Марино",
    postalCode: "1041",
    city: "Илинден / Скопје",
    country: "Македонија",
    countryCode: "MK",
    full: "ул. 534 бр. 23-1/26, Марино, 1041 Илинден, Скопје, Македонија",
  },
  mapsQuery: "SAŠA KOMERC, Ulica 534 23-1/26, Marino, 1041 Ilinden, Skopje, Macedonia",
  people: {
    sasa: {
      name: "Саша Спасовски",
      phone: "070 220 312",
      phoneIntl: "+38970220312",
      email: "sasha.spasovski@sasakomerc.mk",
      facebook: "https://www.facebook.com/sasha.spasovski",
    },
    marija: {
      name: "Марија Јорданова",
      phone: "071 367 078",
      phoneIntl: "+38971367078",
      email: "marija.jordanova@sasakomerc.mk",
      facebook: "https://www.facebook.com/marija.jordanova.1",
    },
  },
} as const;

export function whatsappLink(phoneIntl: string) {
  return `https://wa.me/${phoneIntl.replace(/[^0-9]/g, "")}`;
}

export function viberLink(phoneIntl: string) {
  return `viber://chat?number=${encodeURIComponent(phoneIntl)}`;
}

export function telLink(phoneIntl: string) {
  return `tel:${phoneIntl}`;
}

export function mapsEmbedUrl() {
  return `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.mapsQuery)}&output=embed`;
}

export function mapsDirectionsUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.mapsQuery)}`;
}
