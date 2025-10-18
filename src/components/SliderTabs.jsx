"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    id: 1,
    img: "/slidingImages/slide-image-2.avif",
    title: "Pizza Hut",
    description: "Crafting innovation for the consumer markets with Adidas",
    result: [
      { title: "App Downloads", value: "5M+" },
      { title: "App Downloads", value: "5M+" },
    ],
  },
  {
    id: 3,
    img: "/slidingImages/slide-image-4.avif",
    title: "Americana",
    description:
      "A reliable data platform was built using automated ETL and Power BI to drastically increase delivery efficiency and geofencing compliance for Americana.",
    result: [
      { title: "App Downloads", value: "5M+" },
      { title: "App Downloads", value: "5M+" },
    ],
  },
  {
    id: 2,
    img: "/slidingImages/slide-image-3.avif",
    title: "IKEA",
    description: "Crafting innovation for the consumer markets with Adidas",
    result: [
      { title: "App Downloads", value: "5M+" },
      { title: "App Downloads", value: "5M+" },
    ],
  },
  {
    id: 4,
    img: "/slidingImages/slide-image-5.avif",
    title: "Adidas",
    description:
      "A reliable data platform was built using automated ETL and Power BI to drastically increase delivery efficiency and geofencing compliance for Americana.",
    result: [
      { title: "App Downloads", value: "5M+" },
      { title: "App Downloads", value: "5M+" },
    ],
  },
];

export default function SlideTabs() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    mass: 0.6,
  });

  const fromBottom = "inset(100% 0% 0% 0%)";
  const fullVisible = "inset(0% 0% 0% 0%)";

  // Clipping animations for images
  const clip1 = useTransform(
    smoothProgress,
    [0, 0.15, 0.2],
    [fullVisible, fullVisible, fullVisible]
  );
  const clip2 = useTransform(
    smoothProgress,
    [0.2, 0.35, 0.45],
    [fromBottom, fullVisible, fullVisible]
  );
  const clip3 = useTransform(
    smoothProgress,
    [0.45, 0.6, 0.7],
    [fromBottom, fullVisible, fullVisible]
  );
  const clip4 = useTransform(
    smoothProgress,
    [0.7, 0.85, 1],
    [fromBottom, fullVisible, fullVisible]
  );

  // left side text componenet transitions (fade in/out)
  const textOpacities = [
    useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]),
    useTransform(smoothProgress, [0.2, 0.4, 0.5], [0, 1, 0]),
    useTransform(smoothProgress, [0.45, 0.65, 0.75], [0, 1, 0]),
    useTransform(smoothProgress, [0.7, 0.9, 1], [0, 1, 1]),
  ];

  const [trackHeight, setTrackHeight] = useState(0);

  useEffect(() => {
    setTrackHeight(window.innerHeight * 0.8);
  }, []);
  // height calculated as h-36 = 9rem (1rem = 16px) so 16 * 9 = 144
  const indicatorHeight = 144;

  const verticalMove = useTransform(
    scrollYProgress,
    [0, 1],
    [0, trackHeight - indicatorHeight]
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] bg-black w-full px-20 text-white"
    >
      {/* Scroll progress bar on the right */}
      <div className="fixed right-6 top-16 h-[80vh] w-[2px] bg-gray-50">
        <motion.div
          style={{ translateY: verticalMove }}
          className="absolute left-0 top-0 w-[3px] h-36 bg-blue-500 rounded-full"
        />
      </div>

      <div className="sticky top-0 h-screen flex items-center w-full justify-center">
        <div className="flex w-full h-[80vh] gap-10 items-start">
          {/* Left: Info Card animation */}
          <div className="relative w-1/2 h-full flex items-center justify-center">
            {slides.map((slide, i) => (
              <motion.div
                key={slide.id}
                style={{
                  opacity: textOpacities[i]
                }}
                className="absolute left-0 top-0 flex flex-col  items-start h-full px-12 py-8 max-w-md bg-transparent"
              >
                <h3 className="text-blue-400 text-sm mb-1">Case Study</h3>
                <h1 className="text-white font-semibold text-2xl mb-3">
                  {slide?.title}
                </h1>
                <p className="text-white text-base mb-5">
                  {slide?.description}
                </p>
                <div className="mb-4">
                  <p className="text-white font-medium mb-2">Result</p>
                  <div className="grid grid-cols-2 gap-6 w-full">
                    {slide?.result?.map((val, index) => (
                      <div key={index} className="flex flex-col items-start">
                        <span className="text-white text-2xl font-bold mb-1">
                          {val?.value}
                        </span>
                        <span className="text-white text-xs">{val?.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="mt-6 border border-white rounded-xl px-5 py-2 text-white text-sm hover:bg-white hover:text-black transition">
                  View case study
                </button>
              </motion.div>
            ))}
          </div>

          {/* Right: Images animation */}
          <div className="relative w-4/5 h-full rounded-xl overflow-hidden bg-black shadow-2xl">
            <motion.div
              style={{ clipPath: clip1 }}
              className="absolute inset-0 z-10"
            >
              <Image
                src={slides[0].img}
                alt={slides[0].title}
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
            <motion.div
              style={{ clipPath: clip2 }}
              className="absolute inset-0 z-20"
            >
              <Image
                src={slides[1].img}
                alt={slides[1].title}
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
            <motion.div
              style={{ clipPath: clip3 }}
              className="absolute inset-0 z-30"
            >
              <Image
                src={slides[2].img}
                alt={slides[2].title}
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
            <motion.div
              style={{ clipPath: clip4 }}
              className="absolute inset-0 z-40"
            >
              <Image
                src={slides[3].img}
                alt={slides[3].title}
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
