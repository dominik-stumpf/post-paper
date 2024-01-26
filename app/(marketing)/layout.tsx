import { Footer } from '@/components/footer';
import { PageRoot } from '@/components/page-root';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <PageRoot>{children}</PageRoot>
      <Footer />
    </>
  );
}
