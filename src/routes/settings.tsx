import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/learning-pages";
import { pageHead } from "@/lib/page-head";
export const Route = createFileRoute("/settings")({
  head: () => pageHead("Sozlamalar", "Muallimi Soniy — Sozlamalar va shaxsiy o‘quv tajribasi."),
  component: SettingsPage,
});
