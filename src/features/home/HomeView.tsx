import { Card } from '@/shared/ui/Card';
import { PROBLEM_NAV } from '@/shared/lib/routes';

const REPO_URL = 'https://github.com/do-phuc/code-challenge-99tech';

export function HomeView() {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="lux-eyebrow m-0">Frontend engineer</p>
          <a
            id="home-github-repo"
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="lux-caption m-0 font-semibold text-champagne underline-offset-4 !underline"
          >
            GitHub Repository
          </a>
        </div>
        <h1 className="lux-display m-0 text-5xl sm:text-6xl">
          Code Challenges<em>.</em>
        </h1>
        <p className="lux-body m-0 text-lg">
          Submitted answers to the three interview problems. Open a problem to review the solution.
        </p>
      </header>

      <nav aria-label="Problem solutions">
        <ul className="m-0 grid list-none gap-4 p-0">
          {PROBLEM_NAV.map((item) => (
            <li key={item.id}>
              <Card id={item.id} to={item.to} eyebrow={`Problem ${item.number}`} title={item.title}>
                {item.description}
              </Card>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
