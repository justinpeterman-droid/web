"use client";

import Image from "next/image";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { EXTERNAL_LINKS } from "@/lib/constants";

type YouTubeFeaturedProps = {
  title: string;
};

export function YouTubeFeatured({ title }: YouTubeFeaturedProps) {
  const [activated, setActivated] = useState(false);
  const videoId = EXTERNAL_LINKS.youtubeFeaturedVideoId;
  const channelUrl = EXTERNAL_LINKS.youtubeChannel;
  const hasVideo = Boolean(videoId);
  const embedTitle = `Featured video: ${title}`;
  const thumbnailSrc = hasVideo
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : null;

  if (!hasVideo) {
    return (
      <GlassPanel className="inked-video inked-video--placeholder p-6">
        <p className="inked-video__placeholder-title">Featured video</p>
        <p className="inked-video__placeholder-copy">
          Wire <code className="inked-video__code">EXTERNAL_LINKS.youtubeFeaturedVideoId</code>{" "}
          when your channel has a featured reflection ready.
        </p>
        {channelUrl ? (
          <ButtonLink href={channelUrl} variant="gold" external className="mt-4">
            Visit YouTube Channel
          </ButtonLink>
        ) : null}
      </GlassPanel>
    );
  }

  if (!activated) {
    return (
      <GlassPanel className="inked-video p-0 overflow-hidden">
        <button
          type="button"
          className="inked-video__activator"
          onClick={() => setActivated(true)}
          aria-label={`Load and play ${embedTitle}`}
        >
          {thumbnailSrc ? (
            <span className="inked-video__media" aria-hidden="true">
              <Image
                src={thumbnailSrc}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="inked-video__thumbnail object-cover"
              />
            </span>
          ) : null}
          <span className="inked-video__overlay">
            <span className="inked-video__play" aria-hidden="true">
              ▶
            </span>
            <span className="inked-video__activator-label">Play featured reflection</span>
          </span>
        </button>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="inked-video inked-video--active p-0 overflow-hidden">
      <div className="inked-video__frame-wrap">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={embedTitle}
          className="inked-video__frame"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </GlassPanel>
  );
}
