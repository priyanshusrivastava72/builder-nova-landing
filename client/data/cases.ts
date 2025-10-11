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
  {
    id: "c9",
    title: "United States v. Greenfield",
    court: "Supreme Court",
    year: 2015,
    tags: ["criminal", "fourth amendment", "privacy"],
    outcome: "defendant",
    summary:
      "Digital privacy protections extended; warrantless cell phone search deemed unconstitutional.",
    fullText:
      "Law enforcement searched a suspect's cell phone incident to arrest without a warrant. The court held that digital data requires heightened privacy protections and a warrant was required, leading to suppression of evidence.",
  },
  {
    id: "c10",
    title: "Horizon Foods v. Metro Logistics",
    court: "Court of Appeal",
    year: 2022,
    tags: ["contract", "force majeure", "covid-19"],
    outcome: "defendant",
    summary:
      "Force majeure clause excused non-performance where pandemic-related shutdowns made delivery impossible.",
    fullText:
      "Due to government-ordered shutdowns, Metro Logistics failed to deliver per schedule. The appellate court found the force majeure clause unambiguously covered pandemic-related disruptions, excusing performance.",
  },
  {
    id: "c11",
    title: "Everest Bank v. Patel",
    court: "High Court",
    year: 2019,
    tags: ["banking", "guarantee", "surety"],
    outcome: "plaintiff",
    summary:
      "Personal guarantee enforced; lender complied with notice provisions and mitigation duties.",
    fullText:
      "The borrower defaulted and the bank sought recovery from the guarantor. The court enforced the guarantee, finding no waiver and adequate notice prior to acceleration.",
  },
  {
    id: "c12",
    title: "EcoWatch v. State Mining Authority",
    court: "Environmental Court",
    year: 2021,
    tags: ["environment", "epa", "injunction"],
    outcome: "plaintiff",
    summary:
      "Preliminary injunction issued for failure to conduct environmental impact assessment.",
    fullText:
      "The agency approved mining permits without a full EIA. The court granted an injunction pending proper assessment, citing likely irreparable harm to wetlands and species.",
  },
  {
    id: "c13",
    title: "BrightApps v. QuantumSoft",
    court: "Commercial Court",
    year: 2024,
    tags: ["ip", "copyright", "injunction"],
    outcome: "plaintiff",
    summary:
      "Copyright infringement found where substantially similar UI and code structure were copied.",
    fullText:
      "Expert analysis showed non-trivial copying of expressive elements and code structure. The court issued an injunction and awarded statutory damages.",
  },
  {
    id: "c14",
    title: "Parker v. Sunset Estates",
    court: "District Court",
    year: 2018,
    tags: ["real estate", "landlord-tenant", "habitability"],
    outcome: "plaintiff",
    summary:
      "Breach of warranty of habitability for persistent mold and lack of heat.",
    fullText:
      "Tenant documented repeated requests to remediate mold and repair heating. The court found material breach and awarded abatements and fees.",
  },
  {
    id: "c15",
    title: "Atlas Pharma v. Zenith Labs",
    court: "Patent Court",
    year: 2020,
    tags: ["ip", "patent", "invalidity"],
    outcome: "defendant",
    summary:
      "Patent invalidated for obviousness in light of prior art combination.",
    fullText:
      "The asserted claims were rendered obvious by a combination of two prior publications teaching the same mechanism. The court found a motivation to combine and reasonable expectation of success.",
  },
  {
    id: "c16",
    title: "People v. Ortiz",
    court: "Criminal Court",
    year: 2017,
    tags: ["criminal", "due process", "lineup"],
    outcome: "defendant",
    summary:
      "Conviction reversed due to unduly suggestive lineup identification procedures.",
    fullText:
      "A single-photo identification and comments by officers tainted the identification. The court held the procedure violated due process and remanded for new trial.",
  },
  {
    id: "c17",
    title: "WestCo v. FairTrade Council",
    court: "Supreme Court",
    year: 2016,
    tags: ["antitrust", "competition", "market power"],
    outcome: "defendant",
    summary:
      "Sherman Act claim failed where plaintiff did not establish relevant market or power.",
    fullText:
      "Allegations of exclusionary conduct were insufficient absent a properly defined market and evidence of durable market power. Summary judgment for defendant was affirmed.",
  },
  {
    id: "c18",
    title: "Garcia v. City Health",
    court: "Court of Appeal",
    year: 2023,
    tags: ["employment", "whistleblower", "retaliation"],
    outcome: "plaintiff",
    summary:
      "Whistleblower retaliation claim succeeded; temporal proximity and pretext evidence carried the day.",
    fullText:
      "Plaintiff reported unsafe practices and was terminated weeks later. Employer's shifting explanations supported pretext; jury verdict for plaintiff reinstated.",
  },
  {
    id: "c19",
    title: "In re BlueSky Aviation",
    court: "Bankruptcy Court",
    year: 2022,
    tags: ["bankruptcy", "preference", "avoidance"],
    outcome: "plaintiff",
    summary:
      "Trustee avoided preferential transfers made within 90 days before filing.",
    fullText:
      "Payments to an insider creditor during the preference period were avoidable. The court rejected ordinary course defenses based on unusual collection pressure.",
  },
  {
    id: "c20",
    title: "Lopez v. Lopez",
    court: "Family Court",
    year: 2019,
    tags: ["family", "custody", "best interests"],
    outcome: "settled",
    summary:
      "Custody dispute resolved via parenting plan focusing on best interests and stability.",
    fullText:
      "Parties agreed to joint legal custody with a structured schedule and mediation clause. The agreement emphasized continuity of schooling and healthcare.",
  },
];
