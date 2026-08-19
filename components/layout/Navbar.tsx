"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isDock = scrolled || !isHome;

  const links = [
    { href: "/research", label: "Research" },
    { href: "/publications", label: "Publications" },
    { href: "/people", label: "People" },
    { href: "/media", label: "Media" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        pointerEvents: "none",
        padding: isDock ? "0.75rem 0" : "1.25rem 0",
        transition: "padding 0.25s ease",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            pointerEvents: "auto",
            width: "100%",
            maxWidth: "1180px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1.5rem",
            background: isDock ? "rgba(16, 22, 26, 0.75)" : "transparent",
            backdropFilter: isDock ? "blur(18px)" : "none",
            WebkitBackdropFilter: isDock ? "blur(18px)" : "none",
            border: isDock
              ? "1px solid var(--hairline-strong)"
              : "1px solid transparent",
            borderRadius: "12px",
            padding: isDock
              ? "0.6rem 1.25rem"
              : "0",
            transition:
              "background 0.25s ease, border-color 0.25s ease, padding 0.25s ease, backdrop-filter 0.25s ease",
          }}
        >
          {/* Brand */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "baseline",
              gap: "0.5rem",
              flex: "none",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "1.0625rem",
                letterSpacing: "0.04em",
                color: "var(--text-primary)",
              }}
            >
              SARCS
            </span>
            <span
              className="type-mono"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
              }}
            >
              / IIIT HYDERABAD
            </span>
          </Link>

          {/* Links */}
          <nav
            aria-label="Main navigation"
            style={{
              display: "flex",
              alignItems: "center",
              gap: isDock ? "1.25rem" : "0.5rem",
              overflowX: "auto",
              scrollbarWidth: "none",
              padding: "2px 0",
            }}
          >
            {links.map(({ href, label }) => {
              const isActive =
                pathname === href ||
                (href !== "/" && pathname.startsWith(href));

              if (isDock) {
                return (
                  <Link
                    key={href}
                    href={href}
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      padding: "0.35rem 0",
                      borderBottom: isActive
                        ? "2px solid var(--accent)"
                        : "2px solid transparent",
                      transition: "color 0.18s ease, border-color 0.18s ease",
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                  </Link>
                );
              }

              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: isActive ? "var(--accent)" : "var(--text-primary)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    padding: "0.35rem 0.85rem",
                    borderRadius: "999px",
                    border: isActive
                      ? "1px solid var(--accent)"
                      : "1px solid rgba(233, 237, 241, 0.20)",
                    background: isActive
                      ? "rgba(126, 193, 224, 0.18)"
                      : "rgba(16, 22, 26, 0.65)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    transition: "all 0.18s ease",
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
