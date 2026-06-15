/** Events where Tessera team members are presenting or have a significant presence.
 *  Ordered latest-date-first (same convention as blog-links.ts).
 *
 *  Linking logic (list page):
 *    - id only              → links to internal /events/[id] page
 *    - externalUrl only     → links directly to external site (new tab)
 *    - id + externalUrl     → list page links to /events/[id];
 *                             externalUrl appears as "Visit event website" button on detail page
 */
export interface TesseraEvent {
  /** Unique identifier — used as the URL slug for internal detail pages */
  id: string;
  title: string;
  /** ISO 8601, e.g. "2025-09-15" */
  date: string;
  /** ISO 8601 — include for multi-day events */
  dateEnd?: string;
  location: string;
  /** Event organiser — displayed inline with location on list and detail pages */
  organiser?: string;
  /** External event website. If no internal detail content, used directly as the list-page link. */
  externalUrl?: string;
  /** Path relative to /public, e.g. "/events/igarss-2025.jpg". Optional. */
  image?: string;
  /** Name(s) of Tessera presenter(s) */
  speaker?: string;
  /** Title of the talk or session */
  talk?: string;
  /** Body copy for the internal detail page. HTML or plain text. */
  description?: string;
}

export const tesseraEvents: TesseraEvent[] = [
  // --- Add events below, newest first ---
  {
    id: 'isprs-2026',
    title: 'ISPRS 2026',
    date: '2026-07-05',
    location: 'Toronto, Canada',
    organiser: 'ISPRS',
    externalUrl: 'https://program.isprs2026.org/index4499.html?page=browseSessions&path=adminSessions&print=export&ismobile=false&form_date=all&form_session=118&mode=list&presentations=show',
    speaker: 'Madeline Lisaius',
    talk: 'Towards improved crop type classification: a compact embedding approach suitable for small fields',
    description: 'Madeline will present this paper at Session ThS16: Earth Embeddings — Investigating Accurate and Accessible Deep Geospatial Feature Representations (room 717A, 12:45–1:00pm local time). The paper, co-authored with Andrew Blake, Clement Atzberger, and Srinivasan Keshav, shows that TESSERA embeddings outperform standard approaches for crop type classification in small field systems, achieving higher F1 scores across 5 of 7 crop types while using just 8% of the compute of raw data methods.',
  },
  {
    id: 'ai4good-geoai-2026',
    title: 'AI for Good Global Summit — GeoAI Workshop',
    date: '2026-07-07',
    location: 'Geneva, Switzerland',
    organiser: 'ITU / AI for Good',
    externalUrl: 'https://aiforgood.itu.int/event/geoai-for-our-shared-future-geospatial-foundation-models-and-generative-intelligence-for-people-and-the-planet/',
    speaker: 'Zhengpeng (Frank) Feng',
    talk: 'TESSERA: A Foundation Model for Label-Efficient and Multi-Modal Earth Observation',
    description: "Frank will present TESSERA at the GeoAI for Our Shared Future workshop, part of the AI for Good Global Summit. The workshop (14:00–17:15 CEST) brings together UN agencies, academia, and the private sector to explore geospatial foundation models and generative AI. Frank's talk is in Session 2: Emerging State-of-the-Art Academic Research.",
  },
  {
    id: 'pixel-seminar-2026',
    title: 'PIXEL Seminar Series',
    date: '2026-06-25',
    location: 'Online',
    organiser: 'Imago',
    externalUrl: 'https://imago.ac.uk/events/pixel-seminar-series-tessera-a-foundation-model-for-label-efficient-and-multi-modal-earth-observation-at-scale',
    speaker: 'Zhengpeng (Frank) Feng',
    talk: 'TESSERA: A Foundation Model for Label-Efficient and Multi-Modal Earth Observation at Scale',
    description: 'Frank will present TESSERA at the PIXEL Seminar Series, hosted by the Imago Data Service for Imagery. The talk runs from 2–3pm BST.',
  },
  {
    id: 'cng-london-2026',
    title: 'CNG London',
    date: '2026-06-23',
    location: 'London',
    organiser: 'Cloud-Native Geospatial Forum',
    externalUrl: 'https://cloudnativegeo.org/events/cng-london',
    speaker: 'Anil Madhavapeddy',
    talk: 'TESSERA: Pixelwise Embeddings of Earth Observations',
    description: 'Anil will present TESSERA at the Cloud-Native Geospatial Forum (CNG) London meetup. The talk is at 11am BST at The Beacon at The Jellicoe, 5 Beaconsfield St, London N1C 4EW.',
  },
  {
    id: 'cvpr-2026',
    title: 'CVPR 2026',
    date: '2026-06-07',
    location: 'Denver, Colorado',
    organiser: 'IEEE/CVF',
    externalUrl: 'https://cvpr.thecvf.com/virtual/2026/poster/37322',
    speaker: 'Jovana Knezevic',
    talk: 'TESSERA: Temporal Embeddings of Surface Spectra for Earth Representation and Analysis',
    description: 'Jovana presented TESSERA at the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR 2026), one of the premier venues in computer vision. The paper was presented as a poster session on 7 June (ExHall F 578, 10:45am–12:45pm PDT).',
  },
  {
    id: 'digital-futures-kth-2026',
    title: 'Digital Futures Seminar',
    date: '2026-05-12',
    location: 'KTH Royal Institute of Technology, Stockholm',
    organiser: 'Digital Futures',
    externalUrl: 'https://www.digitalfutures.kth.se/event/democratizing-earth-observation-with-foundation-models-the-tessera-project-and-embedding-explorer/',
    speaker: 'Srinivasan Keshav',
    talk: 'Democratizing Earth Observation with Foundation Models: The TESSERA Project and Embedding Explorer',
    description: 'Keshav presented TESSERA and the Tessera Embedding Explorer (TEE) at a Digital Futures seminar hosted by KTH Royal Institute of Technology. The talk covered the architectural choices underpinning TESSERA, downstream applications from deforestation detection to habitat mapping, and how TEE enables interactive geospatial analysis without specialized hardware. The seminar (14:30–15:30 CEST) was held at the Digital Futures hub at KTH and streamed via Zoom.',
  },
  {
    id: 'pint-of-science-2026',
    title: 'Pint of Science',
    date: '2026-05-18',
    location: 'Cambridge',
    organiser: 'Pint of Science',
    externalUrl: 'https://pintofscience.co.uk/event/how-is-ai-accelerating-science/',
    speaker: 'Sadiq Jaffer',
    talk: 'Teaching a computer to spot a bush (from space)',
    description: 'Sadiq spoke at the Pint of Science festival as part of an evening of talks on how AI is accelerating science, hosted by the Accelerate Programme for Scientific Discovery at the University of Cambridge. The event ran from 7–9pm at The Station Tavern, Cambridge.',
  },
];
