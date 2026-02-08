import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Shield,
  LineChart,
  Layers,
  Globe,
  FileText,
  Mail,
  MapPin,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";

const BRAND = {
  name: "BridgeStar Investments",
  domain: "bridgestar.ro",
  email: "info@bridgestar.ro",
};

const IMAGES = {
  // Hero: user chose “second image”
  hero:
    "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=2400&q=70",
  // Section image: user chose “first one”
  section:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=70",
  // Insights: user chose “first one” from insights list
  insights:
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=70",
};

function cx(...xs) {
  return xs.filter(Boolean).join(" ");
}

/**
 * Hash router:
 *  - Home: #/ (or empty hash)
 *  - Insights page: #/insights
 *  - Section anchors from nav: #/#[sectionId]
 */
function useHashRoute() {
  const getRoute = () => {
    const h = (window.location.hash || "").trim();
    if (h.startsWith("#/insights")) return "insights";
    return "home";
  };

  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return route;
}

function useRouteAnchors() {
  useEffect(() => {
    const h = window.location.hash || "";
    const match = h.match(/#\/#\[(.+?)\]/);
    if (match?.[1]) {
      const id = match[1];
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    }
  }, []);
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="font-body text-sm font-medium text-slate-200/90 hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}

function Button({ href, variant = "primary", children }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold font-body transition focus:outline-none focus:ring-2 focus:ring-white/35";
  const styles =
    variant === "primary"
      ? "bg-brand-accent text-brand-navy hover:opacity-95"
      : "bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/15";
  return (
    <a href={href} className={cx(base, styles)}>
      {children}
    </a>
  );
}

function SectionHeader({ kicker, title, desc, light = false }) {
  return (
    <div className="max-w-3xl">
      {kicker ? (
        <div
          className={cx(
            "font-body text-xs font-semibold tracking-widest uppercase",
            light ? "text-white/70" : "text-slate-500"
          )}
        >
          {kicker}
        </div>
      ) : null}
      <h2
        className={cx(
          "mt-3 font-heading text-2xl sm:text-3xl font-semibold tracking-tight",
          light ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </h2>
      {desc ? (
        <p
          className={cx(
            "mt-3 font-body leading-relaxed",
            light ? "text-white/80" : "text-slate-600"
          )}
        >
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-5">
      <div className="font-body text-xs font-semibold tracking-widest uppercase text-slate-500">
        {label}
      </div>
      <div className="mt-2 font-heading text-2xl font-semibold text-slate-900">
        {value}
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light ring-1 ring-slate-200">
          <Icon className="h-5 w-5 text-slate-900" />
        </span>
        <div>
          <div className="font-body text-sm font-semibold text-slate-900">
            {title}
          </div>
          <p className="mt-2 font-body text-sm text-slate-600 leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function InsightRow({ tag, title, desc, meta }) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-light px-3 py-1 text-xs font-semibold font-body text-slate-700 ring-1 ring-slate-200">
              <FileText className="h-4 w-4" />
              {tag}
            </span>
            {meta ? (
              <span className="font-body text-xs text-slate-500">{meta}</span>
            ) : null}
          </div>
          <div className="mt-3 font-heading text-lg font-semibold text-slate-900">
            {title}
          </div>
          <p className="mt-2 font-body text-sm text-slate-600 leading-relaxed">
            {desc}
          </p>
        </div>
        <div className="shrink-0">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-white">
            <ArrowRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </div>
  );
}

function TopNav() {
  return (
    <header className="sticky top-0 z-50 bg-brand-navy/85 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <a href="#/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center">
              <span className="text-white font-semibold font-body">BS</span>
            </div>
            <div className="text-white font-semibold tracking-tight font-body">
              {BRAND.name}
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            <NavLink href="#/#[solutions]">Solutions</NavLink>
            <NavLink href="#/#[approach]">Approach</NavLink>
            <NavLink href="#/insights">Insights</NavLink>
            <NavLink href="#/#[contact]">Contact</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#/#[contact]"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brand-accent text-brand-navy px-5 py-2.5 text-sm font-semibold font-body hover:opacity-95 transition"
            >
              Request an intro <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function HomePage() {
  useRouteAnchors();

  const solutions = useMemo(
    () => [
      {
        icon: Globe,
        title: "U.S. market access",
        desc: "Disciplined exposure to U.S. and global public markets with a long-horizon orientation.",
      },
      {
        icon: Layers,
        title: "Strategic asset allocation",
        desc: "Institutional portfolio construction with diversification across drivers of return.",
      },
      {
        icon: Shield,
        title: "Risk management",
        desc: "Drawdown-aware design, liquidity planning, and a repeatable rebalancing discipline.",
      },
      {
        icon: LineChart,
        title: "Implementation & monitoring",
        desc: "Clear reporting and ongoing oversight designed to prioritize clarity and accountability.",
      },
    ],
    []
  );

  const principles = useMemo(
    () => [
      {
        title: "Long-term first",
        desc: "We focus on time horizon and the compounding of capital across market cycles—not short-term headlines.",
      },
      {
        title: "Diversify what drives outcomes",
        desc: "We diversify across equity risk, rates, credit, and diversifying exposures to avoid single-factor portfolios.",
      },
      {
        title: "Rules over emotions",
        desc: "We use a repeatable process: define objectives, set allocation, monitor, and rebalance with discipline.",
      },
      {
        title: "Transparency matters",
        desc: "We communicate what we own, why we own it, and how performance fits into a long-term plan.",
      },
    ],
    []
  );

  const previewInsights = useMemo(
    () => [
      {
        tag: "Perspective",
        title: "Why U.S. markets for long-term investors",
        desc: "A framework for building globally diversified portfolios with a U.S. core—and staying disciplined through cycles.",
        meta: "4 min read",
      },
      {
        tag: "Methodology",
        title: "A practical approach to asset allocation",
        desc: "How we think about risk budgeting, rebalancing, and avoiding behavioral mistakes during volatility.",
        meta: "6 min read",
      },
      {
        tag: "Investor guide",
        title: "Cross-border investing checklist",
        desc: "A simple checklist for Romania-based investors and expats investing internationally.",
        meta: "5 min read",
      },
    ],
    []
  );

  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    message: "",
  });

  const mailto = useMemo(() => {
    const to = BRAND.email;
    const subject = encodeURIComponent(`${BRAND.name} — Contact Request`);
    const body = encodeURIComponent(
      `First name: ${form.first}\nLast name: ${form.last}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    return `mailto:${to}?subject=${subject}&body=${body}`;
  }, [form]);

  return (
    <>
      {/* HERO with background image + overlay */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-brand-navy/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-4 py-2 text-xs font-semibold font-body text-white/90">
              Romania & expats • U.S. markets • Institutional process
            </div>

            <h1 className="mt-6 font-heading text-4xl sm:text-5xl font-semibold tracking-tight text-white">
              Investing with discipline, clarity, and a long-term horizon.
            </h1>
            <p className="mt-4 font-body text-lg text-white/85 leading-relaxed">
              BridgeStar Investments provides disciplined exposure to U.S. and
              global public markets for investors who value transparency, risk
              management, and repeatable decision-making.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#/#[contact]" variant="primary">
                Request an intro <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="#/insights" variant="ghost">
                Read insights
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Focus", value: "Long-term outcomes" },
                { label: "Style", value: "Institutional discipline" },
                { label: "Coverage", value: "U.S. + global markets" },
              ].map((x) => (
                <div
                  key={x.label}
                  className="rounded-2xl bg-white/10 ring-1 ring-white/15 px-5 py-4"
                >
                  <div className="font-body text-xs font-semibold tracking-widest uppercase text-white/75">
                    {x.label}
                  </div>
                  <div className="mt-2 font-heading text-xl font-semibold text-white">
                    {x.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Stat label="Mandate" value="Public markets" />
          <Stat label="Investor type" value="Affluent / UHNW" />
          <Stat label="Process" value="Allocation + rebalance" />
        </div>
      </section>

      {/* Solutions + image */}
      <section
        id="solutions"
        className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <SectionHeader
              kicker="Solutions"
              title="A focused set of capabilities for serious investors"
              desc="We build portfolios designed to be resilient across regimes—implemented with a repeatable investment process and transparent reporting."
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {solutions.map((s) => (
                <Card key={s.title} {...s} />
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-white ring-1 ring-slate-200 p-7 sm:p-9">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light ring-1 ring-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-slate-900" />
                </span>
                <div>
                  <div className="font-body text-sm font-semibold text-slate-900">
                    What you can expect
                  </div>
                  <p className="mt-2 font-body text-sm text-slate-600 leading-relaxed">
                    Clear objectives, disciplined portfolio construction, and a
                    communication style designed to reduce noise and increase
                    decision quality over time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-white shadow-sm">
              <img
                src={IMAGES.section}
                alt="Institutional research environment"
                className="h-72 sm:h-80 lg:h-[520px] w-full object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <div className="font-body text-xs font-semibold tracking-widest uppercase text-slate-500">
                  Design philosophy
                </div>
                <div className="mt-2 font-heading text-lg font-semibold text-slate-900">
                  Institutional clarity
                </div>
                <p className="mt-2 font-body text-sm text-slate-600 leading-relaxed">
                  We prioritize a process that is explainable, repeatable, and
                  designed for long-horizon decision-making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <SectionHeader
            kicker="Approach"
            title="Principles that guide decisions"
            desc="Our approach is designed to be repeatable. We emphasize governance, diversification, and risk-aware implementation."
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {principles.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl bg-brand-light ring-1 ring-slate-200 p-6"
              >
                <div className="font-body text-sm font-semibold text-slate-900">
                  {p.title}
                </div>
                <p className="mt-2 font-body text-sm text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                title: "1) Define objectives",
                desc: "Time horizon, liquidity needs, drawdown tolerance, and currency considerations.",
              },
              {
                title: "2) Build the allocation",
                desc: "Strategic mix across equities, fixed income, and diversifiers—implemented efficiently.",
              },
              {
                title: "3) Monitor & rebalance",
                desc: "Ongoing oversight with transparent reporting and disciplined rebalancing rules.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 shadow-sm"
              >
                <div className="font-body text-sm font-semibold text-slate-900">
                  {b.title}
                </div>
                <p className="mt-2 font-body text-sm text-slate-600 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-brand-navy text-white p-7 sm:p-9">
            <div className="font-body text-sm font-semibold">
              Important disclosure
            </div>
            <p className="mt-2 font-body text-sm text-white/80 leading-relaxed">
              This website is for informational purposes only and does not
              constitute an offer to sell or a solicitation of an offer to buy
              any securities. Investing involves risk, including possible loss
              of principal.
            </p>
          </div>
        </div>
      </section>

      {/* Insights preview */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="flex items-end justify-between gap-6">
          <SectionHeader
            kicker="Insights"
            title="Research-forward content, written for investors"
            desc="Short, practical reads that explain how we think—so investors can make better decisions with less noise."
          />
          <a
            href="#/insights"
            className="hidden sm:inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-navy hover:opacity-80 transition"
          >
            View all <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6">
          {previewInsights.map((x) => (
            <a key={x.title} href="#/insights" className="block">
              <InsightRow {...x} />
            </a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <SectionHeader
                kicker="Contact"
                title="Let’s discuss fit"
                desc="If you’re a Romania-based investor or an expat seeking disciplined exposure to U.S. markets, we’d be happy to connect."
              />

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light ring-1 ring-slate-200">
                    <MapPin className="h-5 w-5 text-slate-900" />
                  </span>
                  <div>
                    <div className="font-body text-sm font-semibold">
                      Office
                    </div>
                    <div className="font-body text-sm text-slate-600">
                      Bucharest (by appointment) • Serving clients globally
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light ring-1 ring-slate-200">
                    <Mail className="h-5 w-5 text-slate-900" />
                  </span>
                  <div>
                    <div className="font-body text-sm font-semibold">Email</div>
                    <div className="font-body text-sm text-slate-600">
                      {BRAND.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-brand-light ring-1 ring-slate-200 p-6 sm:p-8">
              <div className="font-body text-sm font-semibold text-slate-900">
                Send a message
              </div>
              <p className="mt-2 font-body text-sm text-slate-600">
                This form opens your email client to send the message (no backend
                required).
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-sm">
                  <div className="font-body text-xs font-semibold text-slate-700">
                    First Name
                  </div>
                  <input
                    value={form.first}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, first: e.target.value }))
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                    placeholder="First name"
                  />
                </label>

                <label className="text-sm">
                  <div className="font-body text-xs font-semibold text-slate-700">
                    Last Name
                  </div>
                  <input
                    value={form.last}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, last: e.target.value }))
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                    placeholder="Last name"
                  />
                </label>

                <label className="text-sm sm:col-span-2">
                  <div className="font-body text-xs font-semibold text-slate-700">
                    Email
                  </div>
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    type="email"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="text-sm sm:col-span-2">
                  <div className="font-body text-xs font-semibold text-slate-700">
                    Message
                  </div>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    rows={6}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
                    placeholder="Tell us what you’re looking for (time horizon, objectives, constraints)…"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                    `${BRAND.name} — Contact Request`
                  )}&body=${encodeURIComponent(
                    `First name: ${form.first}\nLast name: ${form.last}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
                  )}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy text-white px-6 py-2.5 text-sm font-semibold font-body hover:opacity-95 transition"
                >
                  Submit <ArrowRight className="h-4 w-4" />
                </a>
                <div className="font-body text-xs text-slate-500">
                  By contacting us you consent to being contacted back.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InsightsPage() {
  const posts = useMemo(
    () => [
      {
        tag: "Perspective",
        title: "Why U.S. markets for long-term investors",
        meta: "4 min read",
        desc:
          "A clear framework for building globally diversified portfolios with a U.S. core—what matters, what doesn’t, and how to stay disciplined.",
      },
      {
        tag: "Methodology",
        title: "A practical approach to asset allocation",
        meta: "6 min read",
        desc:
          "How we think about risk budgeting, rebalancing bands, and avoiding behavioral mistakes during volatility.",
      },
      {
        tag: "Investor guide",
        title: "Cross-border investing checklist (Romania & expats)",
        meta: "5 min read",
        desc:
          "A practical checklist covering account setup, currency considerations, diversification, and long-term governance.",
      },
      {
        tag: "Risk",
        title: "What diversification really means",
        meta: "5 min read",
        desc:
          "Diversification across assets is not the same as diversification across drivers. Here’s how we think about the difference.",
      },
    ],
    []
  );

  return (
    <div className="bg-brand-light">
      {/* Insights header image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.insights}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-brand-navy/70" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-14">
          <SectionHeader
            kicker="Insights"
            title="Commentary and investor education"
            desc="Short, practical reads written to reduce noise and improve decision-making."
            light
          />

          <div className="mt-6">
            <a
              href="#/"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white/90 hover:text-white transition"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to home
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-6">
          {posts.map((p) => (
            <a key={p.title} href="#/#[contact]" className="block">
              <InsightRow {...p} />
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-white ring-1 ring-slate-200 p-7 sm:p-9">
          <div className="font-body text-sm font-semibold text-slate-900">
            Want these as PDFs?
          </div>
          <p className="mt-2 font-body text-sm text-slate-600 leading-relaxed">
            We can publish “BridgeStar Perspectives” as downloadable one-pagers
            and add a simple email subscription workflow later.
          </p>
          <div className="mt-5">
            <a
              href="#/#[contact]"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy text-white px-6 py-2.5 text-sm font-semibold font-body hover:opacity-95 transition"
            >
              Contact <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div>
            <div className="font-body font-semibold">{BRAND.name}</div>
            <div className="mt-1 font-body text-xs text-white/70">
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <div className="font-body text-xs font-semibold tracking-widest uppercase text-white/70">
                Navigate
              </div>
              <div className="mt-3 space-y-2">
                {[
                  ["Home", "#/"],
                  ["Solutions", "#/#[solutions]"],
                  ["Approach", "#/#[approach]"],
                  ["Insights", "#/insights"],
                  ["Contact", "#/#[contact]"],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    className="block font-body text-sm text-white/80 hover:text-white transition"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="font-body text-xs font-semibold tracking-widest uppercase text-white/70">
                Contact
              </div>
              <div className="mt-3 space-y-2 font-body text-sm text-white/80">
                <div>{BRAND.email}</div>
                <div>Bucharest (by appointment)</div>
              </div>
            </div>

            <div className="sm:col-span-1 col-span-2">
              <div className="font-body text-xs font-semibold tracking-widest uppercase text-white/70">
                Disclosure
              </div>
              <p className="mt-3 font-body text-xs text-white/70 leading-relaxed max-w-sm">
                Information only; not investment advice. Investing involves risk,
                including possible loss of principal. Past performance does not
                guarantee future results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const route = useHashRoute();

  return (
    <div className="min-h-screen bg-brand-light text-slate-900">
      <TopNav />
      {route === "insights" ? <InsightsPage /> : <HomePage />}
      <Footer />
    </div>
  );
}
