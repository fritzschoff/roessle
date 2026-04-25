import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      {/* Wrapper: navbar + content + red stripe (everything above footer) */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Full-height red diagonal stripe — desktop only (lg+) */}
        <div
          className="hidden lg:block absolute top-0 right-0 bottom-0 w-[38%] xl:w-[33%] 2xl:w-[30%] z-40 pointer-events-none"
          style={{
            clipPath: "polygon(100% 0, 100% 100%, 0 100%, 180px 0)",
          }}
        >
          <div className="absolute inset-0 bg-ckb-red" />
          {/* Large wappen — partially cropped by the clip-path diagonal */}
          <div className="absolute top-[8%] -left-[20%] w-[140%] h-[85%]">
            <Image
              src="/images/ckb-wappen.svg"
              alt=""
              fill
              className="object-contain object-right"
              style={{ filter: "brightness(0) invert(1)" }}
              aria-hidden="true"
            />
          </div>
        </div>

        <Navbar />
        <main className="flex-1 overflow-y-auto lg:mr-[38%] xl:mr-[33%] 2xl:mr-[30%]">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
