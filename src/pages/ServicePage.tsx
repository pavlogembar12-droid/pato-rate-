import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, Check, Phone, Send } from 'lucide-react';
import Page from '@/client/components/Page';
import { StructuredData } from '@/client/components/StructuredData';
import { contact } from '@/client/content/contact';
import { getServiceBySlug, services } from '@/client/content/services';
import NotFoundPage from '@/client/pages/NotFoundPage';

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <NotFoundPage />;
  }

  const others = services.filter((item) => item.slug !== service.slug);
  const Icon = service.icon;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seoDescription,
    areaServed: 'UA',
    provider: {
      '@type': 'ProfessionalService',
      name: 'PatoRate',
      telephone: '+380666667174',
      sameAs: [contact.telegramUrl],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
      itemListElement: service.deliverables.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item.title, description: item.text },
      })),
    },
  };

  return (
    <Page
      seo={{
        title: service.seoTitle,
        description: service.seoDescription,
      }}
    >
      <StructuredData data={serviceSchema} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-cocoa-100">
        <div className="bg-dotted absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-12 md:pb-20 md:pt-16">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-cocoa-500 transition-colors hover:text-cocoa-900"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Усі послуги
          </Link>

          <span className="animate-pop mt-8 flex h-14 w-14 items-center justify-center rounded-xl border-2 border-cocoa-900 bg-lime-300 text-cocoa-900">
            <Icon className="h-7 w-7" />
          </span>

          <p className="animate-fade-in mt-6 text-xs font-bold uppercase tracking-widest text-lime-600">
            {service.title}
          </p>
          <h1 className="animate-slide-up mt-3 max-w-2xl text-3xl font-extrabold leading-tight text-cocoa-900 sm:text-4xl md:text-5xl">
            {service.heading}
          </h1>

          <div className="animate-slide-up stagger-2 mt-6 max-w-2xl space-y-4">
            {service.intro.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-cocoa-600">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="animate-fade-in stagger-3 mt-8 flex flex-wrap gap-2">
            {service.points.map((point) => (
              <li
                key={point}
                className="inline-flex items-center gap-2 rounded-full border border-cocoa-200 bg-white px-4 py-1.5 text-sm font-semibold text-cocoa-700"
              >
                <Check className="h-4 w-4 text-lime-600" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Deliverables */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5">
          <h2 className="text-2xl font-extrabold text-cocoa-900 sm:text-3xl">Що входить у роботу</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {service.deliverables.map((item, i) => (
              <article
                key={item.title}
                style={{ animationDelay: `${i * 90}ms` }}
                className="animate-slide-up rounded-2xl border border-cocoa-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cocoa-900 hover:shadow-[6px_6px_0_0_var(--color-lime-300)]"
              >
                <h3 className="text-lg font-bold text-cocoa-900">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-cocoa-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="bg-cream-2 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5">
          <h2 className="text-2xl font-extrabold text-cocoa-900 sm:text-3xl">Кому підходить</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {service.audience.map((item, i) => (
              <li
                key={item}
                style={{ animationDelay: `${i * 90}ms` }}
                className="animate-slide-in flex items-center gap-3 rounded-xl border-l-4 border-lime-400 bg-white px-5 py-4 font-semibold text-cocoa-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Other services + CTA */}
      <section className="bg-cream px-5 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-extrabold text-cocoa-900 sm:text-3xl">Інші послуги</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {others.map((item) => (
              <Link
                key={item.slug}
                to={`/services/${item.slug}`}
                className="group rounded-xl border border-cocoa-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cocoa-900"
              >
                <item.icon className="h-5 w-5 text-lime-600" />
                <h3 className="mt-3 font-bold text-cocoa-900">{item.title}</h3>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-cocoa-500 transition-colors group-hover:text-lime-700">
                  Детальніше
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          <div className="animate-slide-up mt-14 overflow-hidden rounded-2xl bg-cocoa-900 px-7 py-12 md:px-12">
            <h2 className="max-w-xl text-2xl font-extrabold leading-tight text-cream sm:text-3xl">
              Обговоримо саме ваш випадок?
            </h2>
            <p className="mt-4 max-w-xl text-cream/70">
              Напишіть — розберемо поточний стан і скажу, чи має сенс ця послуга для вас.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={contact.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-lime-300 px-7 py-3.5 text-base font-bold text-cocoa-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-lime-200"
              >
                <Send className="h-4 w-4" />
                Telegram {contact.telegramHandle}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href={contact.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border-2 border-cream/25 px-7 py-3.5 text-base font-bold text-cream transition-colors duration-200 hover:border-cream/60"
              >
                <Phone className="h-4 w-4" />
                {contact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
