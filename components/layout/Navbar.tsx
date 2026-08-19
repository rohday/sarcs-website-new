"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Navbar — fixed header in floorplan grammar: die label left, route pads right.
 * Active route = interconnect-gold pad. No dropdowns: the pad row scrolls
 * horizontally on narrow screens.
 */
export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/research",     label: "Research" },
    { href: "/publications", label: "Publications" },
    { href: "/people",       label: "People" },
    { href: "/media",        label: "Media" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "var(--substrate)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1.5rem",
          height: "4rem",
        }}
      >
        {/* Brand: die wordmark + cell name */}
        <Link
          href="/"
          style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "0.625rem", flex: "none" }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.125rem",
              letterSpacing: "0.06em",
              color: "var(--oxide)",
            }}
          >
            SARCS
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.625rem",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
            }}
          >
            / IIIT HYDERABAD
          </span>
        </Link>

        {/* Route pads */}
        <nav
          aria-label="Main navigation"
          style={{ display: "flex", gap: "0.5rem", overflowX: "auto", scrollbarWidth: "none", padding: "2px 0" }}
        >
          {links.map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={isActive ? "pad pad-active" : "pad"}
                style={{ textDecoration: "none", whiteSpace: "nowrap", fontSize: "0.6875rem" }}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
