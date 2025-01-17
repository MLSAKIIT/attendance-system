import Image from "next/image";
import React from "react";

const BgVectors = () => {
  return (
    <div className="absolute inset-0 max-h-screen mx-auto max-w-[1920px] pointer-events-none">
      <Image
        src="/assets/images/heroLeft.png"
        alt="Hero Left"
        width={700}
        height={700}
        className="absolute left-0 top-0 h-full w-auto max-w-[50%] object-cover z-0"
      />
      <Image
        src="/assets/images/heroRight.png"
        alt="Hero Right"
        width={1000}
        height={800}
        className="absolute right-0 top-0 h-full w-auto max-w-[50%] object-cover z-0"
      />
    </div>
  );
};

export default BgVectors;
