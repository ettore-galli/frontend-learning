import Image from "next/image";
import Coso from "@/components/coso";
import Link from "next/link";

export default function MyOtherNewPage() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>NUOVA</h1>
      <Coso />
      <Link href="/contact">ContactZ</Link>
    </div>
  );
}
