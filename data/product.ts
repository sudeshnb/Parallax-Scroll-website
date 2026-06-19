export const product = {
  name: "Celon Black Tea",
  tagline: "The Ultimate Freeze.",
  price: "LKR 2000.00",
  colors: [
    { name: "Arctic Blue", hex: "#0072BC" },
    { name: "Racing Red", hex: "#E31C23" },
    { name: "White", hex: "#FFFFFF" },
  ],
  assets: {
    staticBottle: "/animations/prime-bottle-static.json",
    lottiePath: "/animations/bottle-spin.json",
    totalFrames: 189,
  },
  storySections: [
    {
      id: "arctic-blast",
      title: "The Arctic Blast",
      subtitle: "Engineered at the edge of cold.",
      description:
        "Born from icy innovation, Prime Ice Pop delivers an instant, full-body freeze. Feel the chill before you even take a sip.",
      frameRange: [1, 80],
      align: "left" as const,
    },
    {
      id: "triple-flavor",
      title: "Triple Flavor Threat.",
      subtitle: "Three flavors. One unstoppable formula.",
      description:
        "Arctic Blue, Racing Red, and Pure White — each flavor a distinct explosion of taste designed to push you to your limit.",
      frameRange: [81, 160],
      align: "right" as const,
    },
    {
      id: "zero-sugar",
      title: "Zero Sugar. Pure Fuel.",
      subtitle: "No compromise. All performance.",
      description:
        "834mg of electrolytes. 250mg of BCAAs. 10% real coconut water. All signal, zero noise. Fuel engineered for champions.",
      frameRange: [161, 240],
      align: "left" as const,
    },
  ],
  postSections: [
    {
      id: "hydration-specs",
      eyebrow: "Hydration Science",
      title: "Electrolytes Engineered.",
      subtitle: "Every drop is deliberate.",
      description:
        "Our proprietary electrolyte matrix — sodium, potassium, magnesium, and calcium — is calibrated for peak absorption speed, ensuring your body gets what it needs the moment it needs it. Not just hydration. Precision hydration.",
      stats: [
        { value: "834mg", label: "Electrolytes" },
        { value: "10%", label: "Coconut Water" },
        { value: "0g", label: "Sugar" },
        { value: "30kcal", label: "Calories" },
      ],
      align: "left" as const,
    },
    {
      id: "athlete-tested",
      eyebrow: "Performance Lab",
      title: "Athlete Tested. Champion Approved.",
      subtitle: "Built for those who push limits.",
      description:
        "250mg of BCAAs fuel muscle recovery mid-performance. Whether you're sprinting the final 100m or grinding through hour three, Prime Ice Pop delivers sustained energy without the crash. Real athletes. Real results.",
      stats: [
        { value: "250mg", label: "BCAAs" },
        { value: "3x", label: "Faster Recovery" },
        { value: "#1", label: "Hydration Brand" },
        { value: "200M+", label: "Bottles Sold" },
      ],
      align: "right" as const,
    },
    {
      id: "get-prime",
      eyebrow: "Ready.",
      title: "The Ultimate Freeze.",
      subtitle: "Hydrate now. Perform beyond.",
      align: "left" as const,
      description:
        "834mg electrolytes, 250mg BCAAs, 10% coconut water. Zero sugar. Join the champions who fuel their performance with Prime Ice Pop.",
    },
  ],
};

export type Product = typeof product;
export type StorySection = (typeof product.storySections)[0];
export type PostSection = (typeof product.postSections)[0];
