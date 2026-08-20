import { Container } from '@/shared/ui/Container';
import { PageHeader } from '@/shared/ui/PageHeader';
import { MessyReactPlaceholder } from '@/features/messy-react/MessyReactPlaceholder';

export default function MessyReactPage() {
  return (
    <main aria-labelledby="messy-react-title">
      <Container>
        <PageHeader id="messy-react" eyebrow="Problem 03" title="Messy React" />
        <MessyReactPlaceholder />
      </Container>
    </main>
  );
}
