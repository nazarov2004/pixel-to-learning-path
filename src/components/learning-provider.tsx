import { createContext, useContext, useState, type ReactNode } from "react";
export type Correction = {
  id: string;
  lessonId: string;
  original: string;
  proposed: string;
  explanation: string;
  status: "Pending";
};
type LearningState = {
  completed: string[];
  complete: (id: string) => void;
  recent: string[];
  openLesson: (id: string) => void;
  zoom: number;
  setZoom: (n: number) => void;
  theme: string;
  setTheme: (t: string) => void;
  spacious: boolean;
  setSpacious: (v: boolean) => void;
  reports: Correction[];
  report: (r: Correction) => void;
  completedTests: number;
  finishTest: () => void;
};
const LearningContext = createContext<LearningState | null>(null);
export function LearningProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [zoom, setZoom] = useState(1);
  const [theme, setTheme] = useState("light");
  const [spacious, setSpacious] = useState(true);
  const [reports, setReports] = useState<Correction[]>([]);
  const [completedTests, setCompletedTests] = useState(0);
  return (
    <LearningContext.Provider
      value={{
        completed,
        complete: (id) => setCompleted((v) => (v.includes(id) ? v : [...v, id])),
        recent,
        openLesson: (id) => setRecent((v) => [id, ...v.filter((x) => x !== id)].slice(0, 3)),
        zoom,
        setZoom,
        theme,
        setTheme,
        spacious,
        setSpacious,
        reports,
        report: (r) => setReports((v) => [...v, r]),
        completedTests,
        finishTest: () => setCompletedTests((v) => v + 1),
      }}
    >
      <div data-theme={theme}>{children}</div>
    </LearningContext.Provider>
  );
}
export function useLearning() {
  const value = useContext(LearningContext);
  if (!value) throw new Error("LearningProvider is required");
  return value;
}
