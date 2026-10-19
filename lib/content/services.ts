import type { StaticImageData } from "next/image";
import { images } from "@/lib/images";
import type { MetalId } from "@/lib/prices/types";
import type { FaqCategoryId } from "./faq";

export interface ServiceSection {
  h2: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Service {
  slug: string;
  path: string;
  navLabel: string;
  symbol: string;
  teaser: string;
  image: StaticImageData;
  imageAlt: string;
  /** Default calculator selection on this page */
  metal: MetalId;
  purity: string;
  meta: { title: string; description: string };
  h1: string;
  lead: string;
  sections: ServiceSection[];
  faq: FaqCategoryId[];
  /** true = URL did not exist on the old site */
  isNew?: boolean;
}

/**
 * Titles, descriptions and H1s are taken over 1:1 from the current site (18.10.2026)
 * to keep rankings stable. Body copy was rewritten for the new design – see
 * docs/SEO-MIGRATION.md for the per-page record.
 */
export const services: Service[] = [
  {
    slug: "goldankauf",
    path: "/goldankauf/",
    navLabel: "Goldankauf",
    symbol: "Au",
    teaser: "Altgold, Bruchgold, Barren und Schmuck – fair bewertet nach Feingehalt.",
    image: images.goldbarrenAusschnitt,
    imageAlt: "Gegossene Feingoldbarren von Argor-Heraeus",
    metal: "gold",
    purity: "585",
    meta: {
      title: "Gold verkaufen in Wiesbaden | Goldankauf Gold Sohn",
      description:
        "Verkaufen Sie Ihr Gold sicher bei Gold Sohn. Ankauf von Altgold, Schmuck, Münzen & Barren zum fairen Tagespreis mit sofortiger Auszahlung.",
    },
    h1: "Gold verkaufen bei Gold Sohn",
    lead: "Altgold, Bruchgold, Goldschmuck, Münzen und Barren: Wir prüfen Ihr Gold professionell und bewerten es auf Basis des aktuellen Goldkurses.",
    sections: [
      {
        h2: "Was ist Gold?",
        paragraphs: [
          "Gold (chemisches Symbol Au) ist ein Edelmetall, das nicht rostet und nicht anläuft. Deshalb behält es über Jahrhunderte seinen Glanz und seinen Wert.",
          "Der Feingehalt wird in Tausendsteln angegeben: 999er Gold ist Feingold, 750er Gold enthält 75 % Gold (18 Karat), 585er Gold 58,5 % (14 Karat) und 333er Gold 33,3 % (8 Karat). Für den Ankaufspreis zählt der reine Goldanteil.",
        ],
      },
      {
        h2: "Wofür wird Gold verwendet?",
        paragraphs: [
          "Gold wird für Schmuck, als Wertanlage in Form von Barren und Münzen, in der Elektronik und in der Zahnmedizin eingesetzt. Altgold wird eingeschmolzen, geschieden und wieder dem Kreislauf zugeführt.",
        ],
      },
      {
        h2: "Welche Gold-Artikel kaufen wir an?",
        paragraphs: ["Wir kaufen Gold in nahezu jeder Form – auch beschädigt, ungestempelt oder ohne Rechnung."],
        bullets: ["Altgold und Bruchgold", "Goldschmuck: Ringe, Ketten, Armbänder, Ohrringe", "Goldmünzen und Goldbarren", "Zahngold", "Golduhren"],
      },
    ],
    faq: ["goldankauf"],
  },
  {
    slug: "silberankauf",
    path: "/silberankauf/",
    navLabel: "Silberankauf",
    symbol: "Ag",
    teaser: "Silberschmuck, Silberbesteck, Münzen und Barren.",
    image: images.silberBarrenMuenzen,
    imageAlt: "Silberbarren, Silbermünzen und Silberschmuck",
    metal: "silber",
    purity: "925",
    meta: {
      title: "Silber verkaufen in Wiesbaden | Silberankauf Gold Sohn",
      description:
        "Silber verkaufen leicht gemacht: Wir kaufen Silberschmuck, Besteck, Münzen & Barren zum fairen Marktpreis. Transparente Bewertung & schnelle Auszahlung.",
    },
    h1: "Silber verkaufen bei Gold Sohn",
    lead: "Vom einzelnen Silberlöffel bis zum kompletten Tafelsilber: Jedes Teil wird nach Gewicht, Legierung und Tageskurs bewertet.",
    sections: [
      {
        h2: "Was ist Silber?",
        paragraphs: [
          "Silber (chemisches Symbol Ag) ist ein weiß glänzendes Edelmetall mit der höchsten elektrischen und thermischen Leitfähigkeit aller Metalle.",
          "Übliche Legierungen sind 925er Sterlingsilber (92,5 % Silber), 835er und 800er Silber, das häufig für Besteck verwendet wurde.",
        ],
      },
      {
        h2: "Wofür wird Silber verwendet?",
        paragraphs: ["Silber steckt in Schmuck und Besteck, in Münzen und Barren sowie in Elektronik und Industrieanwendungen."],
      },
      {
        h2: "Welche Silber-Artikel kaufen wir an?",
        paragraphs: ["Angelaufenes, graviertes oder beschädigtes Silber ist kein Problem – maßgeblich ist der Silbergehalt."],
        bullets: ["Silberbesteck und Tafelsilber", "Silberschmuck", "Silbermünzen", "Silberbarren", "Einzelteile und Erbstücke"],
      },
    ],
    faq: ["silber"],
  },
  {
    slug: "platin-ankauf",
    path: "/platin-ankauf/",
    navLabel: "Platinankauf",
    symbol: "Pt",
    teaser: "Platinschmuck, Platinbarren und Industrieplatin.",
    image: images.platinAusschnitt,
    imageAlt: "Platinbarren 999,5 im Blister",
    metal: "platin",
    purity: "950",
    meta: {
      title: "Platin verkaufen | Platinankauf Gold Sohn",
      description:
        "Platin verkaufen zum aktuellen Marktpreis. Ankauf von Platinschmuck, Barren & Münzen mit transparenter Prüfung und sofortiger Auszahlung.",
    },
    h1: "Platin verkaufen bei Gold Sohn",
    lead: "Platin gehört zu den wertvollsten Edelmetallen. Wir prüfen Platinschmuck, Barren, Münzen und Dentalplatin fachgerecht.",
    sections: [
      {
        h2: "Was ist Platin?",
        paragraphs: [
          "Platin (chemisches Symbol Pt) ist ein sehr dichtes, korrosionsbeständiges Edelmetall. Im Schmuck ist 950er Platin mit 95 % Platinanteil verbreitet.",
        ],
      },
      {
        h2: "Wofür wird Platin verwendet?",
        paragraphs: ["Platin wird in Schmuck, Katalysatoren, Laborgeräten, der Medizintechnik und als Wertanlage in Barren- und Münzform genutzt."],
      },
      {
        h2: "Welche Platin-Artikel kaufen wir an?",
        paragraphs: ["Auch ungestempelte Stücke werden geprüft und bewertet."],
        bullets: ["Platinschmuck und Eheringe", "Platinbarren", "Platinmünzen", "Dentalplatin", "Industrieplatin"],
      },
    ],
    faq: ["platin-palladium"],
  },
  {
    slug: "palladium-ankauf",
    path: "/palladium-ankauf/",
    navLabel: "Palladiumankauf",
    symbol: "Pd",
    teaser: "Palladium in Barrenform, in Legierungen und als Schmuckmetall.",
    image: images.palladiumBarren,
    imageAlt: "Palladiumbarren mit Rohpalladium",
    metal: "palladium",
    purity: "999",
    meta: {
      title: "Palladium verkaufen | Ankauf zum Tagespreis – Gold Sohn",
      description:
        "Palladium verkaufen zum fairen Börsenkurs. Ankauf von Palladiumbarren, Münzen & Legierungen mit transparenter Bewertung.",
    },
    h1: "Palladium verkaufen bei Gold Sohn",
    lead: "Palladium ist ein gefragtes Industriemetall. Wir analysieren den Palladiumanteil genau und vergüten ihn einzeln.",
    sections: [
      {
        h2: "Was ist Palladium?",
        paragraphs: ["Palladium (chemisches Symbol Pd) gehört zur Gruppe der Platinmetalle. Es ist silbrig-weiß und oxidiert kaum."],
      },
      {
        h2: "Wofür wird Palladium verwendet?",
        paragraphs: ["Der größte Teil wird für Abgaskatalysatoren genutzt. Außerdem steckt Palladium in Elektronik, in Dentallegierungen und in Weißgold."],
      },
      {
        h2: "Welche Palladium-Artikel kaufen wir an?",
        paragraphs: ["Platin und Palladium werden getrennt analysiert und einzeln vergütet."],
        bullets: ["Palladiumbarren und -münzen", "Palladium in Weißgold und Schmuck", "Dentallegierungen mit Palladiumanteil", "Industriebauteile"],
      },
    ],
    faq: ["platin-palladium"],
  },
  {
    slug: "zahngold-ankauf",
    path: "/zahngold-ankauf/",
    navLabel: "Zahngoldankauf",
    symbol: "Au",
    teaser: "Zahngold aller Legierungen – auch mit Zahnresten.",
    image: images.goldGeflecht,
    imageAlt: "Feines Goldgeflecht in Nahaufnahme",
    metal: "zahngold",
    purity: "750",
    meta: {
      title: "Zahngold verkaufen in Wiesbaden | Gold Sohn",
      description:
        "Zahngold verkaufen auch ohne Rechnung. Faire Bewertung von Dentalgold & Legierungen mit schneller Auszahlung bei Gold Sohn.",
    },
    h1: "Zahngold verkaufen bei Gold Sohn",
    lead: "Kronen, Brücken und Inlays enthalten oft Gold, Platin und Palladium. Wir berechnen nur den Edelmetallanteil – transparent und diskret.",
    sections: [
      {
        h2: "Was ist Zahngold?",
        paragraphs: [
          "Zahngold ist eine Dentallegierung. Neben Gold enthält sie häufig Platin, Palladium, Silber und Kupfer. Der Goldanteil schwankt je nach Legierung stark.",
        ],
      },
      {
        h2: "Welche Dentalmetalle kaufen wir an?",
        paragraphs: ["Zahngold muss nicht gereinigt sein. Zahn- und Keramikreste werden vor der Berechnung getrennt."],
        bullets: ["Kronen und Brücken", "Inlays und Onlays", "Zahngold mit Zahn- oder Keramikresten", "Dentalplatin und Palladiumlegierungen"],
      },
      {
        h2: "Bewertung von Zahngold",
        paragraphs: [
          "Da sich Dentallegierungen stark unterscheiden, gibt es keinen Pauschalpreis. Nach der Analyse erhalten Sie ein Angebot, das jedes enthaltene Edelmetall berücksichtigt.",
        ],
      },
    ],
    faq: ["zahngold"],
  },
  {
    slug: "schmuck-ankauf",
    path: "/schmuck-ankauf/",
    navLabel: "Schmuckankauf",
    symbol: "Au · Ag",
    teaser: "Ringe, Ketten und Armbänder – auch beschädigt.",
    image: images.goldschmuckSchale,
    imageAlt: "Schale mit Goldschmuck: Ringe, Ketten und Anhänger",
    metal: "gold",
    purity: "585",
    meta: {
      title: "Goldschmuck verkaufen | Schmuckankauf Gold Sohn",
      description:
        "Schmuck verkaufen zum fairen Edelmetallpreis. Ankauf von Gold-, Silber- & Platinschmuck – auch beschädigt – mit Sofortauszahlung.",
    },
    h1: "Schmuck verkaufen bei Gold Sohn",
    lead: "Ob Erbstück, Einzelstück oder defekter Schmuck: Wir bewerten Gold-, Silber- und Platinschmuck nach seinem Edelmetallgehalt.",
    sections: [
      {
        h2: "Schmuck Ankauf – einfach & transparent",
        paragraphs: ["Sie senden Ihren Schmuck ein, wir prüfen Feingehalt und Gewicht und machen Ihnen ein nachvollziehbares Angebot."],
      },
      {
        h2: "Welche Schmuckarten kaufen wir an?",
        paragraphs: ["Der Zustand spielt für den Materialwert keine Rolle."],
        bullets: ["Ringe und Eheringe", "Ketten und Anhänger", "Armbänder und Armreifen", "Ohrringe und Broschen", "Einzelne Ohrringe, gerissene Ketten, Bruchgold"],
      },
      {
        h2: "Wofür wird Schmuck eingeschmolzen?",
        paragraphs: ["Altschmuck wird in einer Scheideanstalt eingeschmolzen und in seine Edelmetalle getrennt. Das zurückgewonnene Gold, Silber oder Platin wird wiederverwendet."],
      },
    ],
    faq: ["goldankauf"],
  },
  {
    slug: "munzen-barren-ankauf",
    path: "/munzen-barren-ankauf/",
    navLabel: "Münzen & Barren",
    symbol: "Au",
    teaser: "Anlagemünzen und Barren aller gängigen Größen.",
    image: images.goldbarrenMuenzen,
    imageAlt: "Goldbarren auf Goldmünzen",
    metal: "gold",
    purity: "999",
    meta: {
      title: "Goldmünzen & Barren verkaufen | Gold Sohn",
      description:
        "Goldmünzen und Barren verkaufen zum aktuellen Tagespreis. Transparente Bewertung, sichere Prüfung und sofortige Auszahlung bei Gold Sohn.",
    },
    h1: "Goldmünzen & Barren verkaufen bei Gold Sohn",
    lead: "Anlagemünzen und Barren werden nach Gewicht, Feingehalt und Tageskurs bewertet. Bei besonderen Münzen prüfen wir zusätzlich den Sammlerwert.",
    sections: [
      {
        h2: "Was sind Goldmünzen & Barren?",
        paragraphs: [
          "Anlagemünzen und Barren bestehen meist aus Feingold (999,9). Sie werden von Münzprägestätten und Scheideanstalten hergestellt und dienen vor allem als Wertanlage.",
        ],
      },
      {
        h2: "Wofür werden sie genutzt?",
        paragraphs: ["Goldmünzen und Barren dienen der Vermögenssicherung. Viele Stücke stammen aus Erbschaften oder älteren Anlagen."],
      },
      {
        h2: "Welche Münzen & Barren kaufen wir an?",
        paragraphs: ["Originalverpackung und Zertifikat sind nicht nötig, können aber hilfreich sein."],
        bullets: ["Gold-Anlagemünzen", "Gold-, Silber-, Platin- und Palladiumbarren aller Größen", "Historische Münzen und Sammlermünzen", "Erbmünzen"],
      },
    ],
    faq: ["muenzen-barren"],
  },
  {
    slug: "luxusuhren-ankauf",
    path: "/luxusuhren-ankauf/",
    navLabel: "Luxusuhren",
    symbol: "18 K",
    teaser: "Uhren renommierter Marken – individuell bewertet.",
    image: images.luxusuhr,
    imageAlt: "Goldene Luxus-Armbanduhr mit Chronograph",
    metal: "gold",
    purity: "750",
    meta: {
      title: "Luxusuhren verkaufen | Uhrenankauf Gold Sohn",
      description:
        "Luxusuhren und Golduhren verkaufen: individuelle Bewertung nach Marke, Modell und Zustand – auch ohne Papiere oder defekt. Gold Sohn.",
    },
    h1: "Luxusuhren verkaufen bei Gold Sohn",
    lead: "Neben Edelmetallen kaufen wir hochwertige Uhren und Golduhren an. Marke, Modell und Zustand fließen in die Bewertung ein.",
    sections: [
      {
        h2: "Mehr als der Materialwert",
        paragraphs: [
          "Bei Luxusuhren zählt nicht nur das Gold im Gehäuse oder Armband. Marke, Modell, Zustand und Nachfrage können den Wert deutlich über den reinen Materialwert heben.",
        ],
      },
      {
        h2: "Welche Uhren kaufen wir an?",
        paragraphs: ["Auch Uhren ohne Papiere oder defekte Uhren können bewertet werden."],
        bullets: ["Luxusuhren renommierter Marken", "Golduhren und Uhren mit Goldarmband", "Uhren ohne Box und Papiere", "Defekte oder nicht laufende Uhren"],
      },
    ],
    faq: ["uhren"],
    isNew: true,
  },
];

export function getService(slug: string): Service {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Unknown service: ${slug}`);
  return s;
}
