import Image from "next/image";

export function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      className="w-12 h-12 rounded-full border-2 border-gray-500"
      height={48}
      width={48}
    />
  );
}
