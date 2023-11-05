import Image from "next/image";
import nextagramLogo from "@/public/img/logo_comp.webp";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    
      <div className={cn(`relative w-auto ${className}`)}>
        <Link href="/social">
        <Image
          fill
          priority
          src={nextagramLogo}
          alt="portalize logo"
          className="object-contain dark:fill-amber-50"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        </Link>
      </div>
  );
};

export default Logo;
