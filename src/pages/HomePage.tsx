import { Link } from 'react-router';
import { ArrowRight, Check, Phone, Send } from 'lucide-react';
import Page from '@/client/components/Page';
import { StructuredData } from '@/client/components/StructuredData';
import { contact } from '@/client/content/contact';
import { services } from '@/client/content/services';

const steps = [
  { n: '01', title: 'Знайомство', text: 'Коротка розмова: що болить, які цілі, який зараз стан профілю та сайту.' },
  { n: '02', title: 'План дій', text: 'Даю конкретний перелік робіт, строки та очікуваний результат — без «магії».' },
  { n: '03', title: 'Робота', text: 'Виконую роботи, тримаю вас у курсі та фіксую метрики до/після.' },
  { n: '04', title: 'Підтримка', text: 'Далі — регулярний супровід: відгуки, картка, сторінки, звітність.' },
];

const faq = [
  {
    q: 'Ви купуєте відгуки?',
    a: 'Ні. Працюємо тільки з реальними клієнтами: правильний момент запиту, зручний формат і робота з негативом. Це довше, але безпечно для картки.',
  },
  {
    q: 'Скільки часу до перших результатів?',
    a: 'По відгуках і Google Картах перші зміни видно зазвичай через 2–4 тижні. Лендінг — від кількох днів до 2 тижнів залежно від обсягу.',
  },
  {
    q: 'Працюєте з малим бізнесом?',
    a: 'Так, це основний профіль: кафе, салони, сервіси, майстри, локальні магазини та невеликі агенції.',
  },
];

const marquee = [
  'Відгуки',
  'Google Карти',
  'Локальне SEO',
  'Лендінги',
  'Репутація',
  'Ведення бізнесу',
  'Аналітика',
];

