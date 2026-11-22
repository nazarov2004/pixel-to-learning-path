import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Check,
  CheckCheck,
  ChevronRight,
  Clock3,
  Flag,
  Headphones,
  Library,
  ListChecks,
  Minus,
  Plus,
  Search,
  Sparkles,
  Trophy,
  TrendingUp,
  X,
  Volume2,
  UserRound,
  Sun,
  Moon,
  Monitor,
  CircleHelp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useLearning } from "@/components/learning-provider";
import { chapters, lessons, questions, scoreAnswers, clampZoom } from "@/lib/learning-content";
import book from "@/assets/learning-book.png.asset.json";
export function HomePage() {
  const state = useLearning();
  const current = lessons.find((l) => l.id === state.recent[0]) ?? lessons[0];
  return (
    <main className="page dashboard">
      <div className="page-heading">
        <div>
          <div className="eyebrow">ILM SARI BIR QADAM</div>
          <h1>
            Assalomu alaykum! <span className="greeting-dot">✦</span>
          </h1>
          <p>Arab tilini o‘rganish yo‘lingizga xush kelibsiz.</p>
        </div>
        <span className="date-label">
          <span className="status-dot" /> Bugun o‘rganish uchun ajoyib kun
        </span>
      </div>
      <section className="welcome-band">
        <img src={book.url} alt="Ko‘k muqovali ochiq kitob" />
        <div className="welcome-copy">
          <span className="small-label">
            <Sparkles size={14} /> BILIM BILAN YUKSALING
          </span>
          <h2>
            Katta yo‘l kichik
            <br />
            qadamdan boshlanadi.
          </h2>
          <p>
            Har bir harf — yangi bilim.
            <br />
            Muallimi Soniy bilan arab yozuvini kashf eting.
          </p>
          <Button asChild size="lg">
            <Link to="/lessons/$lessonId" params={{ lessonId: "alphabet" }}>
              Birinchi darsni boshlash <ArrowRight />
            </Link>
          </Button>
          <span className="welcome-note">
            <BookOpen size={13} /> Asl kitob asosida tayyorlangan darslar
          </span>
        </div>
      </section>
      <div className="stats-grid">
        <Stat
          icon={BookOpen}
          label="O‘rganilgan darslar"
          value={String(state.completed.length).padStart(2, "0")}
          detail="Har bir dars — yangi qadam"
          tone="blue"
        />
        <Stat
          icon={TrendingUp}
          label="Umumiy natija"
          value={`${Math.round((state.completed.length / lessons.length) * 100)}%`}
          detail="Bilimingizni bosqichma-bosqich oshiring"
          tone="teal"
        />
        <Stat
          icon={ListChecks}
          label="Bajarilgan testlar"
          value={String(state.completedTests).padStart(2, "0")}
          detail="O‘zingizni sinab ko‘ring"
          tone="coral"
        />
      </div>
      <div className="dashboard-columns">
        <section>
          <SectionHeading title="O‘rganishni davom ettiring" />
          <Link
            to="/lessons/$lessonId"
            params={{ lessonId: current?.id ?? "alphabet" }}
            className="continue-card"
          >
            <span className="letter-tile blue" lang="ar">
              ا
            </span>
            <div className="min-w-0">
              <div className="eyebrow">01-BO‘LIM · ARAB ALIFBOSI</div>
              <h3>{current?.title}</h3>
              <p>
                <Clock3 size={13} /> {current?.examples.length} ta misol <span>·</span> PDF{" "}
                {current?.page}-sahifa
              </p>
            </div>
            <span className="round-arrow">
              <ArrowRight size={19} />
            </span>
          </Link>
          <SectionHeading title="O‘quv bo‘limlari" link="Barchasini ko‘rish" />
          <div className="course-grid">
            {chapters.map((c, i) => (
              <Link to="/lessons" key={c.id} className="course-card">
                <div className="course-card-top">
                  <span className={`letter-tile ${c.tone}`} lang="ar">
                    {c.symbol}
                  </span>
                  <span className="chapter-number">0{i + 1}</span>
                </div>
                <h3>{c.title}</h3>
                <p>{c.subtitle}</p>
                <div className="course-card-bottom">
                  <span>{lessons.filter((l) => l.chapter === c.id).length} ta dars</span>
                  <ArrowRight size={17} />
                </div>
              </Link>
            ))}
          </div>
        </section>
        <aside className="dashboard-aside">
          <section className="journey-panel">
            <div className="aside-heading">
              <h3>Sizning o‘quv yo‘lingiz</h3>
              <TrendingUp size={17} />
            </div>
            <div className="progress-summary">
              <span>
                {state.completed.length}
                <small> / {lessons.length} dars</small>
              </span>
              <b>{Math.round((state.completed.length / lessons.length) * 100)}%</b>
            </div>
            <div className="progress-track">
              <div style={{ width: `${(state.completed.length / lessons.length) * 100}%` }} />
            </div>
            <div className="journey-list">
              {chapters.map((c, i) => (
                <div key={c.id}>
                  <span className={"journey-node " + (i === 0 ? "current" : "")}>
                    {i === 0 ? <BookOpen size={14} /> : i + 1}
                  </span>
                  <span>
                    <strong>{c.title}</strong>
                    <small>{i === 0 ? "O‘rganishga tayyor" : "Keyingi bosqich"}</small>
                  </span>
                  {i === 0 && <span className="tiny-badge">Boshlash</span>}
                </div>
              ))}
            </div>
          </section>
          <section className="test-prompt">
            <span className="test-prompt-icon">
              <Trophy size={23} />
            </span>
            <h3>Bilimingizni sinab ko‘ring</h3>
            <p>Harflarni qay darajada taniysiz?</p>
            <Button variant="outline" asChild>
              <Link to="/tests">
                Testni boshlash <ArrowRight />
              </Link>
            </Button>
          </section>
          <section className="recent-section">
            <h3>So‘nggi ochilgan darslar</h3>
            {state.recent.length ? (
              state.recent.map((id) => {
                const l = lessons.find((x) => x.id === id);
                return (
                  <Link key={id} to="/lessons/$lessonId" params={{ lessonId: id }}>
                    <BookOpen size={16} />
                    {l?.title}
                    <ChevronRight size={15} />
                  </Link>
                );
              })
            ) : (
              <div className="recent-empty">
                <Clock3 size={19} />
                <p>Birinchi darsingiz shu yerda paydo bo‘ladi.</p>
              </div>
            )}
          </section>
        </aside>
      </div>
    </main>
  );
}
function Stat({
  icon: Icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
  detail: string;
  tone: string;
}) {
  return (
    <div className="stat">
      <span className={`stat-icon ${tone}`}>
        <Icon size={21} />
      </span>
      <div>
        <span className="stat-label">{label}</span>
        <div className="stat-value">{value}</div>
        <small>{detail}</small>
      </div>
    </div>
  );
}
function SectionHeading({ title, link }: { title: string; link?: string }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {link && (
        <Link to="/lessons">
          {link}
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}
export function LessonsPage() {
  const [search, setSearch] = useState("");
  const [chapter, setChapter] = useState(0);
  const { completed } = useLearning();
  const filtered = lessons.filter(
    (l) =>
      (chapter === 0 || l.chapter === chapter) &&
      (l.title + " " + l.description).toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <main className="page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">O‘QUV KUTUBXONASI</div>
          <h1>Darslar</h1>
          <p>Harfdan ravon o‘qishgacha — qadamma-qadam.</p>
        </div>
        <div className="count-label">
          <Library size={17} /> {lessons.length} ta dars
        </div>
      </div>
      <div className="catalog-toolbar">
        <div className="filter-tabs">
          <Button variant={chapter === 0 ? "default" : "ghost"} onClick={() => setChapter(0)}>
            Barchasi
          </Button>
          {chapters.map((c) => (
            <Button
              key={c.id}
              variant={chapter === c.id ? "default" : "ghost"}
              onClick={() => setChapter(c.id)}
            >
              {c.title}
            </Button>
          ))}
        </div>
        <label className="search-field">
          <Search size={17} />
          <input
            aria-label="Dars qidirish"
            placeholder="Dars qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
      <div className="source-notice">
        <BookOpen size={17} />
        <span>Muallimi Soniy · PDF sahifalari saqlangan. Noaniq matnlar tahririy tekshiruvda.</span>
      </div>
      {chapters
        .filter((c) => chapter === 0 || c.id === chapter)
        .map((c) => {
          const list = filtered.filter((l) => l.chapter === c.id);
          return list.length ? (
            <section className="catalog-section" key={c.id}>
              <div className="section-heading">
                <h2>
                  <span className={`chapter-icon ${c.tone}`}>0{c.id}</span>
                  {c.title}
                </h2>
                <span>{list.length} ta dars</span>
              </div>
              <div className="lesson-list">
                {list.map((l, i) => (
                  <Link
                    to="/lessons/$lessonId"
                    params={{ lessonId: l.id }}
                    key={l.id}
                    className="lesson-row"
                  >
                    <span className="lesson-number">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{l.title}</h3>
                      <p>{l.description}</p>
                    </div>
                    <span className="lesson-page">PDF {l.page}-sahifa</span>
                    <span className={"lesson-status " + (completed.includes(l.id) ? "done" : "")}>
                      {completed.includes(l.id) ? (
                        <>
                          <CheckCheck size={14} /> Tugallangan
                        </>
                      ) : l.status === "verified" ? (
                        "Tayyor"
                      ) : (
                        "Tekshiruvda"
                      )}
                    </span>
                    <ChevronRight size={17} />
                  </Link>
                ))}
              </div>
            </section>
          ) : null;
        })}
      {!filtered.length && (
        <div className="empty-state">
          <Search />
          <h3>Dars topilmadi</h3>
          <p>Boshqa so‘z bilan qidiring.</p>
        </div>
      )}
    </main>
  );
}
export function LessonPage({ id }: { id: string }) {
  const lesson = lessons.find((l) => l.id === id);
  const state = useLearning();
  const [selected, setSelected] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [proposed, setProposed] = useState("");
  const [explanation, setExplanation] = useState("");
  const [sent, setSent] = useState(false);
  useEffect(() => {
    if (lesson) state.openLesson(lesson.id);
  }, [id]);
  if (!lesson)
    return (
      <main className="page empty-state">
        <h1>Dars topilmadi</h1>
        <Button asChild>
          <Link to="/lessons">Darslarga qaytish</Link>
        </Button>
      </main>
    );
  const index = lessons.indexOf(lesson);
  const previous = lessons[index - 1];
  const next = lessons[index + 1];
  return (
    <main className="page lesson-page-layout">
      <Link className="back-link" to="/lessons">
        <ArrowLeft size={16} /> Barcha darslar
      </Link>
      <div className="page-heading">
        <div>
          <div className="eyebrow">
            0{lesson.chapter}-BO‘LIM ·{" "}
            {chapters.find((c) => c.id === lesson.chapter)?.title.toUpperCase()}
          </div>
          <h1>{lesson.title}</h1>
          <p>{lesson.description}</p>
        </div>
        <span className="count-label">
          <BookOpen size={16} /> PDF {lesson.page}-sahifa
        </span>
      </div>
      <div className="reader-layout">
        <section>
          <div className="reader-toolbar">
            <span>
              <BookOpen size={17} /> O‘qish
            </span>
            <div className="zoom-controls">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Kichraytirish"
                disabled={state.zoom === 0}
                onClick={() => state.setZoom(clampZoom(state.zoom - 1))}
              >
                <Minus />
              </Button>
              <span>{80 + state.zoom * 20}%</span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Kattalashtirish"
                disabled={state.zoom === 4}
                onClick={() => state.setZoom(clampZoom(state.zoom + 1))}
              >
                <Plus />
              </Button>
            </div>
          </div>
          {lesson.status === "verified" ? (
            <>
              <div className="lesson-explanation">
                <h2>Kitobdan izoh</h2>
                <p lang="uz-Cyrl">{lesson.explanation}</p>
                <small>Manba: PDF {lesson.page}-sahifa · Izoh kirill yozuvida saqlangan</small>
              </div>
              <div
                dir="rtl"
                className={`arabic-grid zoom-${state.zoom} ${state.spacious ? "spacious" : ""}`}
              >
                {lesson.examples.map((text, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className={"arabic-example " + (selected === text ? "selected" : "")}
                    lang="ar"
                    aria-pressed={selected === text}
                    onClick={() => {
                      setSelected(text);
                      setSent(false);
                    }}
                  >
                    {text}
                  </Button>
                ))}
              </div>
              <div className="lesson-bottom">
                <span>
                  <Check size={15} /> {lesson.examples.length} ta arabcha misol
                </span>
                <Button
                  onClick={() => state.complete(id)}
                  variant={state.completed.includes(id) ? "secondary" : "default"}
                >
                  <CheckCheck />
                  {state.completed.includes(id) ? "Dars tugallangan" : "Darsni tugatish"}
                </Button>
              </div>
            </>
          ) : (
            <div className="empty-state review-empty">
              <CircleHelp size={32} />
              <h2>Tahririy tekshiruvda</h2>
              <p>Bu sahifadagi matn va arabcha misollar hali asl kitob bilan tekshirilmoqda.</p>
              <small>PDF {lesson.page}-sahifa · Noaniq matn nashr etilmagan</small>
            </div>
          )}
          <div className="lesson-navigation">
            {previous ? (
              <Button asChild variant="outline">
                <Link to="/lessons/$lessonId" params={{ lessonId: previous.id }}>
                  <ArrowLeft /> Oldingi dars
                </Link>
              </Button>
            ) : (
              <span />
            )}
            {next && (
              <Button asChild variant="outline">
                <Link to="/lessons/$lessonId" params={{ lessonId: next.id }}>
                  Keyingi dars <ArrowRight />
                </Link>
              </Button>
            )}
          </div>
        </section>
        <aside>
          <section className="lesson-side-section">
            <span className="side-icon">
              <Flag size={20} />
            </span>
            <h3>Tuzatish</h3>
            <p>{selected ? "Tanlangan misol" : "Hali misol tanlanmagan"}</p>
            {selected && (
              <div className="selected-preview" dir="rtl" lang="ar">
                {selected}
              </div>
            )}
            <Button
              variant="outline"
              disabled={!selected}
              onClick={() => {
                setProposed("");
                setExplanation("");
                setModal(true);
              }}
            >
              <Flag /> Xatoni bildirish
            </Button>
            {sent && <p className="feedback-success">Qoralama saqlandi. Hisobot: Pending.</p>}
            <small>
              Qoralama faqat joriy sessiyada saqlanadi. Tahrirchi yuborish xizmati hali ulanmagan.
            </small>
          </section>
          <section className="lesson-side-section audio-empty">
            <Headphones size={24} />
            <h3>Talaffuz audiosi</h3>
            <p>Audio hali qo‘shilmagan</p>
            <span className="tiny-badge">Tez kunda</span>
          </section>
          <section className="lesson-side-section">
            <h3>Dars bo‘yicha test</h3>
            <p>O‘rganganlaringizni mustahkamlang.</p>
            <Button asChild variant="outline">
              <Link to="/tests">
                Testlarga o‘tish <ArrowRight />
              </Link>
            </Button>
          </section>
        </aside>
      </div>
      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent>
          <DialogTitle>Tuzatish qoralamasi</DialogTitle>
          <DialogDescription>
            Taklif asl dars matnini o‘zgartirmaydi. Yuborish xizmati hali ulanmagan.
          </DialogDescription>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!selected || !proposed.trim()) return;
              state.report({
                id: crypto.randomUUID(),
                lessonId: id,
                original: selected,
                proposed: proposed.trim(),
                explanation,
                status: "Pending",
              });
              setSent(true);
              setModal(false);
            }}
            className="correction-form"
          >
            <label>
              Asl matn
              <div className="original-text" dir="rtl" lang="ar">
                {selected}
              </div>
            </label>
            <label htmlFor="correction">Taklif etilgan arabcha matn</label>
            <input
              id="correction"
              lang="ar"
              dir="rtl"
              required
              value={proposed}
              onChange={(e) => setProposed(e.target.value)}
            />
            <label htmlFor="explanation">Izoh (ixtiyoriy)</label>
            <textarea
              id="explanation"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
            <Button type="submit">
              Qoralamani saqlash <Check />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
export function TestsPage() {
  const state = useLearning();
  const [active, setActive] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [chosen, setChosen] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const quizRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!active || finished) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    quizRef.current?.focus();
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(false);
      if (event.key !== "Tab") return;
      const controls =
        quizRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
      const first = controls?.[0];
      const last = controls?.[controls.length - 1];
      if (!first || !last) return;
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === quizRef.current)
      ) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [active, finished]);
  const question = questions[answers.length];
  function start() {
    setAnswers([]);
    setChosen(null);
    setRevealed(false);
    setFinished(false);
    setActive(true);
  }
  function advance() {
    if (chosen === null) return;
    const updated = [...answers, chosen];
    setAnswers(updated);
    setChosen(null);
    setRevealed(false);
    if (updated.length === questions.length) {
      state.finishTest();
      setFinished(true);
    }
  }
  return (
    <main className="page tests-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">BILIMINGIZNI MUSTAHKAMLANG</div>
          <h1>Testlar</h1>
          <p>O‘rganganlaringizni sinang, natijangizni kuzating.</p>
        </div>
        <span className="count-label">
          <Trophy size={17} /> Har bir urinish — tajriba
        </span>
      </div>
      {!active ? (
        <>
          <section className="test-feature">
            <span className="test-feature-icon">
              <ListChecks size={35} />
            </span>
            <div>
              <span className="eyebrow">ARAB ALIFBOSI VA HARAKATLAR</span>
              <h2>Harflarni taniysizmi?</h2>
              <p>Kitobning dastlabki sahifalari asosidagi bilim sinovi.</p>
              <span className="test-meta">
                {questions.length} ta savol <span>·</span> PDF 2–3-sahifalar
              </span>
            </div>
            <Button size="lg" onClick={start}>
              Testni boshlash <ArrowRight />
            </Button>
          </section>
          <div className="section-heading">
            <h2>Mavzular bo‘yicha testlar</h2>
          </div>
          <div className="course-grid test-course-grid">
            {chapters.map((c, i) => (
              <article className="course-card" key={c.id}>
                <span className={`letter-tile ${c.tone}`} lang="ar">
                  {c.symbol}
                </span>
                <h3>{c.title}</h3>
                <p>{i === 0 ? "5 ta tekshirilgan savol" : "Savollar tahririy tekshiruvda"}</p>
                <Button variant={i === 0 ? "outline" : "ghost"} disabled={i !== 0} onClick={start}>
                  {i === 0 ? "Boshlash" : "Tekshiruvda"} {i === 0 && <ArrowRight />}
                </Button>
              </article>
            ))}
          </div>
        </>
      ) : finished ? (
        <section className="result-panel">
          <span className="result-icon">
            <Trophy size={40} />
          </span>
          <div className="eyebrow">TEST YAKUNLANDI</div>
          <h2>
            {scoreAnswers(answers)} / {questions.length}
          </h2>
          <p>
            {scoreAnswers(answers) === questions.length
              ? "Ajoyib! Barcha javoblar to‘g‘ri."
              : "Yaxshi urinish! Darsni takrorlab, yana sinab ko‘ring."}
          </p>
          <div className="result-actions">
            <Button onClick={start}>
              Qayta ishlash <ArrowRight />
            </Button>
            <Button variant="outline" onClick={() => setActive(false)}>
              Testlarga qaytish
            </Button>
          </div>
        </section>
      ) : question ? (
        <section
          className="quiz-panel"
          ref={quizRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="quiz-question"
          tabIndex={-1}
        >
          <div className="quiz-top">
            <span>
              {answers.length + 1} / {questions.length} SAVOL
            </span>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Testni yopish"
              onClick={() => setActive(false)}
            >
              <X />
            </Button>
          </div>
          <div className="progress-track">
            <div style={{ width: `${(answers.length / questions.length) * 100}%` }} />
          </div>
          <div className="quiz-content">
            <h2 id="quiz-question">{question.prompt}</h2>
            <div className="quiz-options">
              {question.options.map((option, i) => (
                <Button
                  key={i}
                  variant="outline"
                  disabled={revealed}
                  className={
                    "quiz-option " +
                    (chosen === i ? "chosen " : "") +
                    (revealed && i === question.answer
                      ? "correct"
                      : revealed && i === chosen
                        ? "incorrect"
                        : "")
                  }
                  onClick={() => setChosen(i)}
                  lang="ar"
                  dir="rtl"
                >
                  {option}
                </Button>
              ))}
            </div>
            {revealed && (
              <div
                className={"answer-feedback " + (chosen === question.answer ? "right" : "wrong")}
              >
                {chosen === question.answer
                  ? "To‘g‘ri javob!"
                  : "Javob noto‘g‘ri. To‘g‘ri javob belgilandi."}
                <small>Manba: PDF {question.page}-sahifa</small>
              </div>
            )}
            <Button
              disabled={chosen === null}
              onClick={() => (revealed ? advance() : setRevealed(true))}
            >
              {revealed
                ? answers.length === questions.length - 1
                  ? "Natijani ko‘rish"
                  : "Keyingi savol"
                : "Tekshirish"}
            </Button>
          </div>
        </section>
      ) : null}
    </main>
  );
}
export function SettingsPage() {
  const state = useLearning();
  return (
    <main className="page settings-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">SIZGA MOS O‘QUV MUHITI</div>
          <h1>Sozlamalar</h1>
          <p>O‘qish tajribangizni o‘zingizga moslang.</p>
        </div>
      </div>
      <section className="settings-section">
        <div>
          <h2>Arabcha matn</h2>
          <p>Harf o‘lchami va o‘qish ko‘rinishi</p>
        </div>
        <div className="settings-body">
          <div className="setting-row">
            <label htmlFor="font-size">Matn o‘lchami</label>
            <div className="zoom-controls">
              <Button
                variant="outline"
                size="icon"
                aria-label="Matnni kichraytirish"
                disabled={state.zoom === 0}
                onClick={() => state.setZoom(clampZoom(state.zoom - 1))}
              >
                <Minus />
              </Button>
              <span>{80 + state.zoom * 20}%</span>
              <Button
                variant="outline"
                size="icon"
                aria-label="Matnni kattalashtirish"
                disabled={state.zoom === 4}
                onClick={() => state.setZoom(clampZoom(state.zoom + 1))}
              >
                <Plus />
              </Button>
            </div>
          </div>
          <div className={`settings-arabic zoom-${state.zoom}`} lang="ar" dir="rtl">
            ا ب ت ث ج ح خ
          </div>
          <div className="setting-row">
            <div>
              <strong>Keng o‘qish oralig‘i</strong>
              <p>Misollar orasidagi qo‘shimcha bo‘shliq</p>
            </div>
            <Button
              variant={state.spacious ? "default" : "outline"}
              role="switch"
              aria-checked={state.spacious}
              aria-label="Keng o‘qish oralig‘i"
              className="toggle-switch"
              onClick={() => state.setSpacious(!state.spacious)}
            >
              <span />
            </Button>
          </div>
        </div>
      </section>
      <section className="settings-section">
        <div>
          <h2>Tashqi ko‘rinish</h2>
          <p>O‘zingizga qulay mavzuni tanlang</p>
        </div>
        <div className="theme-options">
          {[
            { id: "light", title: "Yorug‘", Icon: Sun },
            { id: "dark", title: "Qorong‘i", Icon: Moon },
            { id: "system", title: "Tizim", Icon: Monitor },
          ].map((t) => (
            <Button
              key={t.id}
              variant={state.theme === t.id ? "default" : "outline"}
              onClick={() => state.setTheme(t.id)}
            >
              <t.Icon />
              {t.title}
              {state.theme === t.id && <Check />}
            </Button>
          ))}
        </div>
      </section>
      <section className="settings-section">
        <div>
          <h2>Audio</h2>
          <p>Talaffuz va tinglash</p>
        </div>
        <div className="settings-body">
          <div className="setting-row">
            <div>
              <strong>
                <Volume2 size={17} /> Audio manbalari
              </strong>
              <p>Hozircha audio fayllar ulanmagan.</p>
            </div>
            <span className="tiny-badge">Tez kunda</span>
          </div>
          <Button asChild variant="outline">
            <Link to="/suralar">
              <Headphones /> Suralar
            </Link>
          </Button>
        </div>
      </section>
      <section className="settings-section">
        <div>
          <h2>Hisob va ma’lumotlar</h2>
          <p>Shaxsiy o‘quv natijalaringiz</p>
        </div>
        <div className="settings-body">
          <div className="account-empty">
            <UserRound size={28} />
            <div>
              <strong>Mehmon rejimi</strong>
              <p>
                Natijalar, sozlamalar va tuzatish qoralamalari faqat joriy sessiyada saqlanadi.
                Hisob xizmati hali ulanmagan.
              </p>
            </div>
          </div>
          {state.reports.length > 0 && (
            <p>{state.reports.length} ta tuzatish qoralamasi · Pending</p>
          )}
        </div>
      </section>
    </main>
  );
}
export function SuralarPage() {
  return (
    <main className="page">
      <Link to="/settings" className="back-link">
        <ArrowLeft size={16} /> Sozlamalar
      </Link>
      <div className="page-heading">
        <div>
          <div className="eyebrow">TINGLASH KUTUBXONASI</div>
          <h1>Suralar</h1>
          <p>Tinglash va takrorlash</p>
        </div>
      </div>
      <div className="empty-state">
        <Headphones size={40} />
        <h2>Audio hali ulanmagan</h2>
        <p>Tasdiqlangan audio manbalari qo‘shilgach, suralar shu yerda paydo bo‘ladi.</p>
      </div>
    </main>
  );
}
