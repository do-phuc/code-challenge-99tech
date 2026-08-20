import { Container } from '@/shared/ui/Container';
import { PageHeader } from '@/shared/ui/PageHeader';
import { FancyFormPlaceholder } from '@/features/fancy-form/FancyFormPlaceholder';

export default function FancyFormPage() {
  return (
    <main aria-labelledby="fancy-form-title">
      <Container>
        <PageHeader id="fancy-form" eyebrow="Problem 02" title="Fancy Form" />
        <FancyFormPlaceholder />
      </Container>
    </main>
  );
}
