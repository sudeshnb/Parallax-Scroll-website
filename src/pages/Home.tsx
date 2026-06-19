import { useState, useCallback } from "react";
import { HeroCanvas, TravelingBottle, PostSequenceContent, FinalCTA } from "../../components/components";


interface HomeProps {
  onReady?: () => void; // 👈 new prop
}

export default function Home({ onReady }: HomeProps) {
  const [sequenceComplete, setSequenceComplete] = useState(false);

  const handleSequenceComplete = useCallback((complete: boolean) => {
    setSequenceComplete((prev) => prev || complete);
  }, []);

  return (
    <>
      <HeroCanvas
        onSequenceComplete={handleSequenceComplete}
        onReady={onReady} // 👈 pass it down
      />
      {/* <HeroCanvas onSequenceComplete={handleSequenceComplete} /> */}
      <TravelingBottle sequenceComplete={sequenceComplete}>
        <PostSequenceContent />
      </TravelingBottle>
      <FinalCTA />
    </>
  );
}
