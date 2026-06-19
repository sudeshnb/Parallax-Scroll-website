import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  MotionValue,
} from "framer-motion";
import lottie, { AnimationItem } from "lottie-web";
import { product } from "../data/product";

/* ─── Navbar ─── */

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className="mx-4 md:mx-6 mt-4 rounded-2xl border border-gray-800 bg-gray-950/80 px-5 md:px-8 py-4 backdrop-blur-xl"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
      >
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0072BC] to-[#00A8E8]">
              <span className="text-sm font-black text-white">T</span>
            </div>
            <span
              className="text-xl md:text-2xl font-black tracking-widest text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.2em" }}
            >
              TEVINA
            </span>
          </motion.div>

          <nav className="hidden items-center gap-10 md:flex">
            {["Story", "Specs", "Athlete"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium tracking-[0.15em] text-gray-400 transition-colors hover:text-white"
                whileHover={{ y: -1 }}
              >
                {item.toUpperCase()}
              </motion.a>
            ))}
          </nav>

          <motion.button
            id="navbar-buy-now"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden rounded-xl px-7 py-3 text-sm font-bold tracking-wider text-white"
            style={{
              background:
                "linear-gradient(135deg, #0072BC 0%, #00A8E8 50%, #E31C23 100%)",
              backgroundSize: "200% 200%",
            }}
          >
            <span className="relative z-10">$20 BUY NOW</span>
            <motion.div
              className="absolute inset-0 opacity-0 hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, #E31C23 0%, #FF5F5F 50%, #0072BC 100%)",
              }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}

/* ─── TextOverlays (hero story sections) ─── */

interface TextOverlaysProps {
  scrollProgress: MotionValue<number>;
}

function TextOverlays({ scrollProgress }: TextOverlaysProps) {
  const sections = product.storySections;
  const sectionDuration = 1 / sections.length;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="fixed inset-0 max-md:bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
      {sections.map((section, i) => {
        const start = i * sectionDuration;
        const mid = start + sectionDuration * 0.3;
        const end = start + sectionDuration;

        return (
          <SectionOverlay
            key={section.id}
            section={section}
            scrollProgress={scrollProgress}
            fadeInStart={start}
            peakStart={mid}
            fadeOutEnd={end}
            index={i}
          />
        );
      })}

      <div className="absolute top-28 md:top-32 right-6 md:right-10 text-right">
        <div className="text-[10px] md:text-[11px] tracking-[0.4em] text-gray-500 uppercase">
          TEVINA Hydration
        </div>
        <div className="text-[10px] md:text-[11px] tracking-[0.3em] text-gray-600 uppercase mt-1.5">
          Ice Pop Series
        </div>
      </div>
    </div>
  );
}

interface SectionOverlayProps {
  section: (typeof product.storySections)[0];
  scrollProgress: MotionValue<number>;
  fadeInStart: number;
  peakStart: number;
  fadeOutEnd: number;
  index: number;
}

