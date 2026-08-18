export const serviceSlugs = [
  { slug: "megjunaroden-transport", key: "transport" as const, image: "/images/features/feature-transport-network.jpg" },
  { slug: "shpedicija-logistika", key: "forwarding" as const, image: "/images/features/feature-logistics-control.jpg" },
  { slug: "trucking", key: "trucking" as const, image: "/images/features/feature-trucking-system.jpg" },
];

export function getServiceBySlug(slug: string) {
  return serviceSlugs.find((s) => s.slug === slug);
}
