import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/lib/routes';
import { Button } from '@/shared/ui/Button';
import { BackIcon } from '@/shared/ui/icons/BackIcon';

type PageHeaderProps = {
  /** Prefix for heading and back-link ids (`{id}-title`, `{id}-back`). */
  id: string;
  title: string;
  eyebrow?: string;
};

/**
 * Problem-page heading with a back-to-home link. Not a site-wide header.
 */
export function PageHeader({ id, title, eyebrow }: PageHeaderProps) {
  return (
    <header className="mb-12 flex flex-col gap-5">
      <Button
        id={`${id}-back`}
        as={Link}
        to={ROUTES.home}
        variant="ghost"
        size="sm"
        className="w-fit normal-case tracking-normal"
      >
        <BackIcon className="size-4 shrink-0" />
        All challenges
      </Button>
      {eyebrow ? <p className="lux-eyebrow m-0">{eyebrow}</p> : null}
      <h1 id={`${id}-title`} className="lux-display m-0 text-4xl sm:text-5xl">
        {title}
      </h1>
    </header>
  );
}
