// src/components/HeaderProgressBar.js
import { _get_scroll_percentage } from "./get-doc-scroll-data";
import { Progress } from "@nextui-org/react";
import { useEffect, useState } from "react";

export function HeaderProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPercent = _get_scroll_percentage();
      console.log(currentScrollPercent); // Log scroll percentage
      setProgress(currentScrollPercent);
    };

    // Add the event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full bg-slate-100 rounded-lg">
      <Progress size="md" color="primary" aria-label="Loading..." value={progress} />
    </div>
  );
}
