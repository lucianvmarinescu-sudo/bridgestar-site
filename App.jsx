import React, { useMemo, useState } from "react";
import { Mail, MapPin, Shield, TrendingUp, LineChart, Layers, ArrowRight } from "lucide-react";

/**
 * Single-file marketing site inspired by https://www.bluebridge-invest.com/
 * - One-page layout
 * - Hero w/ background image
 * - Services grid
 * - CTA section
 * - Contact info + simple form (mailto)
 *
 * Notes:
 * - Replace copy, services, and imagery as needed.
 * - The form opens the user's email client via mailto (no backend).
 */

const BRAND = {
  name: "BridgeStar Investments",
  tagline: "Disciplined access to U.S. markets for long-term wealth building.",
};

const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80",
  cta:
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2400&q=80",
};

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-slate-200/90 hover:text-white transition-colors"
    >
      {children}
    </a>
  );
}

function PillButton({ href, children, variant = "primary" }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/40";
  const styles =
    variant === "primary"
      ? "bg-white text-slate-900 hover:bg-white/90"
      : "bg-white/10 text-white hover:bg-white/15 ring-1 ring-white/15";

  return (
    <a href={href} className={classNames(base, styles)}>
      {children}
    </a>
  );
}

function SectionHeading({ kicker, title, desc }) {
  return (
    <div className="max-w-3xl">
      {kicker ? (
        <div className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
          {kicker}
        </div>
      ) : null}
      <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
      {desc ? <p className="mt-3 text-slate-600 leading-relaxed">{desc}</p> : null}
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc, img }) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-md transition">
      <div className="relative h-40">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover opacity-95 group-hover:opacity-100 transition"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/15 to-transparent" />
        <div className="absolute left-4 bottom-4 flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
            <Icon className="h-5 w-5 text-white" />
          </span>
          <div className="text-white font-semibold">{title}</div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState({ first: "", last: "", email: "", message: "" });

  const services = useMemo(
    () => [
      {
        title: "U.S. Market Portfolios",
        desc: "Globally diversified portfolios with a U.S. core—built for long horizons, not headlines.",
        icon: LineChart,
        img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Strategic Asset Allocation",
        desc: "Institutional portfolio construction with clear risk budgeting and rebalancing discipline.",
        icon: Layers,
        img: "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Risk Management",
        desc: "Drawdown-aware design, liquidity planning, and diversification across drivers of return.",
        icon: Shield,
        img: "https://images.unsplash.com/photo-1560472355-109703aa3edc?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Opportunistic Tilts",
        desc: "Measured tactical adjustments when warranted—implemented with strict governance.",
        icon: TrendingUp,
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      },
      {
        title: "Reporting & Transparency",
        desc: "Clear reporting, performance context, and an investor experience that prioritizes clarity.",
        icon: Mail,
        img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    []
  );

  const mailto = useMemo(() => {
    const to = "info@bridgestar.ro";
    const subject = encodeURIComponent(`${BRAND.name} — Contact Request`);
    const body = encodeURIComponent(
      `First name: ${form.first}\nLast name: ${form.last}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    return `mailto:${to}?subject=${subject}&body=${body}`;
  }, [form]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top nav */}
      <header className="sticky top-0 z-50 bg-slate-950/70 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <a href="#top" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center">
                <span className="text-white font-semibold">BS</span>
              </div>
              <div className="text-white font-semibold tracking-tight">{BRAND.name}</div>
            </a>

            <nav className="hidden md:flex items-center gap-7">
              <NavLink href="#invest">Invest</NavLink>
              <NavLink href="#grow">Grow</NavLink>
              <NavLink href="#services">Our Services</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </nav>

            <div className="flex items-center gap-3">
              <PillButton href="#login" variant="ghost">
                Login
              </PillButton>
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white text-slate-950 px-5 py-2.5 text-sm font-semibold hover:bg-white/90 transition"
              >
                Contact us <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.hero} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-slate-950/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/55 to-slate-50" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-20 sm:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-4 py-2 text-xs font-semibold text-white/90">
                Cross-border investing • U.S. markets • Long-term discipline
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                {BRAND.name}
              </h1>
              <p className="mt-4 text-lg text-white/80 leading-relaxed">{BRAND.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PillButton href="#invest" variant="primary">
                  Learn more <ArrowRight className="h-4 w-4" />
                </PillButton>
                <PillButton href="#services" variant="ghost">
                  Our services
                </PillButton>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["Institutional process", "Transparent reporting", "Global diversification"].map((x) => (
                  <div
                    key={x}
                    className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-5 py-4 text-white/85"
                  >
                    <div className="text-sm font-semibold">{x}</div>
                    <div className="mt-1 text-xs text-white/70">Designed for disciplined, long-horizon outcomes.</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <SectionHeading
          kicker="Our Services"
          title="A focused set of capabilities for serious investors"
          desc="We work with affluent individuals and families seeking disciplined exposure to U.S. and global markets. Our approach emphasizes diversification, risk management, and a repeatable investment process."
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </section>

      {/* CTA / Loans & Investments style section */}
      <section id="invest" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.cta} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-widest text-white/70 uppercase">Invest</div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              A range of strategies to suit different objectives
            </h2>
            <p className="mt-4 text-white/80 leading-relaxed">
              From core U.S. equity and high-quality fixed income to diversified multi-asset allocations, we aim to build
              resilient portfolios that can compound across market cycles.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillButton href="#contact" variant="primary">
                Request an intro call <ArrowRight className="h-4 w-4" />
              </PillButton>
              <PillButton href="#grow" variant="ghost">
                How we work
              </PillButton>
            </div>
          </div>
        </div>
      </section>

      {/* Grow / approach */}
      <section id="grow" className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <SectionHeading
          kicker="Grow"
          title="Process-driven investing, designed to be repeatable"
          desc="We emphasize clear governance: define objectives, set a strategic allocation, manage risks, and rebalance with discipline."
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              title: "1) Define objectives",
              desc: "Time horizon, liquidity needs, drawdown tolerance, and preferred currency exposure.",
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
            <div key={b.title} className="rounded-2xl bg-white ring-1 ring-slate-200 p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">{b.title}</div>
              <div className="mt-2 text-sm text-slate-600 leading-relaxed">{b.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-slate-900 text-white p-7 sm:p-9">
          <div className="text-sm font-semibold">A note on suitability</div>
          <p className="mt-2 text-sm text-white/80 leading-relaxed">
            BridgeStar Investments is designed for investors who value discipline, diversification, and a long-term
            approach. Any investment involves risk, including possible loss of principal.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <SectionHeading
              kicker="Contact"
              title="Let’s discuss fit"
              desc="If you’re a Romania-based investor or an expat seeking disciplined exposure to U.S. markets, we’d be happy to connect."
            />

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold">Office</div>
                  <div className="text-sm text-slate-600">
                    Bucharest (by appointment) • Serving clients globally
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold">Email</div>
                  <div className="text-sm text-slate-600">info@bridgestar.ro</div>
                </div>
              </div>

              <div className="text-xs text-slate-500">
                Replace the placeholder email with your real address before going live.
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm p-6 sm:p-8">
            <div className="text-sm font-semibold">Send a message</div>
            <p className="mt-2 text-sm text-slate-600">
              This form opens your email client to send the message (no website backend required).
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="text-sm">
                <div className="text-xs font-semibold text-slate-700">First Name</div>
                <input
                  value={form.first}
                  onChange={(e) => setForm((p) => ({ ...p, first: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  placeholder="First name"
                />
              </label>
              <label className="text-sm">
                <div className="text-xs font-semibold text-slate-700">Last Name</div>
                <input
                  value={form.last}
                  onChange={(e) => setForm((p) => ({ ...p, last: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  placeholder="Last name"
                />
              </label>
              <label className="text-sm sm:col-span-2">
                <div className="text-xs font-semibold text-slate-700">Email</div>
                <input
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  type="email"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  placeholder="you@example.com"
                />
              </label>
              <label className="text-sm sm:col-span-2">
                <div className="text-xs font-semibold text-slate-700">Message</div>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                  placeholder="Tell us what you’re looking for (time horizon, objectives, constraints)…"
                />
              </label>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <a
                href={mailto}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-6 py-2.5 text-sm font-semibold hover:bg-slate-800 transition"
              >
                Submit <ArrowRight className="h-4 w-4" />
              </a>
              <div className="text-xs text-slate-500">
                By contacting us you consent to being contacted back.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="text-sm font-semibold">{BRAND.name}</div>
              <div className="mt-1 text-xs text-slate-500">
                © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
              </div>
            </div>
            <div className="text-xs text-slate-500 max-w-2xl">
              Disclaimer: This website is for informational purposes only and does not constitute an offer to sell or a
              solicitation of an offer to buy any securities. Investing involves risk.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
