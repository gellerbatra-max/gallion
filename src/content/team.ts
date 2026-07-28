/**
 * Leadership.
 *
 * PLACEHOLDER PEOPLE — the names, titles and biographies below are invented
 * so the page reads as complete. Replace this entire file with the real team
 * before the site goes live. Do not publish these as real individuals.
 */

export type Person = {
  name: string;
  role: string;
  initials: string;
  bio: string;
  focus: string;
};

export const team: Person[] = [
  {
    name: "Rehan Alwis",
    role: "Founder",
    initials: "RA",
    bio: "Spent fifteen years between Colombo and London in export trade and consumer brands, mostly on the unglamorous side of it — sourcing, contracts, and the long argument about who owns the customer. Started Gelian after one too many meetings where the Sri Lankan product was excellent and the Sri Lankan margin was not.",
    focus: "Platform strategy, capital, category selection",
  },
  {
    name: "Ishara Wijeratne",
    role: "Partner, Ventures",
    initials: "IW",
    bio: "Operator first. Built and ran a boutique hospitality group through two very different economic cycles, which is a fast way to learn the difference between a good idea and a good business. Leads venture formation and the standards our operating teams are held to.",
    focus: "Venture formation, operations, standards",
  },
  {
    name: "Nadia Rahman",
    role: "Principal, Market Development",
    initials: "NR",
    bio: "Worked across the Gulf and Southeast Asia opening markets for mid-sized brands — the part of the job that is ninety percent relationships and ten percent paperwork. Responsible for the outward half of the mandate: distribution, partners and landing well in unfamiliar places.",
    focus: "Distribution, partnerships, market entry",
  },
];
