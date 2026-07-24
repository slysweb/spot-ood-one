import { Link } from "react-router-dom";
import { Shell } from "@/components/Shell";
import { usePageMeta } from "@/hooks/usePageMeta";
import { PRIVACY_META } from "@/seo/pageMeta";

const UPDATED = "July 24, 2026";

export function PrivacyPage() {
  usePageMeta(PRIVACY_META);

  return (
    <Shell subtitle="Privacy" showHomeLink>
      <section className="home about-page">
        <div className="panel home-hero">
          <p className="eyebrow">Legal</p>
          <h1 className="display about-title">Privacy Policy</h1>
          <p className="body-text tagline">
            How Spot Odd One handles information on this site. Last updated{" "}
            {UPDATED}.
          </p>
        </div>

        <article className="panel about-card">
          <h2 className="about-heading">Overview</h2>
          <p className="body-text">
            Spot Odd One is a free browser game. You can play without creating
            an account. This policy explains what stays on your device and what
            may be collected when you use{" "}
            <a href="https://spotoddone.com">spotoddone.com</a>.
          </p>
        </article>

        <article className="panel about-card">
          <h2 className="about-heading">Information on your device</h2>
          <p className="body-text">
            Game progress (such as best level per pack) and settings (such as
            sound and color-blind assist) are stored locally in your browser,
            typically via localStorage. Clearing site data in your browser
            removes this information. We do not sync it to a Spot Odd One
            account, because there is no sign-in.
          </p>
        </article>

        <article className="panel about-card">
          <h2 className="about-heading">What we do not sell</h2>
          <p className="body-text">
            We do not sell your personal information. We do not ask for your
            name, email, or password to play the game.
          </p>
        </article>

        <article className="panel about-card">
          <h2 className="about-heading">Hosting, logs, and analytics</h2>
          <p className="body-text">
            The site is hosted on third-party infrastructure (for example
            Cloudflare). Those providers may process standard technical data
            such as IP address, browser type, and request logs to deliver and
            secure the service. If we add analytics or advertising later, this
            policy will be updated to describe what is used and why.
          </p>
        </article>

        <article className="panel about-card">
          <h2 className="about-heading">Sharing and children</h2>
          <p className="body-text">
            The share-to-continue flow uses your device’s share sheet or copy
            text; we do not post on your behalf. Spot Odd One is a casual
            puzzle suitable for a general audience. We do not knowingly collect
            personal information from children for accounts or profiles.
          </p>
        </article>

        <article className="panel about-card">
          <h2 className="about-heading">Changes</h2>
          <p className="body-text">
            We may update this policy from time to time. The “Last updated”
            date at the top will change when we do. Continued use of the site
            after an update means you accept the revised policy.
          </p>
        </article>

        <article className="panel about-card">
          <h2 className="about-heading">Contact</h2>
          <p className="body-text">
            Questions about privacy? Reach us through the project repository:{" "}
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
          <Link to="/terms" className="link-btn">
            Terms of Service
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
