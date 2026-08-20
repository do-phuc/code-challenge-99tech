import { Link } from 'react-router-dom';
import { PROBLEM_NAV, ROUTES, type AppPath } from '@/shared/lib/routes';
import { Button } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

export type ProblemKey = 'sum-to-n' | 'fancy-form' | 'messy-react';

type PageHeaderProps = {
  /** Prefix for heading and nav ids (`{id}-title`, `{id}-prev`, `{id}-next`). */
  id: string;
  title: string;
  eyebrow?: string;
  /** Current problem — drives previous / next challenge links. */
  problem: ProblemKey;
};

type NavTarget = {
  to: AppPath;
  label: string;
};

const PROBLEM_ORDER: readonly ProblemKey[] = ['sum-to-n', 'fancy-form', 'messy-react'];

const PATH_BY_KEY: Record<ProblemKey, AppPath> = {
  'sum-to-n': ROUTES.sumToN,
  'fancy-form': ROUTES.fancyForm,
  'messy-react': ROUTES.messyReact,
};

const HOME_TARGET: NavTarget = { to: ROUTES.home, label: 'Home' };

function problemTarget(key: ProblemKey): NavTarget {
  const item = PROBLEM_NAV.find((entry) => entry.to === PATH_BY_KEY[key]);
  return {
    to: PATH_BY_KEY[key],
    label: item ? `Problem ${Number(item.number)}` : key,
  };
}

function getPrevTarget(problem: ProblemKey): NavTarget {
  const index = PROBLEM_ORDER.indexOf(problem);
  if (index <= 0) return HOME_TARGET;
  return problemTarget(PROBLEM_ORDER[index - 1]!);
}

function getNextTarget(problem: ProblemKey): NavTarget {
  const index = PROBLEM_ORDER.indexOf(problem);
  if (index < 0 || index >= PROBLEM_ORDER.length - 1) return HOME_TARGET;
  return problemTarget(PROBLEM_ORDER[index + 1]!);
}

const navButtonClass = 'w-fit normal-case tracking-normal';

/**
 * Problem-page heading with previous / next buttons.
 * Problem 1 backs to Home; Problem 3 advances to Home.
 */
export function PageHeader({ id, title, eyebrow, problem }: PageHeaderProps) {
  const prev = getPrevTarget(problem);
  const next = getNextTarget(problem);

  return (
    <header className="mb-12 flex flex-col gap-5">
      <nav
        aria-label="Problem navigation"
        className="flex flex-wrap items-center justify-between gap-2"
      >
        <Button
          id={`${id}-prev`}
          as={Link}
          to={prev.to}
          variant="ghost"
          size="sm"
          className={navButtonClass}
        >
          <Icon src="/icons/back.svg" className="size-4" />
          {prev.label}
        </Button>

        <Button
          id={`${id}-next`}
          as={Link}
          to={next.to}
          variant="ghost"
          size="sm"
          className={navButtonClass}
        >
          {next.label}
          <Icon src="/icons/forward.svg" className="size-4" />
        </Button>
      </nav>

      {eyebrow ? <p className="lux-eyebrow m-0">{eyebrow}</p> : null}
      <h1 id={`${id}-title`} className="lux-display m-0 text-4xl sm:text-5xl">
        {title}
      </h1>
    </header>
  );
}
