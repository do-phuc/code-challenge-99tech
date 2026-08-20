import { Container } from '@/shared/ui/Container';
import { PageHeader } from '@/shared/ui/PageHeader';
import { FancyFormView } from '@/features/fancy-form/FancyFormView';

export default function FancyFormPage() {
  return (
    <main aria-labelledby="fancy-form-title">
      <Container>
        <PageHeader id="fancy-form" problem="fancy-form" eyebrow="Problem 02" title="Fancy Form" />
        <FancyFormView />
      </Container>
    </main>
  );
}
