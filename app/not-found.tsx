import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-charcoal">
      <Navbar />
      <section className="container-art flex min-h-[80vh] flex-col items-center justify-center pb-20 pt-36 text-center">
        <div className="inline-flex items-center gap-3">
          <span className="h-px w-10 bg-gold" />
          <span className="eyebrow">404</span>
          <span className="h-px w-10 bg-gold" />
        </div>
        <h1 className="display-text mt-6 max-w-3xl text-5xl md:text-7xl">
          This portrait page is not on the wall.
        </h1>
        <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-ivory/65">
          The page may have moved, but the studio is still open.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/portfolio" className="btn-primary">
            View Portfolio
          </Link>
          <Link href="/order" className="btn-outline">
            Start an Order
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
