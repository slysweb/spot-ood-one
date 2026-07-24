import { Link } from "react-router-dom";
import { Shell } from "@/components/Shell";
import { THEMES } from "@/game/themeMeta";
import { usePageMeta } from "@/hooks/usePageMeta";
import { ABOUT_META } from "@/seo/pageMeta";

export function AboutPage() {
  usePageMeta(ABOUT_META);

  return (
    <Shell subtitle="About" showHomeLink>
      <section className="home about-page">
        <div className="panel home-hero">
          <p className="eyebrow">About</p>
          <h1 className="display">
            Spot Odd <span style={{ color: "var(--orange-deep)" }}>One</span>
          </h1>
          <p className="body-text tagline">
            A free find-the-odd-one-out puzzle — tap the picture that doesn’t
            belong before time runs out.
          </p>
        </div>

        <article className="panel about-card">
          <h2 className="about-heading">How it works</h2>
          <p className="body-text">
            Each level shows a small grid of look-alike pictures. One is
            different. Tap the odd one within 10 seconds to clear the level.
            Wrong tap or timeout ends the run — share to continue, or start
            over from Level 1.
          </p>
        </article>

        <article className="panel about-card">
          <h2 className="about-heading">Packs</h2>
          <p className="body-text">
            Pick a theme pack on the home screen. Progress stays on this device
            — no account required.
          </p>
          <ul className="about-pack-list">
            {THEMES.map((theme) => (
              <li key={theme.id}>
                <Link to={theme.path}>{theme.label}</Link>
                <span className="about-pack-line">{theme.findLine}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel about-card">
          <h2 className="about-heading">Privacy</h2>
          <p className="body-text">
            Spot Odd One does not require sign-in. Best level and settings are
            stored locally in your browser. We do not sell personal data.
          </p>
        </article>

        <div className="home-links">
          <Link to="/" className="link-btn">
            All packs
          </Link>
        </div>
      </section>
    </Shell>
  );
}
