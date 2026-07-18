import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ShellProps {
  subtitle: string;
  showHomeLink?: boolean;
  children: ReactNode;
}

export function Shell({ subtitle, showHomeLink = false, children }: ShellProps) {
  return (
    <div className="app-shell">
      <header className="top-bar">
        {showHomeLink ? (
          <Link to="/" className="brand-mark brand-link">
            Spot Odd <span>One</span>
          </Link>
        ) : (
          <div className="brand-mark">
            Spot Odd <span>One</span>
          </div>
        )}
        <div className="top-bar-right">{subtitle}</div>
      </header>
      {children}
    </div>
  );
}
