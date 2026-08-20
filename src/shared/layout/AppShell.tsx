import { Outlet } from 'react-router-dom';

/** Page frame: background canvas and routed content. */
export function AppShell() {
  return (
    <div className="app-shell">
      <Outlet />
    </div>
  );
}
