/** Events where Tessera team members are presenting or have a significant presence.
 *  Ordered latest-date-first (same convention as blog-links.ts).
 *
 *  Linking logic (list page):
 *    - id only              → links to internal /events/[id] page
 *    - externalUrl only     → links directly to external site (new tab)
 *    - id + externalUrl     → list page links to /events/[id];
 *                             externalUrl appears on the detail page
 *
 *  links: optional array of labelled URLs shown on the detail page
 *  (video recordings, blog posts, slides, event pages, etc.)
 *  The first link is also used as the list-page fallback if there is no slug.
 */
export interface EventLink {
  label: string;
  url: string;
}

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
  /** Labelled links shown on the detail page (video, blog post, slides, event page…).
   *  If there is no slug, the first link is used as the list-page href. */
  links?: EventLink[];
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
    id: 'oemc-global-workshop-2026',
    title: 'Open-Earth-Monitor Global Workshop 2026',
    date: '2026-10-07',
    dateEnd: '2026-10-09',
    location: 'Barcelona, Spain',
    organiser: 'OpenGeoHub / Open-Earth-Monitor',
    image: '/events/oemc-frank-feng.png',
    links: [
      { label: 'Event page', url: 'https://earthmonitor.org/global-workshop-2026/' },
    ],
    speaker: 'Zhengpeng (Frank) Feng',
    talk: 'TESSERA: A Foundation Model for Label-Efficient and Multi-Modal Earth Observation at Scale',
    description: 'Frank is a keynote speaker at the Open-Earth-Monitor Global Workshop 2026, which brings together experts in Earth observation, GeoAI, climate intelligence, and open-source geospatial technologies to showcase the final outputs of the Horizon Europe Open-Earth-Monitor project. His keynote on Tessera runs 10:30–11:00am on Day 3 (Friday 9 October). He is also co-leading a 45-minute hands-on workshop, "Working with and visualizing GeoFoundational AI embeddings", with Mike Harfoot, on Day 2 (Thursday 8 October), 14:45–15:30.',
  },
  {
    id: 'ai4good-geoai-2026',
    title: 'AI for Good Global Summit — GeoAI Workshop',
    date: '2026-07-07',
    location: 'Geneva, Switzerland',
    organiser: 'ITU / AI for Good',
    links: [
      { label: 'Event page', url: 'https://aiforgood.itu.int/event/geoai-for-our-shared-future-geospatial-foundation-models-and-generative-intelligence-for-people-and-the-planet/' },
    ],
    speaker: 'Zhengpeng (Frank) Feng',
    talk: 'TESSERA: A Foundation Model for Label-Efficient and Multi-Modal Earth Observation',
    description: "Frank will present Tessera at the GeoAI for Our Shared Future workshop, part of the AI for Good Global Summit. The workshop (14:00–17:15 CEST) brings together UN agencies, academia, and the private sector to explore geospatial foundation models and generative AI. Frank's talk is in Session 2: Emerging State-of-the-Art Academic Research.",
  },
  {
    id: 'eo-summit-2026',
    title: 'EO Summit 2026',
    date: '2026-06-22',
    location: 'The Brewery, London',
    organiser: 'EO Summit',
    links: [
      { label: 'Agenda', url: 'https://www.eosummit.com/2026-agenda' },
    ],
    speaker: 'Madeline Lisaius',
    talk: 'Tessera and agriculture (lightning talk)',
    description: "Madeline leads a lightning talk on Tessera's applications in agriculture as part of the Innovation Track (Side Stage), 4–5pm, at EO Summit 2026 — a user-focused, application-driven Earth observation conference bringing together the EO community across insurance, energy, agriculture, and climate sectors.",
  },
  {
    id: 'ml4eo-2026',
    title: 'ML4EO 2026',
    date: '2026-06-22',
    dateEnd: '2026-06-24',
    location: 'University of Exeter',
    organiser: 'ML4EO',
    links: [
      { label: 'Workshop details', url: 'https://ml4eo.org/workshops/' },
      { label: 'Programme', url: 'https://ml4eo.org/programme/' },
    ],
    speaker: 'Zhengpeng (Frank) Feng',
    talk: 'Introduction to the TESSERA Geospatial Foundation Model: Hands-on Earth Intelligence with Embedding-as-Data',
    description: "Frank will lead a hands-on workshop on Tessera as part of Workshop Slot 1 at ML4EO 2026 (Monday 22 June, 9:00am, room PCC 2.6, Peter Chalk Centre). Participants will use the GeoTessera Python library to retrieve embeddings for a region of their choice, explore them interactively using the Tessera Embeddings Explorer, and train a lightweight classifier — all without a GPU or cloud account.",
  },
  {
    id: 'isprs-2026',
    title: 'ISPRS 2026',
    date: '2026-07-05',
    location: 'Toronto, Canada',
    organiser: 'ISPRS',
    links: [
      { label: 'Session page', url: 'https://program.isprs2026.org/index4499.html?page=browseSessions&path=adminSessions&print=export&ismobile=false&form_date=all&form_session=118&mode=list&presentations=show' },
    ],
    speaker: 'Madeline Lisaius',
    talk: 'Towards improved crop type classification: a compact embedding approach suitable for small fields',
    description: 'Madeline will present this paper at Session ThS16: Earth Embeddings — Investigating Accurate and Accessible Deep Geospatial Feature Representations (room 717A, 12:45–1:00pm local time). The paper, co-authored with Andrew Blake, Clement Atzberger, and Srinivasan Keshav, shows that Tessera embeddings outperform standard approaches for crop type classification in small field systems, achieving higher F1 scores across 5 of 7 crop types while using just 8% of the compute of raw data methods.',
  },
  {
    id: 'pixel-seminar-2026',
    title: 'PIXEL Seminar Series',
    date: '2026-06-25',
    location: 'Online',
    organiser: 'Imago',
    links: [
      { label: 'Event page', url: 'https://imago.ac.uk/events/pixel-seminar-series-tessera-a-foundation-model-for-label-efficient-and-multi-modal-earth-observation-at-scale' },
    ],
    speaker: 'Zhengpeng (Frank) Feng',
    talk: 'TESSERA: A Foundation Model for Label-Efficient and Multi-Modal Earth Observation at Scale',
    description: 'Frank will present Tessera at the PIXEL Seminar Series, hosted by the Imago Data Service for Imagery. The talk runs from 2–3pm BST.',
  },
  {
    id: 'cng-london-2026',
    title: 'CNG London',
    date: '2026-06-23',
    location: 'London',
    organiser: 'Cloud-Native Geospatial Forum',
    links: [
      { label: 'Event page', url: 'https://cloudnativegeo.org/events/cng-london' },
    ],
    speaker: 'Anil Madhavapeddy',
    talk: 'TESSERA: Pixelwise Embeddings of Earth Observations',
    description: 'Anil will present Tessera at the Cloud-Native Geospatial Forum (CNG) London meetup. The talk is at 11am BST at The Beacon at The Jellicoe, 5 Beaconsfield St, London N1C 4EW.',
  },
  {
    id: 'digital-forestry-purdue-2026',
    title: 'Applications & Solutions in Digital Forestry International Conference',
    date: '2026-06-04',
    dateEnd: '2026-06-05',
    location: 'Purdue University, West Lafayette, Indiana',
    organiser: 'Institute for Digital Forestry',
    links: [
      { label: 'Conference programme', url: 'https://ag.purdue.edu/digital-forestry/conferences/conference-program.html' },
    ],
    speaker: 'David Coomes',
    talk: 'Geospatial Foundation Models to Transform Forest Resilience',
    description: 'David gave a plenary talk at the Applications & Solutions in Digital Forestry International Conference, hosted by the Institute for Digital Forestry at Purdue University. His talk was part of Plenary Session 2: Forest Health, Resilience & Climate Applications (4–5pm, PMU North Ballroom), alongside speakers from Purdue and the US Forest Service.',
  },
  {
    id: 'cvpr-2026',
    title: 'CVPR 2026',
    date: '2026-06-07',
    location: 'Denver, Colorado',
    organiser: 'IEEE/CVF',
    links: [
      { label: 'Abstract', url: 'https://cvpr.thecvf.com/virtual/2026/poster/37322' },
      { label: 'Blog post', url: 'https://geotessera.org/blog/2026-06-04-cvpr-earth-intelligence' },
    ],
    speaker: 'Jovana Knezevic',
    talk: 'TESSERA: Temporal Embeddings of Surface Spectra for Earth Representation and Analysis',
    description: 'Jovana presented Tessera at the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR 2026), one of the premier venues in computer vision. The paper was presented as a poster session on 7 June (ExHall F 578, 10:45am–12:45pm PDT).',
  },
  {
    id: 'pint-of-science-2026',
    title: 'Pint of Science',
    date: '2026-05-18',
    location: 'Cambridge',
    organiser: 'Pint of Science',
    links: [
      { label: 'Event page', url: 'https://pintofscience.co.uk/event/how-is-ai-accelerating-science/' },
    ],
    speaker: 'Sadiq Jaffer',
    talk: 'Teaching a computer to spot a bush (from space)',
    description: 'Sadiq spoke at the Pint of Science festival as part of an evening of talks on how AI is accelerating science, hosted by the Accelerate Programme for Scientific Discovery at the University of Cambridge. The event ran from 7–9pm at The Station Tavern, Cambridge.',
  },
  {
    id: 'digital-futures-kth-2026',
    title: 'Digital Futures Seminar',
    date: '2026-05-12',
    location: 'KTH Royal Institute of Technology, Stockholm',
    organiser: 'Digital Futures',
    links: [
      { label: 'Event page', url: 'https://www.digitalfutures.kth.se/event/democratizing-earth-observation-with-foundation-models-the-tessera-project-and-embedding-explorer/' },
    ],
    speaker: 'Srinivasan Keshav',
    talk: 'Democratizing Earth Observation with Foundation Models: The TESSERA Project and Embedding Explorer',
    description: 'Keshav presented Tessera and the Tessera Embedding Explorer (TEE) at a Digital Futures seminar hosted by KTH Royal Institute of Technology. The talk covered the architectural choices underpinning Tessera, downstream applications from deforestation detection to habitat mapping, and how TEE enables interactive geospatial analysis without specialized hardware. The seminar (14:30–15:30 CEST) was held at the Digital Futures hub at KTH and streamed via Zoom.',
  },
  {
    id: 'fp-launchpad-2026',
    title: 'FP Launchpad Kickoff',
    date: '2026-04-13',
    location: 'IIT Madras, Chennai',
    organiser: 'FP Launchpad',
    links: [
      { label: 'Watch video', url: 'https://www.youtube.com/watch?v=-tBv-j5IbmM' },
      { label: 'Blog post', url: 'https://geotessera.org/blog/2026-05-01-fp-launchpad-iit-madras' },
      { label: 'Event page', url: 'https://fplaunchpad.org/2026/03/30/fp-launchpad-kickoff.html' },
      { label: "Anil's notes", url: 'https://anil.recoil.org/notes/fpl-launch' },
    ],
    speaker: 'Anil Madhavapeddy',
    talk: 'TESSERA: Functionally Programming Petabytes of Earth Observations',
    description: "Anil closed out the FP Launchpad kickoff event at IIT Madras with a talk on Tessera, arguing that functional programming has a serious role to play in planetary computing. The talk covered Tessera's Zarr v3 cloud-native storage, the geotessera Python library, the TZE interactive explorer, and the experimental OxCaml inference pipeline, with live demos of downstream applications from ecological monitoring to urban analysis.",
  },
  {
    id: 'restoration-dialogue-2026',
    title: 'Restoration Dialogue Workshop',
    date: '2026-03-22',
    dateEnd: '2026-03-23',
    location: 'Cambridge',
    organiser: 'Centre for Landscape Regeneration',
    links: [
      { label: 'Blog post', url: 'https://geotessera.org/blog/2026-03-23-restoration-dialogue-workshop' },
      { label: 'LinkedIn post', url: 'https://www.linkedin.com/posts/centre-for-landscape-regeneration_geospatialfoundationmodels-earthobservation-activity-7442962745634914304-Dg2w/' },
    ],
    speaker: 'David Coomes',
    talk: 'AI and Habitat Monitoring in the UK',
    description: 'The Centre for Landscape Regeneration hosted a two-day Restoration Dialogue workshop in Cambridge, funded by the Endangered Landscapes & Seascapes Programme (ELSP). Over 30 participants from universities, statutory agencies, and NGOs gathered to discuss advances in habitat monitoring. David presented Tessera\'s capabilities for habitat classification, change detection, and temporal analysis, and explored how these tools might integrate into existing monitoring workflows for landscape regeneration and nature restoration.',
  },
  {
    id: 'ai4good-intro-2026',
    title: 'Introduction to TESSERA',
    date: '2026-01-22',
    location: 'Online',
    organiser: 'AI for Good',
    links: [
      { label: 'Watch video', url: 'https://youtu.be/9yrpwFrwbGY?t=645' },
      { label: 'Event page', url: 'https://aiforgood.itu.int/event/introduction-to-tessera-time-series-embeddings-for-geospatial-analysis/' },
    ],
    speaker: 'Zhengpeng (Frank) Feng',
    talk: 'Introduction to TESSERA: Time-series embeddings for geospatial analysis',
    description: "Frank presented an introduction to Tessera at this AI for Good webinar — the first of a two-session series, with a hands-on workshop following on 2 February 2026. The talk introduced Tessera's architecture and self-supervised training strategy, and showed how spectral-temporal signals are preserved in its 128-dimensional embeddings for label-efficient geospatial applications.",
  },
  {
    id: 'conservation-evidence-2026',
    title: 'Delivering Effective Conservation Practice',
    date: '2026-01-16',
    location: 'Cambridge',
    organiser: 'Conservation Evidence',
    links: [
      { label: 'Watch video', url: 'https://crank.recoil.org/w/cheQBkBfSsZwGZP6F3jtaa' },
      { label: 'Blog post', url: 'https://about.conservationevidence.com/2026/01/16/geospatial-foundation-models/' },
    ],
    speaker: 'Anil Madhavapeddy',
    talk: 'How AI Could Transform Conservation',
    description: "Anil presented Tessera at a workshop hosted by Conservation Evidence, attended by the science leads of the UK's statutory nature conservation bodies (JNCC, Natural England, Natural Resources Wales, NatureScot, and the Northern Ireland Environment Agency). The session explored how geospatial foundation models could improve conservation effectiveness and evidence-based decision-making.",
  },
  {
    id: 'ieee-grss-2025',
    title: 'IEEE GRSS Webinar',
    date: '2025-12-12',
    location: 'Online',
    organiser: 'IEEE GRSS',
    links: [
      { label: 'Watch video', url: 'https://www.youtube.com/watch?v=J-QLuX9xcsI' },
    ],
    speaker: 'Zhengpeng (Frank) Feng',
    talk: 'TESSERA: Precomputed FAIR Global Pixel Embeddings for Earth Representation and Analysis',
    description: 'Frank presented Tessera at a webinar sponsored by the IEEE Geoscience and Remote Sensing Society (GRSS) Earth Science Informatics (ESI) Technical Committee. The webinar (15:00 UTC) introduced the Tessera embeddings as a FAIR-compliant open data product for Earth observation.',
  },
  {
    id: 'ecosystem-resilience-2025',
    title: 'Foundational AI to Forecast Ecosystem Resilience',
    date: '2025-11-24',
    location: 'Cambridge',
    organiser: 'Cambridge CL EEG',
    links: [
      { label: 'Watch video', url: 'https://watch.eeg.cl.cam.ac.uk/w/hanDLh2nzjXY4yL1akVEYh' },
    ],
    speaker: 'Srinivasan Keshav, David A. Coomes',
    talk: 'Foundational AI to Forecast Ecosystem Resilience',
    description: 'Keshav and David Coomes presented at a workshop hosted at Pembroke College, Cambridge, on applying foundational AI methods to predict ecosystem health and resilience. The session brought together ecologists and computer scientists to explore how Tessera embeddings can inform conservation forecasting.',
  },
  {
    id: 'propl-2025',
    title: "PROPL'25 at ICFP/SPLASH",
    date: '2025-10-05',
    location: 'Singapore',
    organiser: "PROPL'25",
    links: [
      { label: 'Watch video', url: 'https://watch.eeg.cl.cam.ac.uk/w/trq77gFwc8ZbUeGqyDpzN7' },
    ],
    speaker: 'Sadiq Jaffer',
    talk: 'Challenges in Practice: Building a Usable Library for Planetary-Scale Embeddings',
    description: "Sadiq presented at the Programming for the Planet (PROPL) workshop, co-located with ICFP/SPLASH 2025 in Singapore. The talk demonstrated how geotessera makes planetary-scale remote sensing accessible through a practical Python library, including a live solar farm classification demo.",
  },
];
