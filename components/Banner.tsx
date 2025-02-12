import Image from "next/image";

interface BannerProps {
  image?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  imageAlt?: string;
  ImageRight?: boolean;
}

const Banner: React.FC<BannerProps> = ({
  image,
  title = "Sustainability",
  subtitle = "From our farms, to our manufacturing and packaging.",
  description = "I'm a paragraph. Click here to add your own text and edit me.",
  imageAlt = "Banner image",
  ImageRight = false,
}) => {
  const styles = {
    container: "mx-auto py-20 px-4 md:px-8 lg:px-12 max-w-7xl",
    wrapper: "grid grid-cols-2 md-to-xs:grid-cols-1",
    imageContainer: "w-full flex justify-start items-start",
    image: "h-[70dvh] object-contain",
    contentContainer: `flex flex-col justify-center space-y-2 text-center max-w-md`,
    title: "text-3xl md:text-4xl lg:text-5xl font-semibold",
    subtitle: "text-lg md:text-xl font-light text-gray-700",
    description: "text-base font-extralight text-gray-600 max-w-lg",
  } as const;

  return (
    <div className={styles.container}>
      <div className="grid grid-cols-2 md-to-xs:grid-cols-1 place-items-center gap-10">
        {!ImageRight && (
          <div className={styles.imageContainer}>
            <Image
              src={image || ""}
              alt={imageAlt}
              className={styles.image}
              height={2000}
              width={2000}
            />
          </div>
        )}

        <div className={styles.contentContainer}>
          <h2 className="">{title}</h2>
          <p className="text-lg font-light">{subtitle}</p>
          <p className="text-base font-extralight ">{description}</p>
        </div>
        {ImageRight && (
          <div className={styles.imageContainer}>
            <Image
              src={image || ""}
              alt={imageAlt}
              className={styles.image}
              height={2000}
              width={2000}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
