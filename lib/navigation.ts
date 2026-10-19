export interface NavLink {
  label: string;
  href: string;
}

export const primaryNav: NavLink[] = [
  { label: "Preise", href: "/preise/" },
  { label: "Goldrechner", href: "/goldrechner/" },
  { label: "So funktioniert’s", href: "/so-funktionierts/" },
  { label: "Über uns", href: "/about/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Kontakt", href: "/contact/" },
];

export const serviceNav: NavLink[] = [
  { label: "Versandtasche anfordern", href: "/versandtasche/" },
  { label: "Selbst versenden", href: "/selbstversand/" },
  { label: "So funktioniert’s", href: "/so-funktionierts/" },
  { label: "Edelmetallpreise", href: "/preise/" },
  { label: "Goldrechner", href: "/goldrechner/" },
];

export const companyNav: NavLink[] = [
  { label: "Über uns", href: "/about/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Kontakt", href: "/contact/" },
  { label: "Blog", href: "/blog/" },
  { label: "Standorte", href: "/standorte/" },
];

export const legalNav: NavLink[] = [
  { label: "Impressum", href: "/impressum/" },
  { label: "AGB", href: "/agb/" },
  { label: "Datenschutz", href: "/datenschutz/" },
];
