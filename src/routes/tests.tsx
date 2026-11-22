import { createFileRoute } from "@tanstack/react-router";
import { TestsPage } from "@/components/learning-pages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/tests")({
  head: () => pageHead("Testlar", "Muallimi Soniy — Testlar va shaxsiy o‘quv tajribasi."),
  component: TestsPage,
});
