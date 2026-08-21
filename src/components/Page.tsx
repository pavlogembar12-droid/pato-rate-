/**
 * Page wrapper template to be used as a base for all pages.
 * Marketing shell for PatoRate: sticky header with nav + footer.
 */

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, Phone, Send, X } from 'lucide-react';
import LoadingSpinner from '@/client/components/LoadingSpinner';
import { Seo, type SeoProps } from '@/client/components/Seo';
import { contact } from '@/client/content/contact';
import { services } from '@/client/content/services';
import { cn } from '@/client/lib/utils';

interface PageProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  /** Per-page <head> overrides (title, description, OG image, etc). */
  seo?: SeoProps;
}

const navLinks = [
  { label: 'Послуги', href: '/#services' },
  { label: 'Як працюємо', href: '/#process' },
  { label: 'Питання', href: '/#faq' },
];

/** Resets scroll on route change (anchors within a page are unaffected). */
function useScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn('group inline-flex items-center gap-2.5', className)}
      aria-label="PatoRate — на головну"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cocoa-900 transition-transform duration-300 group-hover:-rotate-6">
        <span className="h-3.5 w-3.5 rounded-full bg-lime-300" />
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-cocoa-900">
        Pato<span className="text-lime-600">Rate</span>
      </span>
    </Link>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-cocoa-100 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-cocoa-600 transition-colors duration-200 hover:bg-cocoa-100 hover:text-cocoa-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contact.phoneHref}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-cocoa-700 transition-colors duration-200 hover:bg-cocoa-100 hover:text-cocoa-900 lg:inline-flex"
          >
            <Phone className="h-4 w-4 text-lime-600" />
            {contact.phoneDisplay}
          </a>
          <a
            href={contact.telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border-2 border-cocoa-900 bg-lime-300 px-5 py-2 text-sm font-bold text-cocoa-900 shadow-[3px_3px_0_0_var(--color-cocoa-900)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--color-cocoa-900)] sm:inline-flex"
          >
            <Send className="h-4 w-4" />
            Написати
          </a>
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cocoa-200 text-cocoa-900 transition-colors hover:bg-cocoa-100 md:hidden"
            aria-label={isOpen ? 'Закрити меню' : 'Відкрити меню'}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="animate-slide-up border-t border-cocoa-100 bg-cream px-5 py-3 md:hidden">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-semibold text-cocoa-800 transition-colors hover:bg-cocoa-100"
              >
                {link.label}
              </a>
            ))}
            <a
              href={contact.telegramUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border-2 border-cocoa-900 bg-lime-300 px-5 py-2.5 text-center text-sm font-bold text-cocoa-900"
            >
              <Send className="h-4 w-4" />
              Telegram {contact.telegramHandle}
            </a>
            <a
              href={contact.phoneHref}
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border-2 border-cocoa-200 px-5 py-2.5 text-center text-sm font-bold text-cocoa-800"
            >
              <Phone className="h-4 w-4 text-lime-600" />
              {contact.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-cocoa-100 bg-cream-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="max-w-xs space-y-3">
          <Logo />
          <p className="text-sm leading-relaxed text-cocoa-600">
            Практичні послуги для локального бізнесу: репутація, Google Карти,
            операційний супровід та лендінги, що продають.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold uppercase tracking-widest text-cocoa-400">
            Послуги
          </h2>
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="text-sm font-semibold text-cocoa-700 transition-colors hover:text-lime-600"
            >
              {service.title}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold uppercase tracking-widest text-cocoa-400">
            Навігація
          </h2>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-cocoa-700 transition-colors hover:text-lime-600"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold uppercase tracking-widest text-cocoa-400">
            Контакти
          </h2>
          <a
            href={contact.telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cocoa-700 transition-colors hover:text-lime-600"
          >
            <Send className="h-4 w-4 text-lime-600" />
            {contact.telegramHandle}
          </a>
          <a
            href={contact.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cocoa-700 transition-colors hover:text-lime-600"
          >
            <Phone className="h-4 w-4 text-lime-600" />
            {contact.phoneDisplay}
          </a>
          <Link
            to="/terms"
            className="text-sm font-semibold text-cocoa-700 transition-colors hover:text-lime-600"
          >
            Умови користування
          </Link>
        </div>
      </div>
      <div className="border-t border-cocoa-100 px-5 py-5 text-center text-xs text-cocoa-500">
        © {new Date().getFullYear()} PatoRate. Усі права захищено.
      </div>
    </footer>
  );
}

function PageBody({ children, className, isLoading = false }: PageProps) {
  return (
    <main id="main" className={cn('flex w-full flex-1 flex-col', className)}>
      {isLoading ? (
        <div className="flex min-h-[50vh] w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        children
      )}
    </main>
  );
}

export default function Page({ children, className, isLoading = false, seo }: PageProps) {
  useScrollToTopOnNavigate();

  return (
    <div className="flex min-h-screen max-w-full flex-col overflow-x-hidden bg-cream">
      <Seo {...seo} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:border-2 focus:border-cocoa-900 focus:bg-lime-300 focus:px-5 focus:py-2 focus:text-sm focus:font-bold focus:text-cocoa-900"
      >
        Перейти до вмісту
      </a>
      <Header />
      <PageBody className={className} isLoading={isLoading}>
        {children}
      </PageBody>
      <Footer />
    </div>
  );
}
