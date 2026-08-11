import { HorizontalGallery } from "@/components/reel-warm/HorizontalGallery";
import { work } from "@/content/work";

export default function ReelWarmHomePage() {
  return <HorizontalGallery projects={work} />;
}
