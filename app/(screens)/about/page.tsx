"use client";
import Banner from "@/components/Banner";
import { ZoomGrid } from "@/components/ZoomImage";

const About = () => {
  const columns = [
    {
      imageUrl:
        "https://static.wixstatic.com/media/e4f166_1fb1aa39631c40daa10f067924e142c5~mv2_d_4480_6720_s_4_2.jpg/v1/fill/w_506,h_506,fp_0.48_0.45,q_90/e4f166_1fb1aa39631c40daa10f067924e142c5~mv2_d_4480_6720_s_4_2.webp",
      // backgroundColor: "bg-slate-950",
      alt: "First column image",
    },
    {
      imageUrl:
        "https://static.wixstatic.com/media/e4f166_568ce28bdcb54b598e69ab5be1b18052~mv2.jpeg/v1/fill/w_506,h_506,q_90/e4f166_568ce28bdcb54b598e69ab5be1b18052~mv2.webp ",
      // backgroundColor: "bg-slate-700",
      alt: "Second column image",
    },
    {
      imageUrl:
        "https://static.wixstatic.com/media/e4f166_f0cf91a5d91e4af384b6eb32ac981fa6~mv2.jpeg/v1/fill/w_506,h_506,fp_0.49_0.38,q_90/e4f166_f0cf91a5d91e4af384b6eb32ac981fa6~mv2.webp",
      // backgroundColor: "bg-slate-800",
      alt: "Third column image",
    },
  ];
  return (
    <main className="py-10">
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
        image="https://static.wixstatic.com/media/e4f166_74936ec1df54418482948479f570bd28~mv2_d_4912_7360_s_4_2.jpg/v1/fill/w_550,h_825,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GettyImages-1060254952.jpg"
        title="Sustainability"
        imageAlt="banner"
        subtitle="From our farms, to our manufacturing and packaging."
        description="I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you."
      />
      <Banner
        ImageRight
        image="https://static.wixstatic.com/media/e4f166_148c5b24b0c14c0787d6fc0c1b1d9d10~mv2_d_7360_4912_s_4_2.jpg/v1/crop/x_2039,y_0,w_3282,h_4912/fill/w_423,h_633,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/GettyImages-1147463141.jpg"
        title="Our Factories
"
        imageAlt="banner"
        subtitle="We respect people as much as we respect the planet. "
        description="I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you."
      />
      <Banner
        // ImageRight
        image="https://static.wixstatic.com/media/e4f166_d318767fb0d94737892a196dcbffaec9~mv2_d_5262_3508_s_4_2.jpg/v1/fill/w_440,h_660,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/GettyImages-110883483.jpg"
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
