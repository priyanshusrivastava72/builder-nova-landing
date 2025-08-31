export type CaseDoc = {
  id: string;
  title: string;
  court: string;
  year: number;
  tags: string[];
  outcome: "plaintiff" | "defendant" | "settled";
  summary: string;
  fullText: string;
};

export const CASES: CaseDoc[] = [
  {
    id: "c1",
    title: "Acme Corp v. Beta LLC",
    court: "Supreme Court",
    year: 2019,
    tags: ["contract", "breach", "damages"],
    outcome: "plaintiff",
    summary:
      "Breach of supply agreement. Court found clear contractual obligations and awarded expectation damages.",
    fullText:
      "Acme Corp entered into a supply agreement with Beta LLC. Beta failed to deliver goods per schedule. The court held that time was of the essence and Beta materially breached the contract. Damages were calculated based on lost profits and cover purchases.",
  },
  {
    id: "c2",
    title: "State v. Johnson",
    court: "Court of Appeal",
    year: 2021,
    tags: ["criminal", "search", "seizure"],
    outcome: "defendant",
    summary:
      "Evidence suppressed due to unlawful search. The panel emphasized lack of probable cause and warrant defects.",
    fullText:
      "Police conducted a vehicle search without a warrant following a traffic stop. The appellate court determined the search did not meet exigent circumstances nor consent. As a result, evidence was suppressed and the conviction reversed.",
  },
  {
    id: "c3",
    title: "Miller v. City Transit",
    court: "District Court",
    year: 2018,
    tags: ["tort", "negligence", "personal injury"],
    outcome: "plaintiff",
    summary:
      "Bus accident negligent operation. Comparative negligence reduced award by 20%.",
    fullText:
      "Plaintiff suffered injuries when a city bus abruptly swerved. The court found the driver breached the standard of care. However, plaintiff's failure to wear a seatbelt warranted a 20% reduction under comparative negligence.",
  },
  {
    id: "c4",
    title: "Omega Tech v. Delta Systems",
    court: "Commercial Court",
    year: 2022,
    tags: ["ip", "trade secret", "injunction"],
    outcome: "plaintiff",
    summary:
      "Preliminary injunction granted for misappropriation of trade secrets regarding source code and client lists.",
    fullText:
      "Omega Tech alleged Delta Systems misappropriated proprietary algorithms and client lists. The court granted a preliminary injunction, noting likelihood of success on the merits and irreparable harm absent relief.",
  },
  {
    id: "c5",
    title: "Anderson v. HealthPlus Insurance",
    court: "High Court",
    year: 2020,
    tags: ["insurance", "bad faith", "coverage"],
    outcome: "plaintiff",
    summary:
      "Insurer acted in bad faith by unreasonably denying coverage despite clear policy language.",
    fullText:
      "HealthPlus denied coverage for a medically necessary procedure. The court held the denial lacked a reasonable basis and contravened the policy's explicit terms, awarding consequential damages and fees.",
  },
  {
    id: "c6",
    title: "Rivera v. Bright Retailers",
    court: "District Court",
    year: 2017,
    tags: ["employment", "discrimination", "retaliation"],
    outcome: "settled",
    summary:
      "Allegations of workplace discrimination and retaliation settled with confidential terms.",
    fullText:
      "Plaintiff alleged discriminatory termination following complaints about unequal pay. The matter settled pre-trial with a non-disclosure agreement and agreed policy reforms.",
  },
  {
    id: "c7",
    title: "People v. Garcia",
    court: "Criminal Court",
    year: 2016,
    tags: ["criminal", "evidence", "hearsay"],
    outcome: "defendant",
    summary:
      "Conviction overturned due to improper admission of hearsay without applicable exception.",
    fullText:
      "The prosecution introduced statements from an unavailable witness. The court ruled the statements were testimonial and inadmissible under the confrontation clause, leading to reversal.",
  },
  {
    id: "c8",
    title: "Nova Media v. Alpha Advertising",
    court: "Commercial Court",
    year: 2023,
    tags: ["contract", "licensing", "royalties"],
    outcome: "plaintiff",
    summary:
      "Royalty underpayment dispute resolved in favor of licensor due to unambiguous audit clause.",
    fullText:
      "Alpha underreported streaming metrics reducing royalty payments to Nova. The court enforced the audit clause, finding clear underpayment and awarding back royalties plus interest.",
  },
];
