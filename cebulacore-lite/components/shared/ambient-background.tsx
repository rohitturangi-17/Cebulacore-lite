import { FloatingRibbon } from "./floating-ribbon";

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <FloatingRibbon className="left-[-10%] top-[5%] h-[420px] w-[420px]" />
      <FloatingRibbon className="right-[-15%] top-[30%] h-[520px] w-[520px]" />
      <FloatingRibbon className="left-[20%] bottom-[-15%] h-[380px] w-[380px]" />
    </div>
  );
}
