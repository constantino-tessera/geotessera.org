export type ProjectStatus = 'completed' | 'in-progress' | 'planned';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  statusLabel: string;
  region: string;
  tags: string[];
  description: string;
  team: string[];
  stats?: { label: string; value: string }[];
  links?: { label: string; url: string }[];
  hasDetailPage: boolean;
  fundingSources?: string[];
  partners?: string[];
  timeline?: string;
}

export const projects: Project[] = [
  {
    id: 'trentino',
    title: 'High-Resolution Species Mapping in the Italian Alps',
    subtitle: 'Foundation-model embeddings enable species-level tree mapping across 6,200 km\u00B2 of mountainous terrain, substantially outperforming conventional satellite approaches.',
    status: 'completed',
    statusLabel: 'Completed',
    region: 'Trentino, Italy',
    tags: ['Tessera', 'AlphaEarth', '18 species', '10 m resolution', 'Label distillation'],
    description: 'Our flagship project evaluates two geospatial foundation models (Tessera and AlphaEarth) for tree species classification across 6,200 km\u00B2 of the Autonomous Province of Trento. Using parcel-level forest inventories as reference data, we demonstrate that FM embeddings substantially outperform conventional satellite approaches, achieving higher accuracy with far fewer training labels while preserving ecologically meaningful structure aligned with functional and taxonomic groupings.',
    team: ['james-ball', 'jana-wicklein', 'zhengpeng-feng', 'jovana-knezevic', 'clement-atzberger', 'michele-dalponte', 'david-coomes'],
    stats: [
      { label: 'Species classes', value: '18' },
      { label: 'Spatial resolution', value: '10 m' },
      { label: 'Area', value: '6,200 km\u00B2' },
    ],
    links: [
      { label: 'View full results', url: '/projects/trentino' },
      { label: 'Read the story', url: '/news/2026-07-29-trentino-tree-species' },
      { label: 'Read the paper', url: 'https://doi.org/10.1016/j.srs.2026.100466' },
      { label: 'Code on GitHub', url: 'https://github.com/PatBall1/trentino-trees' },
    ],
    hasDetailPage: true,
    fundingSources: ['epic'],
    partners: ['fmach', 'unitn'],
  },
  {
    id: 'cumbria',
    title: 'Mapping Landscape Recovery in Cumbria',
    subtitle: 'Establishing baseline habitat maps across approximately 86,500 hectares encompassing Cumbria\u2019s Landscape Recovery schemes.',
    status: 'in-progress',
    statusLabel: 'In Progress',
    region: 'Cumbria, UK',
    tags: ['86,500 hectares', 'Landscape Recovery', 'CLR funded', 'National Trust'],
    description: 'Establishing baseline habitat maps across approximately 86,500 hectares encompassing Cumbria\u2019s five Landscape Recovery schemes, the Cumbria Connect initiative, and National Trust estates. Using Tessera to classify natural, semi-natural, and farmed habitats from 2017 to 2025, providing essential reference points for tracking 20\u201330 year restoration outcomes. Cumbria accounts for roughly 20% of the total Landscape Recovery area nationally.',
    team: ['amandine-debus', 'barbara-neto-bradley', 'jess-williams', 'david-coomes'],
    hasDetailPage: false,
    fundingSources: ['clr'],
    partners: ['nerc-clr'],
  },
  {
    id: 'cairngorms',
    title: 'Evaluating Rewilding in the Cairngorms',
    subtitle: 'Supporting an ambitious 200-year vision for rewilding across the Cairngorms with Tessera and LiDAR.',
    status: 'in-progress',
    statusLabel: 'In Progress',
    region: 'Cairngorms, Scotland',
    tags: ['Tessera + LiDAR', 'Rewilding', 'CLR funded', '3D habitat mapping'],
    description: 'Supporting the Cairngorm Connect initiative \u2014 an ambitious 200-year vision for rewilding across the Cairngorms \u2014 by integrating Tessera embeddings with Scotland\u2019s National LIDAR Programme. The combination of continuous spectral-temporal monitoring with structural 3D data enables automated assessment of ecosystem recovery trajectories, distinguishing between spectrally similar but structurally distinct habitats.',
    team: ['amandine-debus', 'barbara-neto-bradley', 'jess-williams', 'david-coomes'],
    hasDetailPage: false,
    fundingSources: ['clr'],
    partners: ['nerc-clr'],
  },
  {
    id: 'weather-downscaling',
    title: 'Sharpening Local Weather Predictions',
    subtitle: 'Tessera embeddings describe the land surface for probabilistic weather downscaling, improving temperature and wind speed predictions at precise off-grid locations.',
    status: 'in-progress',
    statusLabel: 'In Progress',
    region: 'Global',
    tags: ['Tessera', 'Weather downscaling', 'Five regions', 'Off-grid prediction', 'ConvCNP'],
    description: 'Weather forecasts come on coarse grids of roughly 25 km, yet conditions vary sharply within a single cell. Downscaling corrects that forecast down to a precise off-grid point, guided by a descriptor of the surface there. Led by first-year PhD student Pedro Sousa in collaboration with Richard Turner\u2019s group in the Department of Engineering, this project uses a Tessera embedding as that descriptor, in place of the coarse ERA5 surface fields that had stood in as rough proxies and alongside the existing elevation descriptor. Preliminary results show improvements in both 2 m temperature and 10 m wind speed, across five climatically diverse regions.',
    // 'Will Tebbutt' and 'Richard E. Turner' are Department of Engineering collaborators
    // not yet in people.ts; the names render as written until entries are added there.
    team: ['pedro-sousa', 'Will Tebbutt', 'sadiq-jaffer', 'robin-young', 'anil-madhavapeddy', 'Richard E. Turner'],
    stats: [
      { label: 'Temperature skill (CRPS)', value: '+11.5%' },
      { label: 'Wind speed skill (CRPS)', value: '+6.2%' },
    ],
    links: [
      { label: 'Read the paper', url: 'https://arxiv.org/abs/2608.12271' },
      { label: 'Read the explainer', url: 'https://anil.recoil.org/notes/weather-downscaling-tessera' },
    ],
    hasDetailPage: false,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getFeaturedProjects(count = 3): Project[] {
  const order: ProjectStatus[] = ['completed', 'in-progress', 'planned'];
  return [...projects]
    .sort((a, b) => order.indexOf(a.status) - order.indexOf(b.status))
    .slice(0, count);
}
