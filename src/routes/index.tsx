import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/learning-pages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Bosh sahifa",
      "Muallimi Soniy bilan arab alifbosi, harakatlar va tajvidni qadamma-qadam o‘rganing.",
    ),
  component: HomePage,
});
