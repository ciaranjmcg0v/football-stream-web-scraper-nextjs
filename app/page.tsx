"use client";

import { fetchStreamLinks } from "@/actions/scrape";
import VideoStreamer from "@/components/iframeVideo";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useStore from "@/store/footballUrlStore";
import { useEffect, useRef, useState } from "react";

// Define Match interface
interface Match {
  title: string;
  kickOffTime: string;
  url: string;
  streamLinks: { link: string; embedLink: string | null }[];
  timestamp: number; // To track when the match was added to the store
}

function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const { currentEmbedLink, setCurrentEmbedLink } = useStore((state) => ({
    currentEmbedLink: state.currentEmbedLink,
    setCurrentEmbedLink: state.setCurrentEmbedLink,
  }));

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const response = await fetchStreamLinks();
      setMatches(response);
    } catch (error) {
      console.error("Failed to fetch matches:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMatches();
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleMatchClick = (embedLink: string | null) => {
    setCurrentEmbedLink(embedLink); // Update the global state with the selected embed link
    console.log("Selected embed link:", embedLink);
  };

  useEffect(() => {
    const iframe = iframeRef.current;

    if (iframe) {
      const handleIframeLoad = async () => {
        console.log("iframe source:", iframe.src);
        // await fetchDataFromUrl(iframe.src);
        // try {
        //   const iframeDocument =
        //     iframe.contentDocument || iframe.contentWindow?.document;
        //   if (iframeDocument) {
        //     console.log("Iframe content:", iframeDocument);
        //   } else {
        //     console.log("Iframe source:", iframe.src);
        //   }
        // } catch (error) {
        //   console.error("Failed to load iframe:", error);
        // }
      };

      iframe.addEventListener("load", handleIframeLoad);

      return () => {
        iframe.removeEventListener("load", handleIframeLoad);
      };
    }
  }, [currentEmbedLink]);

  if (loading) return <LoadingSpinner StatusText="Fetching stream links.." />;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div>
        <Select onValueChange={(value) => handleMatchClick(value)}>
          <SelectTrigger className="w-[400px]">
            <SelectValue placeholder="Select a Match" />
          </SelectTrigger>
          <SelectContent>
            {matches.map((match, index) => (
              <SelectItem key={index} value={match.streamLinks[0]?.embedLink!}>
                <div>
                  <h2 className="font-bold text-lg">{match.title}</h2>
                  <h3>Kick-off Time: {match.kickOffTime}</h3>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-3/4 h-1/2 flex items-center justify-center mt-16">
        {currentEmbedLink && <VideoStreamer iframeSrc={currentEmbedLink} />}
        {/* {currentEmbedLink && (
          <iframe
            ref={iframeRef}
            src={currentEmbedLink}
            width="700px"
            height="380px"
            sandbox="allow-forms allow-pointer-lock allow-scripts allow-top-navigation"
            allow="encrypted-media"
            allowFullScreen
            title="Stream"
          />
        )} */}
      </div>
    </div>
  );
}

export default Home;
