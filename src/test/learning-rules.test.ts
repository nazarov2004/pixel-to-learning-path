import { describe, expect, it } from "vitest";
import { clampZoom, lessons, questions, scoreAnswers } from "@/lib/learning-content";
describe("Textbook learning rules", () => {
  it("never publishes uncertain Arabic examples", () => {
    expect(lessons.filter((l) => l.status === "review").every((l) => l.examples.length === 0)).toBe(
      true,
    );
    expect(lessons.find((l) => l.id === "alphabet")?.examples).toContain("ا");
  });
  it("keeps the verified fatha example and source page", () => {
    expect(lessons.find((l) => l.id === "alif")?.examples).toEqual(["اَ", "اِ", "اُ"]);
    expect(lessons.find((l) => l.id === "alif")?.page).toBe(3);
  });
  it("preserves ha and the lam-alif combination from the source chart", () => {
    const alphabet = lessons.find((l) => l.id === "alphabet");
    expect(alphabet?.examples).toContain("ه");
    expect(alphabet?.examples).toContain("لا");
    expect(alphabet?.examples.length).toBe(29);
  });
  it("scores concrete textbook recognition answers", () => {
    expect(scoreAnswers([1, 2, 2, 2, 0])).toBe(5);
    expect(scoreAnswers([0, 0, 0, 0, 1])).toBe(0);
    expect(questions[0]?.options[1]).toBe("ا");
  });
  it("bounds uniform example zoom", () => {
    expect(clampZoom(-1)).toBe(0);
    expect(clampZoom(5)).toBe(4);
    expect(clampZoom(2)).toBe(2);
  });
});
