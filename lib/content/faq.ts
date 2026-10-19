/**
 * FAQ content migrated from https://gold-sohn.de/faq/ (18.10.2026).
 * Questions are taken over verbatim. Answers were condensed during migration –
 * please compare them with the original answers before go-live (docs/SEO-MIGRATION.md).
 * The homepage uses a short, verified selection (homeFaq).
 */
export type FaqCategoryId =
  | "goldankauf"
  | "silber"
  | "zahngold"
  | "platin-palladium"
  | "muenzen-barren"
  | "uhren"
  | "ablauf"
  | "versand"
  | "sicherheit";

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  id: FaqCategoryId;
  title: string;
  items: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: "goldankauf",
    title: "Goldankauf",
    items: [
      { q: "Wo kann ich Gold verkaufen?", a: "Bei Gold Sohn erhalten Sie eine fachliche Bewertung, persönliche Beratung und eine sofortige Auszahlung – bar oder per Überweisung." },
      { q: "Wo verkaufe ich Gold am besten?", a: "Bei einem spezialisierten Edelmetallhändler wie Gold Sohn: Ihr Gold wird transparent gewogen, der Feingehalt geprüft und ohne versteckte Gebühren sofort ausgezahlt." },
      { q: "Wie funktioniert Goldankauf bei Gold Sohn?", a: "Kostenlose Prüfung, Wiegung, Berechnung zum Tageskurs, Angebot und – wenn Sie zustimmen – sofortige Auszahlung." },
      { q: "Wie wird Gold berechnet?", a: "Der Wert ergibt sich aus Gewicht, Feingehalt und Tagesgoldpreis. 585er Gold enthält zum Beispiel 58,5 % Feingold." },
      { q: "Was bekomme ich für 1 Gramm Gold?", a: "Das hängt von der Legierung, dem Tageskurs und dem Gewicht ab. Die aktuellen Grammpreise je Feingehalt finden Sie auf unserer Preisseite." },
      { q: "Wie viel ist mein Gold wert?", a: "Genau lässt sich das erst nach der Prüfung sagen. Maßgeblich sind Feingehalt, Gewicht und der Kurs am Verkaufstag." },
      { q: "Wer kauft Gold an?", a: "Edelmetallhändler, Scheideanstalten, Juweliere und Pfandhäuser. Spezialisierte Händler zahlen oft mehr." },
      { q: "Gold verkaufen – worauf achten?", a: "Auf tagesaktuelle Preise, eine transparente Wiegung, eine seriöse Bewertung, keine Schmelzabzüge und eine sofortige Auszahlung." },
      { q: "Ist Goldankauf seriös?", a: "Ja, bei einem geprüften Händler. Gold Sohn steht für Transparenz, faire Preise und Diskretion." },
      { q: "Wie erkenne ich seriösen Goldankauf?", a: "An guten Bewertungen, klaren Preisen, einer nachvollziehbaren Wiegung, fehlenden Gebühren und einer festen Adresse." },
      { q: "Goldankauf in meiner Nähe?", a: "Gold Sohn ist Ihr Ansprechpartner für Gold, Silber, Platin, Palladium und Zahngold – bequem per Versand aus ganz Deutschland." },
      { q: "Goldankauf ohne Termin?", a: "Ja, ein Verkauf ist ohne Termin möglich – mit Bewertung und Sofortauszahlung." },
      { q: "Gold verkaufen mit Ausweispflicht?", a: "Ja. In Deutschland ist zur Dokumentation ein gültiger Ausweis erforderlich." },
      { q: "Wie lange dauert Goldankauf?", a: "Vom Prüfen bis zur Auszahlung meist 10 bis 20 Minuten. Beim Versand hängt die Dauer zusätzlich vom Postweg ab." },
      { q: "Wird Gold sofort ausgezahlt?", a: "Ja – per Barzahlung oder Echtzeitüberweisung, sobald Sie dem Angebot zustimmen." },
      { q: "Gold bar oder Überweisung?", a: "Beides ist möglich. Sie wählen die Auszahlungsart." },
      { q: "Gold online verkaufen oder vor Ort?", a: "Beides ist möglich. Vor Ort erhalten Sie die Auszahlung sofort; per Versand nutzen Sie unsere versicherte Versandtasche." },
      { q: "Goldankauf Preise heute?", a: "Unsere Preise richten sich nach dem Weltmarkt und werden täglich am Börsenkurs ausgerichtet." },
      { q: "Wann Gold verkaufen?", a: "Besonders bei einem hohen Goldpreis lohnt sich der Verkauf. Wir beraten Sie gern zum Zeitpunkt." },
      { q: "Kann ich Gold ohne Rechnung verkaufen?", a: "Ja. Alter Schmuck und Erbstücke können auch ohne Rechnung verkauft werden." },
      { q: "Muss Gold gestempelt sein?", a: "Nein. Auch ungestempeltes Gold wird geprüft und angekauft." },
      { q: "Wird Bruchgold angekauft?", a: "Ja – auch defekter Schmuck, Einzelstücke und Goldreste." },
      { q: "Wird kaputter Schmuck angekauft?", a: "Ja. Der Zustand ist unerheblich, es zählt der Materialwert." },
    ],
  },
  {
    id: "silber",
    title: "Silberankauf",
    items: [
      { q: "Wo kann ich Silber verkaufen?", a: "Bei Gold Sohn: Wir kaufen Silberschmuck, Besteck, Münzen und Barren mit sofortiger Auszahlung an." },
      { q: "Silberankauf in meiner Nähe?", a: "Gold Sohn bietet faire Preise, eine diskrete Abwicklung und eine kostenlose Bewertung – bequem per Versand." },
      { q: "Silberpreis heute?", a: "Der Silberpreis schwankt täglich mit dem internationalen Markt. Wir setzen ihn tagesaktuell an." },
      { q: "Was bekomme ich für Silber?", a: "Das hängt von Gewicht, Reinheit (z. B. 800, 835, 925) und dem aktuellen Silberpreis ab." },
      { q: "Silberbesteck verkaufen – lohnt sich das?", a: "Ja. Auch einzelne oder beschädigte Teile werden über ihren Silberanteil vergütet." },
      { q: "Silber 800 Preis?", a: "800er Silber enthält 80 % Silber. Der Wert richtet sich nach Tageskurs, Gewicht und Reinheit." },
      { q: "Silber 835 Preis?", a: "835er Silber enthält 83,5 % Feinsilber. Es findet sich häufig in Besteck und wird zum Tagespreis angekauft." },
      { q: "Silber 925 Preis?", a: "925er Sterlingsilber enthält 92,5 % Feinsilber und wird entsprechend hoch bewertet." },
      { q: "Wie wird Silber berechnet?", a: "Gewicht × Feinsilberanteil × Silberpreis – transparent vorgerechnet." },
      { q: "Silbermünzen verkaufen?", a: "Ja – Anlage-, Sammler- und historische Münzen, bewertet nach Material- oder Sammlerwert." },
      { q: "Silberbarren verkaufen?", a: "Jederzeit. Gewicht, Reinheit und Kurs zählen; Zertifikate sind hilfreich, aber nicht nötig." },
      { q: "Silberschmuck verkaufen?", a: "Ketten, Ringe, Armbänder und Ohrringe werden angekauft – auch defekte Stücke." },
      { q: "Kaputtes Silber verkaufen?", a: "Ja. Beschädigte oder unvollständige Stücke werden nach Materialwert vergütet." },
      { q: "Silber oxidiert verkaufen?", a: "Ja. Anlaufen oder Oxidation beeinflusst den Materialwert nicht." },
      { q: "Silber ohne Stempel verkaufen?", a: "Ja. Eine Materialprüfung klärt den Silbergehalt." },
      { q: "Wie erkennt man echtes Silber?", a: "Typisch sind Stempel sowie Magnet-, Säure- und Dichteprüfung. Wir prüfen kostenlos." },
      { q: "Silber Ankauf Auszahlung sofort?", a: "Ja – nach Einigung sofort, bar oder per Überweisung." },
      { q: "Silber oder Gold mehr wert?", a: "Gold ist pro Gramm deutlich wertvoller. Silber lohnt sich vor allem bei größeren Mengen." },
      { q: "Wann Silber verkaufen?", a: "Bei einem hohen Silberkurs. Wir beraten Sie gern zum Zeitpunkt." },
      { q: "Silberbesteck verkaufen Preis?", a: "Jedes Teil wird einzeln nach Gewicht, Legierung und Tageskurs bewertet." },
      { q: "Wird versilbertes Besteck angekauft?", a: "Versilbertes Besteck hat meist nur geringen Wert; bei großen Mengen ist ein Ankauf nach Prüfung möglich." },
      { q: "Unterschied Silber und versilbert?", a: "Echtes Silber ist durchgehend legiert, versilberte Gegenstände sind nur beschichtet – der Wert unterscheidet sich deutlich." },
      { q: "Wie erkenne ich 800 Silber?", a: "An Stempeln wie 800, Halbmond mit Krone oder Herstellerpunzen. Im Zweifel prüfen wir das für Sie." },
      { q: "Tafelsilber verkaufen lohnt sich?", a: "Ja. Große Sets und Erbstücke haben oft einen hohen Materialwert." },
      { q: "Einzelteile verkaufen?", a: "Ja, auch einzelne Löffel, Gabeln oder Messer." },
      { q: "Silberlöffel Preis?", a: "Es gibt keine Pauschalpreise – Gewicht und Legierung bestimmen den Wert." },
      { q: "Silbermesser verkaufen?", a: "Ja, sofern ein Silberanteil vorhanden ist – meist im Griff." },
      { q: "Silber mit Gravur verkaufen?", a: "Ja. Gravuren beeinflussen den Materialwert nicht." },
      { q: "Antikes Silberbesteck Wert?", a: "Neben dem Materialwert kann ein Sammlerwert bestehen, den wir prüfen." },
    ],
  },
  {
    id: "zahngold",
    title: "Zahngold Ankauf",
    items: [
      { q: "Was ist Zahngold wert?", a: "Das hängt von Goldanteil, Gewicht, Tageskurs und weiteren Metallen wie Palladium oder Platin ab." },
      { q: "Zahngold verkaufen Preis?", a: "Einen Pauschalpreis gibt es nicht, da Legierungen variieren. Nach der Analyse erhalten Sie ein Angebot." },
      { q: "Wird Zahngold mit Zahn angekauft?", a: "Ja. Das Material wird getrennt, berechnet wird nur der Edelmetallanteil." },
      { q: "Muss Zahngold gereinigt sein?", a: "Nein, Sie können Zahngold im Originalzustand einsenden." },
      { q: "Zahngold mit Keramik verkaufen?", a: "Ja. Keramikanteile werden getrennt und nicht vergütet." },
      { q: "Zahngold mit Palladium Anteil?", a: "Palladium und Platin erhöhen den Gesamtwert und werden berücksichtigt." },
      { q: "Zahngold ohne Rechnung verkaufen?", a: "Ja. Ein gültiger Ausweis ist aber erforderlich." },
      { q: "Wie wird Zahngold geprüft?", a: "Durch Sichtprüfung, Dichte- und Säuretest, bei größeren Mengen auch per Spektralanalyse." },
      { q: "Zahngold schmelzen Preis?", a: "Der Wert ergibt sich aus dem Feingoldanteil nach dem Schmelzen und wird vorab transparent berechnet." },
      { q: "Wie viel pro Gramm Zahngold?", a: "Der Grammpreis variiert stark. Den genauen Preis erhalten Sie nach der Analyse." },
      { q: "Lohnt sich Zahngold verkaufen?", a: "Ja – auch kleine Mengen mit hohem Edelmetallanteil können sich lohnen." },
      { q: "Zahngold Ankauf seriös?", a: "Seriös sind eine transparente Analyse, eine nachvollziehbare Berechnung, Tagespreise und eine Sofortauszahlung." },
      { q: "Wird Zahngold sofort bezahlt?", a: "Ja – nach Einigung sofort, bar oder per Überweisung." },
      { q: "Kann man einzelne Zähne verkaufen?", a: "Ja. Auch einzelne Zahngoldstücke werden angekauft, unabhängig von Menge oder Zustand." },
      { q: "Zahngold Preis Tabelle?", a: "Eine feste Tabelle gibt es nicht. Jede Bewertung erfolgt individuell." },
      { q: "Wird Zahngold anonym angekauft?", a: "Nein, ein Ausweis ist Pflicht. Ihre Daten werden diskret behandelt." },
      { q: "Ist Zahngold hygienisch beim Verkauf?", a: "Nach der Annahme wird Zahngold professionell gereinigt und eingeschmolzen." },
      { q: "Wird Zahngold gewogen mit oder ohne Zahn?", a: "Berechnet wird nur das Edelmetall. Zahnreste werden vorher entfernt." },
      { q: "Kann Zahngold auch Platin enthalten?", a: "Ja. Hochwertige Dentallegierungen enthalten oft Platin oder Palladium, was den Preis erhöht." },
      { q: "Wie erkenne ich Zahngold?", a: "Typisch sind eine gelbliche oder silbrige Farbe und ein hohes Gewicht. Die Bestimmung ist kostenlos." },
      { q: "Wird auch altes Zahngold angekauft?", a: "Ja. Alter und Zustand sind unerheblich, es zählt der Edelmetallgehalt." },
      { q: "Kann ich Zahngold aus Erbschaft verkaufen?", a: "Ja, Erbstücke sind problemlos verkaufbar." },
      { q: "Zahngold oder Schmuck wertvoller?", a: "Das hängt von der Legierung ab. Zahngold mit Palladium oder Platin kann sehr wertvoll sein." },
    ],
  },
  {
    id: "platin-palladium",
    title: "Platin & Palladium Ankauf",
    items: [
      { q: "Platin verkaufen – wo geht das?", a: "Bei Gold Sohn: Wir kaufen Platinschmuck, Ringe, Barren, Münzen und Dentalplatin an." },
      { q: "Platinpreis heute?", a: "Der Platinpreis schwankt täglich mit dem Edelmetallmarkt und wird tagesaktuell angesetzt." },
      { q: "Wo kann ich Platin verkaufen?", a: "Am besten bei einem Spezialisten mit fachgerechter Prüfung und marktgerechten Preisen." },
      { q: "Platin Schmuck verkaufen?", a: "Ringe, Ketten, Armbänder und Ohrringe werden angekauft – auch beschädigte Stücke." },
      { q: "Platin Ringe verkaufen?", a: "Ja. Platinringe, etwa Eheringe aus 950er Platin, erzielen attraktive Preise." },
      { q: "Unterschied Platin und Weißgold?", a: "Platin ist ein reines Edelmetall, Weißgold eine Goldlegierung, zum Beispiel mit Palladium. Wir unterscheiden beides genau." },
      { q: "Wie wird Platin geprüft?", a: "Durch Stempelanalyse, Dichte- und Säuretest sowie Spektralanalyse." },
      { q: "Platin Ankauf seriös?", a: "Seriös sind eine transparente Bewertung, Tagespreise, Sofortauszahlung und keine Gebühren." },
      { q: "Platin pro Gramm Preis?", a: "Abhängig von Reinheit, Gewicht und Börsenkurs." },
      { q: "Lohnt sich Platin verkaufen?", a: "Ja. Platin gehört zu den wertvollsten Edelmetallen, auch kleine Mengen lohnen sich." },
      { q: "Platinbarren verkaufen?", a: "Jederzeit. Zertifikate helfen, sind aber nicht zwingend." },
      { q: "Platin Münzen verkaufen?", a: "Ja. Anlagemünzen werden nach Metallwert oder Sammlerwert bewertet." },
      { q: "Platin 950 Preis?", a: "950er Platin enthält 95 % Platin und gehört zu den hochwertigen Legierungen." },
      { q: "Platin ohne Stempel verkaufen?", a: "Ja. Auch ungestempelte Stücke werden geprüft und bewertet." },
      { q: "Wird Platin sofort ausgezahlt?", a: "Ja – nach Preisvereinbarung sofort, bar oder per Überweisung." },
      { q: "Palladium verkaufen – wo?", a: "Bei Gold Sohn, in jeder Form: Schmuck, Zahngoldanteile, Industriebauteile und Barren." },
      { q: "Palladium Preis heute?", a: "Der Palladiumpreis ist börsenabhängig und schwankt oft stärker als Gold oder Silber." },
      { q: "Palladium oder Gold wertvoller?", a: "Zeitweise war Palladium teurer als Gold – das hängt vom Markt ab." },
      { q: "Palladium Schmuck verkaufen?", a: "Ja. Palladium in Weißgold oder als Schmuckmetall wird anteilig bewertet." },
      { q: "Palladium Ankauf seriös?", a: "Seriös sind eine transparente Analyse, eine exakte Bestimmung und marktgerechte Preise." },
      { q: "Palladium pro Gramm Preis?", a: "Abhängig von Reinheit, Gewicht und Börsenkurs." },
      { q: "Wo Palladium verkaufen?", a: "Am besten bei einem Spezialisten – die Analyse von Palladium erfordert Fachkenntnis." },
      { q: "Palladium im Zahngold?", a: "Viele Dentallegierungen enthalten Palladium, was den Ankaufspreis deutlich erhöhen kann." },
      { q: "Palladium erkennen?", a: "Typisch sind eine silbrig-weiße Farbe, hohe Dichte und geringe Oxidation. Die Analyse ist kostenlos." },
      { q: "Palladium ohne Stempel verkaufen?", a: "Ja, auch ohne Stempel ist eine professionelle Prüfung möglich." },
      { q: "Wird Platin & Palladium getrennt berechnet?", a: "Ja. Jedes Edelmetall wird einzeln analysiert und vergütet." },
      { q: "Wird Dentalplatin angekauft?", a: "Ja, auch Platin aus Zahnersatz." },
      { q: "Kann ich kleine Mengen verkaufen?", a: "Ja, auch kleinste Mengen." },
      { q: "Auszahlung sofort?", a: "Ja – wie bei allen Edelmetallen direkt nach der Einigung." },
    ],
  },
  {
    id: "muenzen-barren",
    title: "Goldmünzen & Goldbarren Ankauf",
    items: [
      { q: "Goldmünzen verkaufen – wo?", a: "Bei Gold Sohn zum Tagespreis. Geprüft werden Materialwert und ein möglicher Sammlerwert." },
      { q: "Goldbarren verkaufen?", a: "Jederzeit, unabhängig von Hersteller oder Größe. Gewicht, Reinheit und Kurs zählen." },
      { q: "Muss die Originalverpackung vorhanden sein?", a: "Nein. Verpackung und Zertifikat sind nicht nötig, können den Preis aber leicht verbessern." },
      { q: "Wird der Sammlerwert berücksichtigt?", a: "Ja. Bei besonderen Münzen prüfen wir, ob ein Sammlerwert über dem Goldwert liegt." },
      { q: "Anlagemünzen oder Schmuck – was bringt mehr?", a: "Anlagemünzen aus Feingold erzielen meist höhere Preise pro Gramm." },
      { q: "Verkauf von Erbmünzen möglich?", a: "Ja. Für den Verkauf ist ein Ausweis erforderlich." },
    ],
  },
  {
    id: "uhren",
    title: "Luxusuhren & Golduhren",
    items: [
      { q: "Kauft Gold Sohn auch Luxusuhren?", a: "Ja. Neben Edelmetallen kaufen wir hochwertige Uhren und Golduhren an." },
      { q: "Wird nur der Goldwert bezahlt?", a: "Nein. Marke, Modell und Zustand fließen ein und können den Wert deutlich über den Materialwert heben." },
      { q: "Kann ich eine Uhr ohne Papiere verkaufen?", a: "Ja, eine Bewertung ist trotzdem möglich." },
      { q: "Werden defekte Uhren angekauft?", a: "Ja, auch beschädigte oder nicht funktionierende Uhren." },
    ],
  },
  {
    id: "ablauf",
    title: "Ablauf, Auszahlung & Steuern",
    items: [
      { q: "Wie läuft der Verkauf bei Gold Sohn ab?", a: "Kostenlose Bewertung, Wiegung, Berechnung zum Tageskurs, Angebot und sofortige Auszahlung." },
      { q: "Erfolgt die Auszahlung sofort?", a: "Ja – bar oder per Überweisung." },
      { q: "Gibt es Gebühren oder Abzüge?", a: "Nein, es gibt keine versteckten Gebühren." },
      { q: "Ist der Goldverkauf steuerfrei?", a: "Privatpersonen können unter bestimmten Bedingungen steuerfrei verkaufen. Für Ihren Einzelfall empfehlen wir eine Steuerberatung." },
      { q: "Muss ich den Verkauf melden?", a: "Bei privatem Besitz im Normalfall nicht." },
      { q: "Gibt es eine Bargeldgrenze?", a: "Gesetzliche Vorgaben können eine Identitätsprüfung verlangen. Bitte halten Sie einen Ausweis bereit." },
    ],
  },
  {
    id: "versand",
    title: "Online Goldankauf & Versand",
    items: [
      { q: "Kann ich Gold per Post verkaufen?", a: "Ja. Fordern Sie unsere kostenlose Versandtasche an oder versenden Sie selbst, zum Beispiel per Einschreiben." },
      { q: "Ist Versand sicher?", a: "Ja, mit unserer versicherten Versandtasche. Für Werte über 500 € steht ein Premium-Paket bereit." },
      { q: "Wie lange dauert Online-Auszahlung?", a: "Meist wenige Werktage nach Eingang und Prüfung – nach Ihrer Zustimmung erfolgt die Auszahlung sofort." },
      { q: "Was passiert bei Paketverlust?", a: "Versicherte Sendungen sind abgesichert. Die Details hängen vom Versanddienstleister ab." },
    ],
  },
  {
    id: "sicherheit",
    title: "Sicherheit & Seriosität",
    items: [
      { q: "Woran erkenne ich seriösen Goldankauf?", a: "An transparenten Preisen, einer nachvollziehbaren Wiegung, fehlenden Gebühren, einer festen Adresse und guten Bewertungen." },
      { q: "Wird diskret gearbeitet?", a: "Ja. Diskretion und Datenschutz haben bei uns hohe Priorität." },
      { q: "Wird alles dokumentiert?", a: "Ja, jeder Ankauf wird ordnungsgemäß dokumentiert." },
      { q: "Kann ich mein Gold kostenlos schätzen lassen?", a: "Ja. Die Bewertung ist kostenlos und unverbindlich." },
      { q: "Ist Goldankauf Betrug?", a: "Nicht bei seriösen Händlern. Entscheidend ist eine transparente Bewertung." },
    ],
  },
];

