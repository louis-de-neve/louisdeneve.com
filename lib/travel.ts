export interface TravelPost {
  slug: string;
  title: string;
  location: string;
  date: string;
  excerpt: string;
  coverColor: string; // placeholder gradient color for cover image
  content: string;
  images: { alt: string; color: string }[];
}

export const travelPosts: TravelPost[] = [
  {
    slug: "patagonia-2024",
    title: "Patagonia: At the End of the World",
    location: "Torres del Paine, Chile",
    date: "March 2024",
    excerpt:
      "Trekking through the dramatic landscapes of southern Patagonia — wind-battered plains, turquoise glacial lakes, and the iconic granite spires of Torres del Paine.",
    coverColor: "from-sky-600 to-slate-700",
    content: `
Patagonia has a way of making you feel small in the best possible way. The land at the southern tip of South America is raw, elemental, and staggeringly beautiful.

## The W Trek

The classic W Trek through Torres del Paine National Park took us through five days of some of the most varied terrain I've ever walked. Each morning brought a new palette — cerulean glacial lakes, rust-orange pampas, the silvered grey of granite peaks draped in cloud.

## Wildlife Encounters

Guanacos — the wild cousins of the llama — roamed the hillsides with total indifference to our presence. Condors circled lazily overhead, their three-metre wingspans silhouetted against the sky. One afternoon, a puma crossed the trail fifty metres ahead of us; we stood frozen, barely breathing, until it disappeared into the scrub.

## The Light

Patagonian light is unlike anywhere else. The latitude and the unpredictable weather conspire to produce a quality of illumination that photographers dream about: long golden hours that shift rapidly into dramatic storm skies within minutes. I shot almost a thousand frames and kept perhaps fifty.
    `,
    images: [
      { alt: "Torres del Paine spires at sunrise", color: "from-orange-300 to-sky-400" },
      { alt: "Grey Glacier ice field", color: "from-sky-300 to-blue-600" },
      { alt: "Guanacos on the pampas", color: "from-amber-300 to-green-600" },
    ],
  },
  {
    slug: "japan-autumn-2023",
    title: "Autumn Colours in Rural Japan",
    location: "Kyoto & Nikko, Japan",
    date: "November 2023",
    excerpt:
      "Chasing koyo — the Japanese autumn colour season — through ancient temple gardens and forested mountain roads.",
    coverColor: "from-red-500 to-amber-400",
    content: `
The Japanese have a word, *mono no aware* — the pathos of things — a gentle sadness at their transience. Nowhere is this better embodied than in koyo, the autumn leaf season.

## Kyoto

The garden at Tofuku-ji was a sea of maples in every shade from pale lemon to deep crimson. I arrived just before dawn to beat the crowds, my breath misting in the cold air. By 7am the paths were crowded; by midday impenetrable. Those early hours were worth every shivering moment.

## Nikko

Two hours north of Tokyo, Nikko's UNESCO-listed shrines sit within a forest of towering cryptomeria cedars. In autumn, the contrast between the dark, ancient trees and the blazing maple understorey is extraordinary. The Shinkyo Bridge — lacquered vermilion against golden hillsides — became my favourite single frame of the trip.

## Practicalities

The foliage forecast sites (紅葉情報) are genuinely useful — they track the colour front as it moves south from Hokkaido through October and November. Timing your visit to be within that five-day peak window makes an enormous difference.
    `,
    images: [
      { alt: "Maple garden at Tofuku-ji", color: "from-red-400 to-orange-400" },
      { alt: "Shinkyo Bridge in autumn", color: "from-orange-500 to-amber-300" },
      { alt: "Mountain road lined with maples", color: "from-yellow-400 to-red-500" },
    ],
  },
  {
    slug: "morocco-desert-2023",
    title: "Into the Sahara",
    location: "Merzouga, Morocco",
    date: "April 2023",
    excerpt:
      "A camel trek into the Erg Chebbi dunes, sleeping under an impossible sky of stars on the edge of the Sahara.",
    coverColor: "from-amber-500 to-orange-700",
    content: `
The Sahara is not one thing. It is a living landscape of shifting sand, cold night air, and silence so complete it becomes a sound of its own.

## The Dunes of Erg Chebbi

The sand dunes near Merzouga rise to over 150 metres — the largest in Morocco. Climbing the crest at sunset, the light raking across the rippled surface, shadows lengthening in every hollow, is one of those experiences that defeats photography. You try anyway.

## A Night Under the Stars

We camped halfway into the dunes in a small Berber camp — traditional low tents, mint tea, a fire. After dinner the guide turned off the lanterns and we lay on our backs. Without any light pollution the Milky Way was sharp enough to seem three-dimensional, the galactic core a smear of warm gold above the black silhouette of the dunes.

## The Blue City

Chefchaouen, in the Rif Mountains, provided a vivid contrast to the desert. The medina's famously blue-washed alleyways photograph well in the diffuse light of overcast mornings; the colour is said to symbolise the sky and heaven, a reminder to lead a spiritual life.
    `,
    images: [
      { alt: "Erg Chebbi dunes at sunset", color: "from-orange-400 to-red-600" },
      { alt: "Camel caravan silhouette", color: "from-amber-700 to-orange-900" },
      { alt: "Blue alleyways of Chefchaouen", color: "from-blue-400 to-indigo-500" },
    ],
  },
  {
    slug: "norway-fjords-2022",
    title: "The Norwegian Fjords in Winter",
    location: "Lofoten & Geiranger, Norway",
    date: "February 2022",
    excerpt:
      "Searching for the northern lights above snow-covered rorbuer fishing cabins in the Lofoten archipelago.",
    coverColor: "from-indigo-700 to-teal-500",
    content: `
Norway in February is an exercise in patience and warm clothing. The rewards, when they come, are extraordinary.

## Lofoten

The Lofoten islands hang above the Arctic Circle like a jagged jaw of mountains rising straight from the sea. The traditional red and yellow *rorbuer* — fishermen's cabins built on stilts over the water — are incongruously picturesque against their dramatic backdrop. Arriving by overnight ferry from Bodø, I watched the peaks emerge from the dark sea at dawn, each one holding a cap of snow.

## Aurora Hunting

The northern lights are unpredictable. After two cloudy nights, the sky cleared on the third to reveal a display that began as a faint green shimmer on the northern horizon and built, over twenty minutes, into dancing curtains of emerald and magenta that filled the entire sky. I stood on the jetty in -12°C and completely forgot to feel cold.

## The Blue Hour

At this latitude in winter, the sun barely clears the horizon. The landscape spends much of each day in a prolonged blue twilight — a cool, clean, crystalline light that makes every surface luminous. It is the best possible light for photography and profoundly peaceful to simply sit in.
    `,
    images: [
      { alt: "Northern lights over Lofoten rorbuer", color: "from-green-400 to-teal-600" },
      { alt: "Snowy mountain peaks over fjord", color: "from-sky-200 to-indigo-400" },
      { alt: "Red fishing cabins at blue hour", color: "from-red-700 to-indigo-800" },
    ],
  },
];

export function getTravelPost(slug: string): TravelPost | undefined {
  return travelPosts.find((p) => p.slug === slug);
}
