import { Container } from '@/shared/ui/Container';
import { HomeView } from '@/features/home/HomeView';

export default function HomePage() {
  return (
    <main id="home-page">
      <Container>
        <HomeView />
      </Container>
    </main>
  );
}
