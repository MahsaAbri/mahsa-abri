import { PageTitle } from "@/components/classic/PageTitle";
import { WorkGrid } from "@/components/classic/WorkGrid";
import { work } from "@/content/work";

export const metadata = { title: "Work" };

export default function ClassicWorkPage() {
  return (
    <>
      <PageTitle>Work</PageTitle>
      <WorkGrid projects={work} />
    </>
  );
}
