/**
 * Central image registry. All photos are the client's original uploads
 * (public/images/uploads). Files in public/images/derived are plain crops of
 * those originals. The hero render (public/images/hero) is a Blender studio
 * render created for the design phase and can be swapped here in one place.
 * See docs/ASSETS.md for the full mapping.
 */
import goldschmuckSchale from "@/public/images/uploads/goldschmuck-schale.png";
import silberBarrenMuenzen from "@/public/images/uploads/silber-barren-muenzen.png";
import argorHeraeus from "@/public/images/uploads/argor-heraeus-gold-platin-barren.jpg";
import goldGeflecht from "@/public/images/uploads/gold-geflecht-makro.jpg";
import palladiumBarren from "@/public/images/uploads/palladium-barren.jpg";
import luxusuhr from "@/public/images/uploads/luxusuhr-gold.jpg";
import luxusuhrKlein from "@/public/images/uploads/luxusuhr-gold-klein.jpg";
import altgold from "@/public/images/uploads/altgold-sammlung.jpg";
import goldringe from "@/public/images/uploads/goldringe-schatulle.jpg";
import goldbarrenMuenzen from "@/public/images/uploads/goldbarren-muenzen.jpg";
import goldbarrenAusschnitt from "@/public/images/derived/argor-heraeus-goldbarren-ausschnitt.webp";
import platinAusschnitt from "@/public/images/derived/argor-heraeus-platinbarren-ausschnitt.webp";
import heroA from "@/public/images/hero/hero-goldbarren-kette.jpg";
import heroB from "@/public/images/hero/hero-goldbarren-kette-licht.jpg";
import logo from "@/public/brand/logo-gold-sohn.png";
import posterSchritt1 from "@/public/video/poster-schritt-1.jpg";

export const images = {
  goldschmuckSchale,
  silberBarrenMuenzen,
  argorHeraeus,
  goldGeflecht,
  palladiumBarren,
  luxusuhr,
  luxusuhrKlein,
  altgold,
  goldringe,
  goldbarrenMuenzen,
  goldbarrenAusschnitt,
  platinAusschnitt,
  heroA,
  heroB,
  logo,
  posterSchritt1,
} as const;

export const videoSrc = "/video/goldsohn-erklaervideo.mp4";
