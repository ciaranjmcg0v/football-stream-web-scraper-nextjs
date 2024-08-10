"use client";

import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface VideoStreamerProps {
  iframeSrc: string;
}

const VideoStreamer: React.FC<VideoStreamerProps> = ({ iframeSrc }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const addSandboxToAllIframes = () => {
      const frames = document.getElementsByTagName("iframe");
      for (let i = 0; i < frames.length; i++) {
        frames[i].setAttribute(
          "sandbox",
          "allow-orientation-lock allow-pointer-lock allow-presentation allow-top-navigation"
        );
      }
    };
    const iframeElement = iframeRef.current;
    if (iframeElement) {
      iframeElement.onload = () => {
        // Apply the sandbox attribute to all iframes after waiting 2 seconds
        setTimeout(() => {
          addSandboxToAllIframes();
          console.log("iframe source:", iframeElement.src);
        }, 3000);
      };
    } else {
      setLoading(false);
    }
  }, [iframeSrc]);

  if (loading) {
    return <LoadingSpinner StatusText="Fetching stream data..." />;
  }

  return (
    <div className="flex w-full items-center justify-center">
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        width="700px"
        height="380px"
        allow="autoplay"
      ></iframe>
    </div>
  );
};

export default VideoStreamer;
