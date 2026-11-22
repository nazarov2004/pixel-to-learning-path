import { createFileRoute } from "@tanstack/react-router";
import { LessonsPage } from "@/components/learning-pages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/lessons/")({
  head: () =>
    pageHead(
      "Darslar",
      "Muallimi Soniy kitobi asosidagi tartibli arab tili darslari va manba sahifalari.",
    ),
  component: LessonsPage,
});
