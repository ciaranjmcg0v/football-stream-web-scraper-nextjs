"use server";

import useStore from "@/store/footballUrlStore";
import axios from "axios";
import cheerio from "cheerio";

const fetchEmbedLink = async (streamUrl: string): Promise<string | null> => {
  try {
    const response = await axios.get(streamUrl);
    const html = response.data;
    const $ = cheerio.load(html);

    const textarea = $("textarea.form-control").text().trim();
    const match = textarea.match(/src='(https:\/\/[^']+)'/);
    return match ? match[1] : null;
  } catch (error: any) {
    console.error("Failed to fetch embed link", error);
    return null;
  }
};

// Define Match interface
interface Match {
  title: string;
  kickOffTime: string;
  url: string;
  streamLinks: { link: string; embedLink: string | null }[];
  timestamp: number; // To track when the match was added to the store
}

export const fetchStreamLinks = async (): Promise<Match[]> => {
  const store = useStore.getState();

  const existingMatches = store.matchUrls;
  const existingUrls = new Set(existingMatches.map((match) => match.url));

  // Clear old URLs (older than 15 minutes)
  for (const match of existingMatches) {
    if (Date.now() - match.timestamp > 15 * 60 * 1000) {
      store.clearOldUrls();
      break;
    }
  }

  try {
    const response = await axios.get(
      "https://socceronline.me/football-streams"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    const newMatches: Match[] = [];

    const aElements = $("a.mb-1.btn.btn-secondary.col-12.text-start");

    for (const element of aElements.toArray()) {
      const $element = $(element);
      const title = $element.attr("title") || "";
      const kickOffTime = $element.find("span").text().trim() || "";
      const url = $element.attr("href") || "";
      const fullStreamLink = `https://socceronline.me${url}`;

      if (!existingUrls.has(fullStreamLink)) {
        const streamLinks: { link: string; embedLink: string | null }[] = [];
        const embedLink = await fetchEmbedLink(fullStreamLink);
        streamLinks.push({ link: url, embedLink });

        const match: Match = {
          title,
          kickOffTime,
          url: fullStreamLink,
          streamLinks,
          timestamp: Date.now(),
        };

        newMatches.push(match);

        // Add the new match to the store
        store.addMatchUrl(match.streamLinks!.toString());
      }
    }

    return newMatches;
  } catch (error: any) {
    console.error("Could not fetch", error);
    return [];
  }
};

export const fetchDataFromUrl = async (url: string) => {
  // Implement the logic to fetch data from the given URL and return it as a JSON object
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  // Implement the logic to parse the HTML content and extract the required data
  // Return the extracted data as a JSON object, dismissing all html that is not contained with the body tag
  const bodyData = $("src");
  console.log("Parsed data from URL: " + bodyData);
};
