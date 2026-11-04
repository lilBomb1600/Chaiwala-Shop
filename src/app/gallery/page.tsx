import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { Gallery } from "@/components/gallery/Gallery";

export const metadata: Metadata = {
  title: "Photos",
  description: "Photos from Chaiwala Shop in Concord, CA: the counter, chai in clay kullads, Maggi, fries and more.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHead title="From my counter." tone="tea">
        The room on Salvio St, and stills from the videos I post. Tap any photo to see it bigger.
      </PageHead>
      <section className="bg-tea pb-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-6 lg:px-12">
          <Gallery />
        </div>
      </section>
    </>
  );
}
