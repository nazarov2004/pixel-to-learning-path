import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, LayoutGrid, Library, ListChecks, Settings2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <BookOpen size={23} />
          </span>
          <span>
            Muallimi<span className="brand-second">Soniy</span>
          </span>
        </Link>
        <nav aria-label="Asosiy navigatsiya">
          {(
            [
              { to: "/", name: "Bosh sahifa", icon: LayoutGrid },
              { to: "/lessons", name: "Darslar", icon: Library },
              { to: "/tests", name: "Testlar", icon: ListChecks },
              { to: "/settings", name: "Sozlamalar", icon: Settings2 },
            ] as const
          ).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={
                "nav-link " +
                ((item.to === "/" ? path === "/" : path.startsWith(item.to)) ? "active" : "")
              }
            >
              <item.icon size={17} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <Button variant="outline" asChild className="header-start">
          <Link to="/lessons">
            O‘rganishni boshlash <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>
        Muallimi Soniy <span className="footer-dot">·</span> Ilm sari, qadamma-qadam.
      </span>
      <span>Ahmad Hodiy Maqsudiy kitobi asosida</span>
    </footer>
  );
}