function SectionOverlay({
  section,
  scrollProgress,
  fadeInStart,
  peakStart,
  fadeOutEnd,
  index,
}: SectionOverlayProps) {
  const transition = 0.1;
  const oIn0 = index === 0 ? 0 : Math.max(0, fadeInStart - transition);
  const oIn1 = fadeInStart + transition;
  const oOut0 = fadeOutEnd - transition;
  const oOut1 = Math.min(1, fadeOutEnd + transition);

  const opacity = useTransform(
    scrollProgress,
    index === 0
      ? [0, oOut0, oOut1]
      : [oIn0, oIn1, oOut0, oOut1],
    index === 0
      ? [1, 1, 0]
      : [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollProgress,
    [fadeInStart, peakStart, fadeOutEnd],
    [40, 0, -20]
  );

  const isRight = section.align === "right";

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute max-md:top-[18%] top-1/2 max-md:-translate-y-0 -translate-y-1/2 max-w-md px-8 md:px-16 ${isRight ? "right-0 text-right md:right-8" : "left-0 text-left md:left-8"
        }`}
    >
      <div
        className="mb-4 text-[11px] font-semibold tracking-[0.4em] uppercase"
        style={{ color: index % 2 === 0 ? "#00A8E8" : "#E31C23" }}
      >
        {`0${index + 1} / TEVINA`}
      </div>

      <h2
        className="mb-3 text-5xl sm:text-7xl md:text-9xl font-black leading-[0.9] text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
      >
        {section.title}
      </h2>

      <p className="mb-5 text-base md:text-lg font-semibold text-gray-300 italic">
        {section.subtitle}
      </p>

      <p className="text-sm md:text-base leading-relaxed text-gray-400">
        {section.description}
      </p>

      <div
        className={`mt-6 md:mt-8 h-px w-16 md:w-20 ${isRight ? "ml-auto" : ""}`}
        style={{
          background:
            index % 2 === 0
              ? "linear-gradient(90deg, #0072BC, transparent)"
              : "linear-gradient(90deg, #E31C23, transparent)",
        }}
      />
    </motion.div>
  );
}

/* ─── HeroCanvas ─── */

const TOTAL_FRAMES = product.assets.totalFrames;

interface HeroCanvasProps {
  onSequenceComplete?: (complete: boolean) => void;
  onReady?: () => void;
}

export function HeroCanvas({ onSequenceComplete, onReady }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const lastFrameRef = useRef(-1);
  const [isReady, setIsReady] = useState(false);
  const rafIdRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const frame = useTransform(smoothProgress, (value) => {
    const raw = value * (TOTAL_FRAMES - 1);
    return Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(raw)));
  });

  useEffect(() => {
    if (!animRef.current || !isReady) return;

    const updateLottie = (newFrame: number) => {
      if (newFrame !== lastFrameRef.current) {
        lastFrameRef.current = newFrame;
        animRef.current?.goToAndStop(newFrame, true);
      }
    };

    const unsubscribe = frame.on("change", (newFrame) => {
      if (rafIdRef.current) return;
      rafIdRef.current = requestAnimationFrame(() => {
        updateLottie(newFrame);
        rafIdRef.current = null;
      });
    });

    updateLottie(frame.get());

    return () => {
      unsubscribe();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [frame, isReady]);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (progress) => {
      const complete = progress > 0.95;
      onSequenceComplete?.(complete);
    });
    return () => unsubscribe();
  }, [smoothProgress, onSequenceComplete]);

  useEffect(() => {
    if (!lottieRef.current) return;

    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: product.assets.lottiePath,
    });

    anim.addEventListener("DOMLoaded", () => {
      animRef.current = anim;
      anim.goToAndStop(0, true);
      setIsReady(true);
      onReady?.();
    });

    return () => {
      anim.destroy();
      animRef.current = null;
      setIsReady(false);
    };
  }, [onReady]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "600vh", margin: "0 -14px" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div ref={lottieRef} className="absolute inset-0 h-full w-full" />

        {!isReady && (
          <div className="absolute inset-0 flex h-full flex-col items-center justify-center bg-gray-950">
            <div
              className="mb-4 text-6xl font-black tracking-widest text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              TEVINA
            </div>
            <div className="h-1 w-64 overflow-hidden rounded-full bg-gray-800">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#0072BC] to-[#00A8E8] animate-pulse" />
            </div>
          </div>
        )}

        {isReady && <TextOverlays scrollProgress={smoothProgress} />}

        {isReady && (
          <div className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <p className="text-xs tracking-[0.3em] uppercase">Scroll</p>
              <div className="h-14 w-px animate-pulse bg-gradient-to-b from-gray-600 to-transparent" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── TravelingBottle ─── */

interface TravelingBottleProps {
  sequenceComplete: boolean;
  children: React.ReactNode;
}

export function TravelingBottle({
  sequenceComplete,
  children,
}: TravelingBottleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const [waypoints, setWaypoints] = useState<{ progress: number; x: number }[]>([
    { progress: 0, x: 0 },
  ]);

  // Load static bottle Lottie
  useEffect(() => {
    if (!lottieRef.current) return;
    const anim = lottie.loadAnimation({
      container: lottieRef.current,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: product.assets.staticBottle,
    });
    animRef.current = anim;
    return () => anim.destroy();
  }, []);

  // Play/pause based on sequence completion
  useEffect(() => {
    if (!animRef.current) return;
    if (sequenceComplete) {
      animRef.current.play();
    } else {
      animRef.current.goToAndStop(0, true);
    }
  }, [sequenceComplete]);

  // Measure sections and build dynamic waypoints
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const sections = container.querySelectorAll("[data-section-index]");
    if (!sections.length) return;

    const scrollHeight = container.scrollHeight;
    const waypointsArr: { progress: number; x: number }[] = [{ progress: 0, x: 0 }];

    sections.forEach((section, idx) => {
      const rect = section.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const offsetTop = rect.top - containerRect.top + container.scrollTop;
      const offsetBottom = offsetTop + rect.height;

      const startProgress = Math.min(1, Math.max(0, offsetTop / scrollHeight));
      const endProgress = Math.min(1, Math.max(0, offsetBottom / scrollHeight));

      const sectionData = product.postSections[idx];
      const targetX = sectionData.align === "left" ? 38 : -38;

      waypointsArr.push({ progress: startProgress, x: targetX });
      waypointsArr.push({ progress: endProgress, x: targetX });
    });

    waypointsArr.sort((a, b) => a.progress - b.progress);

    const lastTarget = waypointsArr[waypointsArr.length - 1]?.x || 0;
    waypointsArr.push({ progress: 1, x: lastTarget });

    setWaypoints(waypointsArr);
  }, [children]); // re-measure when children change

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    restDelta: 0.001,
  });

  // Compute x value by interpolating between waypoints
  const x = useTransform(smoothProgress, (progress) => {
    const p = Math.min(1, Math.max(0, progress));
    let i = 0;
    while (i < waypoints.length - 1 && waypoints[i + 1].progress < p) i++;
    const start = waypoints[i];
    const end = waypoints[i + 1] || start;
    const t = (p - start.progress) / (end.progress - start.progress || 1);
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const currentX = start.x + (end.x - start.x) * eased;
    return `${currentX}%`;
  });

  // Opacity and height (unchanged)
  const opacity = useTransform(smoothProgress, [0, 0.04], [0, 1]);
  const maxHeight = useTransform(
    smoothProgress,
    [0, 0.06, 0.1],
    ["80vh", "60vh", "60vh"]
  );
  const glowBackground = useTransform(
    smoothProgress,
    [0, 0.30, 0.35, 0.60, 0.65, 1],
    [
      "radial-gradient(ellipse, rgba(0,114,188,0.35) 0%, transparent 70%)",
      "radial-gradient(ellipse, rgba(0,114,188,0.35) 0%, transparent 70%)",
      "radial-gradient(ellipse, rgba(227,28,35,0.35) 0%, transparent 65%)",
      "radial-gradient(ellipse, rgba(227,28,35,0.35) 0%, transparent 65%)",
      "radial-gradient(ellipse, rgba(0,114,188,0.30) 0%, transparent 60%)",
      "radial-gradient(ellipse, rgba(0,114,188,0.30) 0%, transparent 60%)",
    ]
  );

  return (
    <div ref={containerRef} className="relative" style={{ backgroundColor: "#0a0a0f", margin: "0 -14px" }}>
      <motion.div
        className="fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ x, opacity }}
      >
        <motion.div
          className="absolute inset-0 -z-10 blur-3xl"
          style={{ background: glowBackground }}
        />
        <motion.div
          ref={lottieRef}
          className="[&>svg]:block [&>svg]:w-auto [&>svg]:h-full [&>svg]:drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)] max-md:!max-h-[35vh]"
          style={{
            height: maxHeight,
            maxHeight,
            overflow: "visible",
          }}
        />
      </motion.div>
      {children}
    </div>
  );
}

/* ─── PostSequenceContent ─── */

function ContentSection({
  section,
  index,
  isLast,
}: {
  section: (typeof product.postSections)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const isTextRight = section.align === "right";
  const textInitialX = isTextRight ? 60 : -60;

  return (
    <section
      ref={ref}
      id={section.id}
      data-section-index={index} // 👈 for bottle waypoint detection
      className={`relative min-h-screen flex items-center ${isTextRight ? "justify-end" : "justify-start"} px-6 md:px-16 lg:px-24 py-24 md:py-32`}
      style={{ backgroundColor: "#0a0a0f" }}
    >
      <div
        className={`absolute inset-0 pointer-events-none ${isTextRight
          ? "bg-gradient-to-br from-blue-950/40 via-transparent to-transparent"
          : "bg-gradient-to-bl from-red-950/40 via-transparent to-transparent"
          }`}
      />
      <motion.div
        className="relative z-10 max-w-xl"
        initial={{ opacity: 0, x: textInitialX }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-5 inline-flex items-center gap-3">
          <div
            className="h-px w-10"
            style={{
              background: isTextRight
                ? "linear-gradient(90deg, #0072BC, transparent)"
                : "linear-gradient(270deg, #E31C23, transparent)",
            }}
          />
          <span
            className="text-[11px] font-bold tracking-[0.4em] uppercase text-gray-500"
            style={{ color: isTextRight ? "#00A8E8" : "#E31C23" }}
          >
            {section.eyebrow}
          </span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 text-6xl md:text-7xl font-black leading-[0.9] text-white"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.04em",
          }}
        >
          {section.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-6 text-lg md:text-xl font-semibold italic text-gray-300"
        >
          {section.subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-12 text-base md:text-lg leading-relaxed text-gray-400"
        >
          {section.description}
        </motion.p>

        {"stats" in section && section.stats && (
          <div className="grid grid-cols-2 gap-5">
            {section.stats.map((stat, j) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.45 + j * 0.08 }}
                className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-5 md:p-6"
              >
                <div
                  className="text-3xl md:text-4xl font-black text-white"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="mt-1 text-xs tracking-widest text-gray-500 uppercase">
                  {stat.label}
                </div>
                <div
                  className="absolute -right-4 -top-4 h-16 w-16 rounded-full opacity-20 blur-xl"
                  style={{ background: isTextRight ? "#0072BC" : "#E31C23" }}
                />
              </motion.div>
            ))}
          </div>
        )}

        {isLast && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col items-start gap-5 sm:flex-row mt-12"
            style={{ justifyContent: isTextRight ? "flex-end" : "flex-start" }}
          >
            <motion.button
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden rounded-2xl px-10 py-4 text-base font-black tracking-widest text-white"
              style={{
                background: "linear-gradient(135deg, #0072BC, #00A8E8)",
                boxShadow: "0 20px 60px rgba(0,114,188,0.4)",
              }}
            >
              BUY NOW — $20
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-2xl border border-gray-700 px-8 py-4 text-base font-bold tracking-wider text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
            >
              LEARN MORE
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

export function PostSequenceContent() {
  const sections = product.postSections;

  return (
    <div className="relative z-10">
      {sections.map((section, i) => (
        <ContentSection
          key={section.id}
          section={section}
          index={i}
          isLast={i === sections.length - 1}
        />
      ))}
    </div>
  );
}

/* ─── FinalCTA ─── */

export function FinalCTA() {
  return (
    <footer className="relative py-12 text-center" style={{ backgroundColor: "#0a0a0f", margin: "0 -14px" }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-xs tracking-[0.3em] text-gray-500 uppercase"
      >
        &copy; 2024 TEVINA Hydration &middot; All rights reserved
      </motion.div>
    </footer>
  );
}