/** Short FAQ for the homepage – based only on statements verified in the explainer video and on the site. */
export const homeFaq: FaqItem[] = [
  { q: "Wie funktioniert der Goldankauf per Versand?", a: "Sie fordern eine kostenlose Versandtasche an, legen Ihre Edelmetalle hinein und senden das Paket an Gold Sohn. Nach der professionellen Prüfung erhalten Sie ein Angebot per E-Mail oder telefonisch. Stimmen Sie zu, erfolgt die Auszahlung sofort." },
  { q: "Was kostet mich die Versandtasche?", a: "Die Versandtasche ist kostenlos und unverbindlich. Für Edelmetalle mit einem Wert über 500 € steht ein Premium-Paket zur Verfügung." },
  { q: "Wie wird der Preis ermittelt?", a: "Ihre Wertgegenstände werden nach Eingang geprüft und bewertet. Das Angebot basiert auf dem aktuellen Edelmetallkurs sowie dem festgestellten Feingehalt und Gewicht." },
  { q: "Wann und wie erhalte ich mein Geld?", a: "Sobald Sie unserem Preisvorschlag zustimmen, erfolgt die Auszahlung sofort." },
  { q: "Kann ich auch selbst versenden?", a: "Ja. Neben der Versandtasche können Sie Ihre Edelmetalle selbst versenden, zum Beispiel per Einschreiben, oder eine Abholung anfragen." },
  { q: "Was passiert, wenn ich das Angebot nicht annehme?", a: "Sie entscheiden selbst. [Bitte ergänzen: Bedingungen der Rücksendung]" },
];

export function faqFor(ids: FaqCategoryId[]): FaqCategory[] {
  return faqCategories.filter((c) => ids.includes(c.id));
}
