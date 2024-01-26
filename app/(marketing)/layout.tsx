import { Footer } from '@/components/footer';
import { PageMargin } from '@/components/page-margin';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <PageMargin verticalMargin>{children}</PageMargin>
      <Footer />
    </>
  );
}
