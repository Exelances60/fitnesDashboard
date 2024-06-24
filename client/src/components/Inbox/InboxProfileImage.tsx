import Image from "next/image";
import React from "react";

interface InboxProfileImageProps {
  src?: string;
  alt: string;
}

const InboxProfileImage = ({ src, alt }: InboxProfileImageProps) => {
  return (
    <div className="w-8 h-8 relative rounded-full overflow-hidden">
      <Image
        src={src || "/defaultProfile.png"}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 30vw, 20vw"
        style={{ objectFit: "cover" }}
        alt={alt}
      />
    </div>
  );
};

export default InboxProfileImage;
