export interface CityConfig {
  slug: string;
  name: string;
  county: string;
  tagline: string;
  neighborhoods: string[];
  heroKeyword: string;
  projectFocus: string;
  localConsiderations: string;
  localFaqs: { q: string; a: string }[];
  localServices?: { title: string; description: string; href: string }[];
  resurfacingSigns?: { title: string; description: string }[];
  availableFinishes?: { name: string; description: string; href: string }[];
  documentedProject?: {
    title: string;
    location: string;
    problem: string;
    work: string;
    result: string;
    photos: { file: string; alt: string }[];
  };
  projectPhotos?: { file: string; alt: string }[];
  nearbyAreas?: { name: string; href: string }[];
}

import cityLocalContent from "./city-local-content.json";

export const CITIES: Record<string, CityConfig> = {
  riverside: {
    slug: "riverside",
    name: "Riverside",
    county: "Riverside County",
    tagline: "Rivera Pools' home city and the county seat — Riverside homeowners trust us for careful pool remodeling, leak detection, and lasting finishes.",
    neighborhoods: ["Wood Streets", "Canyon Crest", "Orangecrest", "Mission Grove", "Arlington Heights", "La Sierra"],
    heroKeyword: "Pool Remodeling Riverside, CA",
    ...cityLocalContent.riverside,
  },
  temecula: {
    slug: "temecula",
    name: "Temecula",
    county: "Riverside County",
    tagline: "Wine country estates and luxury communities — Temecula pools get the premium treatment they deserve.",
    neighborhoods: ["Wine Country", "Redhawk", "Crowne Hill", "Paloma del Sol", "Wolf Creek"],
    heroKeyword: "Pool Resurfacing & Plastering in Temecula, CA",
    ...cityLocalContent.temecula,
  },
  murrieta: {
    slug: "murrieta",
    name: "Murrieta",
    county: "Riverside County",
    tagline: "One of California's fastest-growing cities — Murrieta homeowners trust Rivera Pools for quality remodels.",
    neighborhoods: ["Bear Creek", "French Valley", "Murrieta Hot Springs", "La Cresta", "Greer Ranch"],
    heroKeyword: "Pool Resurfacing & Plastering in Murrieta, CA",
    ...cityLocalContent.murrieta,
  },
  menifee: {
    slug: "menifee",
    name: "Menifee",
    county: "Riverside County",
    tagline: "Pool resurfacing and remodeling for Menifee homeowners planning durable finishes, practical repairs, and better outdoor living.",
    neighborhoods: ["Menifee Lakes", "Quail Valley", "Sun City", "Heritage Lake", "Audie Murphy Ranch"],
    heroKeyword: "Pool Resurfacing & Plastering in Menifee, CA",
    ...cityLocalContent.menifee,
  },
  hemet: {
    slug: "hemet",
    name: "Hemet",
    county: "Riverside County",
    tagline: "Pool plastering, resurfacing, and renovation planning for Hemet homes, from rough surfaces to complete finish upgrades.",
    neighborhoods: ["Seven Hills", "West Hemet", "East Hemet", "Stoney Mountain Ranch", "Valle Vista"],
    heroKeyword: "Pool Resurfacing & Plastering in Hemet, CA",
    ...cityLocalContent.hemet,
  },
  corona: {
    slug: "corona",
    name: "Corona",
    county: "Riverside County",
    tagline: "The Circle City's trusted pool remodeling contractor — serving Corona homeowners with quality and reliability.",
    neighborhoods: ["Eagle Glen", "Sycamore Creek", "South Corona", "Dos Lagos", "Temescal Valley"],
    heroKeyword: "Pool Remodeling Corona, CA",
    ...cityLocalContent.corona,
  },
  fallbrook: {
    slug: "fallbrook",
    name: "Fallbrook",
    county: "San Diego County",
    tagline: "Pool resurfacing and remodeling for Fallbrook homes, estates, and outdoor spaces near the Riverside County line.",
    neighborhoods: ["Downtown Fallbrook", "Live Oak Park", "Rainbow", "Fallbrook Estates"],
    heroKeyword: "Pool Remodeling Fallbrook, CA",
    ...cityLocalContent.fallbrook,
  },
  bonsall: {
    slug: "bonsall",
    name: "Bonsall",
    county: "San Diego County",
    tagline: "Premium pool finishes, coping, and renovation work for Bonsall homeowners who want a backyard built to last.",
    neighborhoods: ["Bonsall Village", "Via Monserate", "Lilac Hills", "San Luis Rey Heights"],
    heroKeyword: "Pool Remodeling Bonsall, CA",
    ...cityLocalContent.bonsall,
  },
  vista: {
    slug: "vista",
    name: "Vista",
    county: "San Diego County",
    tagline: "Reliable pool remodeling and resurfacing for Vista homes, from rough plaster repairs to complete finish upgrades.",
    neighborhoods: ["Shadowridge", "Vista Village", "Buena", "Civic Center"],
    heroKeyword: "Pool Remodeling Vista, CA",
    ...cityLocalContent.vista,
  },
  oceanside: {
    slug: "oceanside",
    name: "Oceanside",
    county: "San Diego County",
    tagline: "Coastal pool resurfacing and remodeling for Oceanside homeowners, with durable finishes selected for outdoor living.",
    neighborhoods: ["Fire Mountain", "Arrowood", "Rancho Del Oro", "South Oceanside"],
    heroKeyword: "Pool Remodeling Oceanside, CA",
    ...cityLocalContent.oceanside,
  },
};
