import Image from "next/image";
import { Rocket } from "lucide-react";
import { useState } from "react";

export function Logo() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {imgError ? (
        <Rocket className="h-6 w-6 text-primary" />
      ) : (
        <Image
          src="/logo.png" // Put your file in the `public/` folder
          alt="TooProductive Logo"
          width={32}
          height={32}
          priority
          onError={() => setImgError(true)}
        />
      )}
      <span className="text-xl font-bold">TooProductive</span>
    </div>
  );
}
