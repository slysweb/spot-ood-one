import { Link } from "react-router-dom";
import { Shell } from "@/components/Shell";
import { usePageMeta } from "@/hooks/usePageMeta";
import { TERMS_META } from "@/seo/pageMeta";

const UPDATED = "July 24, 2026";

export function TermsPage() {
  usePageMeta(TERMS_META);

  return (
    <Shell subtitle="Terms" showHomeLink>
      <section className="home about-page">
        <div className="panel home-hero">
          <p className="eyebrow">Legal</p>
          <h1 className="display about-title">Terms of Service</h1>
          <p className="body-text tagline">
            Rules for using Spot Odd One. Last updated {UPDATED}.
          </p>
        </div>

        <article className="panel about-card">
          <h2 className="about-heading">Agreement</h2>
          <p className="body-text">
            By accessing or playing Spot Odd One at{" "}
            <a href="https://spotoddone.com">spotoddone.com</a>, you agree to
            these Terms of Service and our{" "}
            <Link to="/privacy">Privacy Policy</Link>. If you do not agree, do
            not use the site.
          </p>
        </article>

        <article className="panel about-card">
          <h2 className="about-heading">The service</h2>
          <p className="body-text">
            Spot Odd One is a free odd-one-out puzzle game offered “as is.”
            Features, packs, difficulty, and availability may change or be
            discontinued at any time without notice. We may add ads, analytics,
            or other features later.
          </p>
        </article>

        <article className="panel about-card">
          <h2 className="about-heading">Acceptable use</h2>
          <p className="body-text">
            You agree not to misuse the site, including attempting to disrupt
            service, scrape or overload servers in abusive ways, reverse
            engineer in violation of applicable law, or use the game for
            unlawful purposes. Progress is stored on your device and may be
            lost if you clear browser data.
          </p>
        </article>

        <article className="panel about-card">
          <h2 className="about-heading">Intellectual property</h2>
          <p className="body-text">
            The Spot Odd One name, game design, code, and original assets are
            owned by the project operators or their licensors. You may play the
            game for personal, non-commercial entertainment. You may not copy,
            redistribute, or rebrand substantial parts of the site or assets
            without permission, except as allowed by law (for example fair
            use).
          </p>
        </article>

        <article className="panel about-card">
          <h2 className="about-heading">Disclaimers</h2>
          <p className="body-text">
            The service is provided without warranties of any kind, express or
            implied, including fitness for a particular purpose and
            non-infringement. We do not warrant uninterrupted or error-free
            play. To the fullest extent permitted by law, we are not liable for
            any indirect, incidental, or consequential damages arising from
            your use of the site.
          </p>
        </article>

        <article className="panel about-card">
          <h2 className="about-heading">Changes</h2>
          <p className="body-text">
            We may update these terms from time to time. The “Last updated”
            date will change when we do. Continued use after an update means
            you accept the revised terms.
          </p>
        </article>

        <article className="panel about-card">
          <h2 className="about-heading">Contact</h2>
          <p className="body-text">
            Questions about these terms? See the project repository:{" "}
            <a
              href="https://github.com/slysweb/spot-ood-one"
              rel="noopener noreferrer"
              target="_blank"
            >
              github.com/slysweb/spot-ood-one
            </a>
            .
          </p>
        </article>

        <div className="home-links">
          <Link to="/privacy" className="link-btn">
            Privacy Policy
          </Link>
          <Link to="/about" className="link-btn">
            About
          </Link>
          <Link to="/" className="link-btn">
            All packs
          </Link>
        </div>
      </section>
    </Shell>
  );
}
