import { HorizontalGallery } from "@/components/reel/HorizontalGallery";
import { work } from "@/content/work";

export const metadata = { title: "Work" };

export default function ReelHomePage() {
  return <HorizontalGallery projects={work} />;
}