const stats: [string, string][] = [
  ['4', 'напрями робіт'],
  ['2–4', 'тижні до змін'],
  ['0', 'фейкових відгуків'],
  ['1', 'відповідальний'],
];

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'PatoRate',
  description:
    'Підвищення відгуків, супровід Google Карт, ведення бізнесу та створення лендінгів для локального бізнесу.',
  telephone: '+380666667174',
  areaServed: 'UA',
  sameAs: [contact.telegramUrl],
  makesOffer: services.map((service) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: service.title, description: service.text },
  })),
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export default function HomePage() {
  return (
    <Page
      seo={{
        title: 'Відгуки, Google Карти та лендінги для бізнесу по всій Україні',
        description:
          'PatoRate: підвищення відгуків Google , супровід Google Карт, ведення бізнесу та  Дистанційно по всій Україні і метрики до/після.',
      }}
    >
      <StructuredData data={organizationSchema} />
      <StructuredData data={faqSchema} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-dotted absolute inset-0 opacity-60" aria-hidden />
        <div
          className="animate-float absolute -right-24 top-10 h-72 w-72 rounded-full bg-lime-200/60 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 md:pb-28 md:pt-24">
          <span className="animate-pop inline-flex items-center gap-2 rounded-full border border-cocoa-200 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cocoa-600">
            <span className="h-2 w-2 rounded-full bg-lime-400" />
            Репутація · Карти · Сайти
          </span>

          <h1 className="animate-slide-up stagger-1 mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] text-cocoa-900 sm:text-5xl md:text-6xl">
            Робимо так, щоб бізнес{' '}
            <span className="relative inline-block">
              <span className="relative z-10">знаходили і обирали</span>
              <span
                className="absolute inset-x-0 bottom-1 z-0 h-3 -rotate-1 bg-lime-300 md:h-4"
                aria-hidden
              />
            </span>
          </h1>

          <p className="animate-slide-up stagger-2 mt-6 max-w-xl text-lg leading-relaxed text-cocoa-600">
            PatoRate — це відгуки, Google Карти, операційний супровід і лендінги.
            Один підрядник замість чотирьох, прозорий план і зрозумілі метрики.
          </p>

          <div className="animate-slide-up stagger-3 mt-9 flex flex-wrap items-center gap-3">
            <a
              href={contact.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-cocoa-900 bg-lime-300 px-7 py-3.5 text-base font-bold text-cocoa-900 shadow-[4px_4px_0_0_var(--color-cocoa-900)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--color-cocoa-900)]"
            >
              <Send className="h-4 w-4" />
              Отримати консультацію
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border-2 border-cocoa-200 px-7 py-3.5 text-base font-bold text-cocoa-800 transition-colors duration-200 hover:border-cocoa-400 hover:bg-white"
            >
              <Phone className="h-4 w-4 text-lime-600" />
              {contact.phoneDisplay}
            </a>
          </div>

          <dl className="animate-fade-in stagger-4 mt-14 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-3xl font-extrabold text-cocoa-900">{value}</dt>
                <dd className="mt-1 text-sm text-cocoa-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-cocoa-100 bg-cocoa-900 py-4">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {[...marquee, ...marquee].map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="font-display text-sm font-bold uppercase tracking-[0.2em] text-cream/70"
            >
              {word}
              <span className="ml-10 text-lime-400">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <section id="services" className="scroll-mt-24 bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-lime-600">
              Послуги
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-cocoa-900 sm:text-4xl">
              Чотири напрями, які закривають зростання
            </h2>
            <p className="mt-4 text-lg text-cocoa-600">
              Можна брати окремо або пакетом — тоді напрями підсилюють один одного.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service, i) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                style={{ animationDelay: `${i * 90}ms` }}
                className="animate-slide-up group flex flex-col rounded-2xl border border-cocoa-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cocoa-900 hover:shadow-[6px_6px_0_0_var(--color-lime-300)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime-100 text-lime-700 transition-colors duration-300 group-hover:bg-lime-300 group-hover:text-cocoa-900">
                  <service.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-cocoa-900">{service.title}</h3>
                <p className="mt-2 leading-relaxed text-cocoa-600">{service.text}</p>
                <ul className="mt-5 space-y-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-cocoa-700">
                      <Check className="h-4 w-4 shrink-0 text-lime-600" />
                      {point}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-cocoa-500 transition-colors duration-200 group-hover:text-lime-700">
                  Детальніше про послугу
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-24 bg-cream-2 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-lime-600">
              Як працюємо
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-cocoa-900 sm:text-4xl">
              Чотири кроки без сюрпризів
            </h2>
          </div>

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li
                key={step.n}
                style={{ animationDelay: `${i * 90}ms` }}
                className="animate-slide-in rounded-xl border-l-4 border-lime-400 bg-white p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="font-display text-sm font-extrabold text-cocoa-300">{step.n}</span>
                <h3 className="mt-2 text-lg font-bold text-cocoa-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cocoa-600">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl font-extrabold text-cocoa-900 sm:text-4xl">Часті питання</h2>
          <div className="mt-10 divide-y divide-cocoa-200 border-y border-cocoa-200">
            {faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-cocoa-900 transition-colors hover:text-lime-700">
                  {item.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cocoa-200 text-cocoa-500 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="animate-fade-in mt-3 leading-relaxed text-cocoa-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="scroll-mt-24 px-5 pb-20 md:pb-28">
        <div className="animate-slide-up relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-cocoa-900 px-7 py-14 md:px-16 md:py-20">
          <div
            className="animate-float absolute -left-16 -top-16 h-64 w-64 rounded-full bg-lime-500/20 blur-3xl"
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-extrabold leading-tight text-cream sm:text-4xl md:text-5xl">
              Розкажіть про бізнес — я скажу, з чого почати
            </h2>
            <p className="mt-5 text-lg text-cream/70">
              Безкоштовна консультація: розберемо профіль у Google, відгуки та сайт,
              і ви отримаєте конкретний список дій.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={contact.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-lime-300 px-7 py-3.5 text-base font-bold text-cocoa-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-lime-200"
              >
                <Send className="h-4 w-4" />
                Написати в Telegram {contact.telegramHandle}
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
