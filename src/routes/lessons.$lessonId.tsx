import { createFileRoute } from "@tanstack/react-router";
import { LessonPage } from "@/components/learning-pages";
import { lessons } from "@/lib/learning-content";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/lessons/$lessonId")({
  head: ({ params }) =>
    pageHead(
      lessons.find((l) => l.id === params.lessonId)?.title ?? "Dars topilmadi",
      "Asl kitobdan izohlar va arabcha misollar bilan interaktiv o‘qish.",
    ),
  component: Page,
});
function Page() {
  const { lessonId } = Route.useParams();
  return <LessonPage id={lessonId} />;
}
