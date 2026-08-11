import { HorizontalGallery } from "@/components/reel-warm/HorizontalGallery";
import { work } from "@/content/work";

export const metadata = { title: "Work" };

export default function ReelWarmHomePage() {
  return <HorizontalGallery projects={work} />;
}
