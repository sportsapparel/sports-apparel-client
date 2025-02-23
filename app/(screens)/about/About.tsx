"use client";
import Banner from "@/components/Banner";
import { ZoomGrid } from "@/components/ZoomImage";
import { images } from "@/constants/imageUrls";

const About = () => {
  const columns = [
    {
      imageUrl: images.AboutPageZoomGrid1,
      // backgroundColor: "bg-slate-950",
      alt: "First column image",
    },
    {
      imageUrl: images.AboutPageZoomGrid2,
      // backgroundColor: "bg-slate-700",
      alt: "Second column image",
    },
    {
      imageUrl: images.AboutPageZoomGrid3,
      // backgroundColor: "bg-slate-800",
      alt: "Third column image",
    },
  ];
  return (
    <main className="pb-10">
      <section className="p-10 space-y-2">
        <h1 className="text-center"> Our Story</h1>
        <p className="text-xl font-extralight text-center">
          I&apos;m a paragraph. Click here to add your own text <br />
          and edit me. Let your users get to know you.
        </p>
      </section>

      <ZoomGrid
        className="h-[70dvh] w-full bg-slate-300 text-white grid grid-cols-3"
        columns={columns}
      />

      <Banner
        // ImageRight

        image={images.AboutPageBannerImage1}
        title="Sustainability"
        imageAlt="banner"
        subtitle="From our farms, to our manufacturing and packaging."
        description="I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you."
      />
      <Banner
        ImageRight
        image={images.AboutPageBannerImage2}
        title="Our Factories
"
        imageAlt="banner"
        subtitle="We respect people as much as we respect the planet. "
        description="I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you."
      />
      <Banner
        // ImageRight
        image={images.AboutPageBannerImage3}
        title="Our Fabrics
"
        imageAlt="banner"
        subtitle="Crafted from recycled and sustainably grown fibers."
        description="I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you."
      />
    </main>
  );
};

export default About;
