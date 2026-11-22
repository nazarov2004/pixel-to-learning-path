import { createFileRoute } from "@tanstack/react-router";
import { SuralarPage } from "@/components/learning-pages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/suralar")({
  head: () => pageHead("Suralar", "Muallimi Soniy — Suralar va shaxsiy o‘quv tajribasi."),
  component: SuralarPage,
});
