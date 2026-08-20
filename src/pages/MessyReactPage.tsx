import { Container } from '@/shared/ui/Container';
import { PageHeader } from '@/shared/ui/PageHeader';

export default function MessyReactPage() {
  return (
    <main aria-labelledby="messy-react-title">
      <Container>
        <PageHeader
          id="messy-react"
          problem="messy-react"
          eyebrow="Problem 03"
          title="Messy React"
        />
      </Container>
    </main>
  );
}
