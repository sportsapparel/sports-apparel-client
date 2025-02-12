import Image from "next/image";
import React from "react";
import Button from "./Button";

const HeroSection = () => {
  return (
    <div className="relative min-h-dvh w-full container-c overflow-hidden">
      <div className="bg-slate-500 h-[500px] w-[400px] absolute left-[40%] -translate-x-[50%] top-[40%] -translate-y-1/2">
        <Image
          src="https://static.wixstatic.com/media/e4f166_534c0ae06bb04801859e41974d8f7f82~mv2_d_7136_5792_s_4_2.jpg/v1/crop/x_1245,y_0,w_4645,h_5792/fill/w_506,h_631,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/GettyImages-1149829394.jpg"
          alt="hero-1"
          fill
        />
      </div>
      <div className="bg-slate-300 h-[400px] w-[500px] absolute left-[65%] -translate-x-[40%] top-[70%] -translate-y-1/2">
        <Image
          src="https://static.wixstatic.com/media/e4f166_eb8875c8a7814dbab13738710a15c9d6~mv2_d_5616_3744_s_4_2.jpg/v1/crop/x_938,y_420,w_3740,h_2892/fill/w_713,h_551,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GettyImages-687511962.jpg"
          alt="hero-2"
          fill
        />
      </div>
      <div className="bg-[#FCF6F2]  w-[300px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 sm-to-xs:w-full">
        <div className="space-y-6 text-center p-10">
          <h4>Ethically Made</h4>
          <p className="font-thin">
            We are a team of passionate designers and makers who are dedicated
            to creating beautiful and functional products.
          </p>
          <Button>Learn More</Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
