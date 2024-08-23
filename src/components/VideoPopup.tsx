import { Play } from "lucide-react";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";
type VideoPopupModalProps = {
  videoUrl: string;
};
const VideoPopup: React.FC<VideoPopupModalProps> = ({ videoUrl }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const extractVideoId = (url: string): string | null => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
    const matches = url.match(regex);
    if (matches) {
      return matches[2];
    }
    return null;
  };

  const videoId = extractVideoId(videoUrl);
  return (
    <div className="absolute bottom-[55%] left-[43px] md:left-[50px] md:bottom-10">
      <button
        className="btn-primary video-play-button"
        onClick={() => setOpen(true)}
      >
        <Play className="absolute z-10 top-[27px]" color="#fff" />
      </button>
      {videoId && (
        <ModalVideo
          channel="youtube"
          //    autoplay={true}
          isOpen={isOpen}
          videoId={videoId}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default VideoPopup;
