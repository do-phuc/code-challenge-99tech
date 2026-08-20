import { Card } from '@/shared/ui/Card';
import { PROBLEM_NAV } from '@/shared/lib/routes';

export function HomeView() {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex max-w-2xl flex-col gap-4">
        <p className="lux-eyebrow m-0">Frontend engineer</p>
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
