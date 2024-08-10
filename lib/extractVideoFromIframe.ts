function extractVideoFromIframe() {
  // const videoRef = useRef<HTMLVideoElement | null>(null);
  // const extractVideoSource = () => {
  //   if (iframeRef.current && videoRef.current) {
  //     try {
  //       const iframe = iframeRef.current;
  //       const innerDoc =
  //         iframe.contentDocument || iframe.contentWindow?.document;
  //       if (innerDoc) {
  //         const videoElement = innerDoc.querySelector(
  //           "video"
  //         ) as HTMLVideoElement | null;
  //         if (videoElement && videoElement.src) {
  //           videoRef.current.src = videoElement.src;
  //           videoRef.current.play();
  //           setStreamFound(true);
  //         } else {
  //           console.error(
  //             "Video element not found in the iframe or source is empty"
  //           );
  //           setStreamFound(false);
  //         }
  //       } else {
  //         console.error("Unable to access the iframe document");
  //         setStreamFound(false);
  //       }
  //     } catch (error) {
  //       console.error("Error accessing iframe content:", error);
  //       setStreamFound(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };
  // extractVideoSource(); // Extract the video source after applying sandbox
  // const [streamFound, setStreamFound] = useState<boolean>(false);
  // {streamFound ? (
  //   <video ref={videoRef} controls className="w-3/4">
  //     Your browser does not support the video tag.
  //   </video>
  // ) : (
  //   <p>Unable to load the video stream ☹️</p>
  // )}
}
export default extractVideoFromIframe;
