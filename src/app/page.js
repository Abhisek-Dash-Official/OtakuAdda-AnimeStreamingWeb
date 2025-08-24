"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InitialPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/home";
    }, 2000); // 2 seconds

    // Cleanup timer if component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute text-2xl md:text-5xl font-bold z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
          <p className="text-white flex justify-center items-center flex-row animate-pulse">
            Redirecting{" "}
            {[0, 200, 400].map((delay) => (
              <span
                key={delay}
                className="text-white text-4xl md:text-7xl font-bold inline-block"
                style={{
                  animation: `bounce 1s ease-in-out ${delay}ms infinite, pulse 1s ease-in-out ${delay}ms infinite`,
                }}
              >
                .
              </span>
            ))}
          </p>
        </div>
        {/* Background Image */}
        <Image
          src="/assets/extras/loadingDesk.png"
          alt="Initial Page Image"
          fill
          priority
          className="object-cover hidden md:block"
        />
        <Image
          src="/assets/extras/loadingMobile.png"
          alt="Initial Page Image"
          fill
          priority
          className="object-cover md:hidden"
        />
      </div>
    </>
  );
}
