import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import Page from '@/client/components/Page';

export default function NotFoundPage() {
  return (
    <Page seo={{ title: 'Сторінку не знайдено', noindex: true }}>
      <div className="flex min-h-[65vh] flex-col items-center justify-center px-5 py-20 text-center">
        <span className="animate-pop font-display text-7xl font-extrabold text-cocoa-900 sm:text-8xl">
          4<span className="text-lime-500">0</span>4
        </span>
        <h1 className="animate-slide-up mt-4 text-2xl font-bold text-cocoa-900">
          Такої сторінки немає
        </h1>
        <p className="animate-fade-in stagger-2 mt-3 max-w-md text-cocoa-600">
          Можливо, посилання застаріло. Повернімося на головну — там усі послуги.
        </p>
        <Link
          to="/"
          className="animate-slide-up stagger-3 group mt-8 inline-flex items-center gap-2 rounded-full border-2 border-cocoa-900 bg-lime-300 px-7 py-3.5 text-base font-bold text-cocoa-900 shadow-[4px_4px_0_0_var(--color-cocoa-900)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--color-cocoa-900)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          На головну
        </Link>
      </div>
    </Page>
  );
}
