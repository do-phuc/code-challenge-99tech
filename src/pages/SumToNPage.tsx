import { Container } from '@/shared/ui/Container';
import { PageHeader } from '@/shared/ui/PageHeader';
import { SumToNPlaceholder } from '@/features/sum-to-n/SumToNPlaceholder';

export default function SumToNPage() {
  return (
    <main aria-labelledby="sum-to-n-title">
      <Container>
        <PageHeader id="sum-to-n" eyebrow="Problem 01" title="Three ways to sum to n" />
        <SumToNPlaceholder />
      </Container>
    </main>
  );
}
