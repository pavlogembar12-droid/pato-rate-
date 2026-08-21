import { Spinner } from '@/client/components/ui/Spinner';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  message?: string;
}

/**
 * Page-level loading state (centered container, optional full-screen + message).
 * For an inline spinner inside a control (e.g. a button), use
 * `components/ui/Spinner` instead.
 */
export default function LoadingSpinner({ fullScreen = false, message }: LoadingSpinnerProps) {
  const containerClasses = fullScreen
    ? 'h-screen flex items-center justify-center bg-cream'
    : 'flex items-center justify-center min-h-[40vh] w-full';

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="size-8 text-lime-600" />
        {message ? (
          <p className="text-sm text-cocoa-600">{message}</p>
        ) : (
          <span className="sr-only">Завантаження</span>
        )}
      </div>
    </div>
  );
}
