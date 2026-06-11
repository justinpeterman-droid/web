"use client";

import clsx from "clsx";
import { useCallback, useId, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { EXTERNAL_LINKS } from "@/lib/constants";
import type { AudioTrackTier } from "@/types/audio";

type AudioPlayerControlsProps = {
  trackId: string;
  title: string;
  tier: AudioTrackTier;
  audioSrc?: string;
  downloadUrl?: string;
  checkoutUrl?: string;
};

export function AudioPlayerControls({
  trackId,
  title,
  tier,
  audioSrc,
  downloadUrl,
  checkoutUrl,
}: AudioPlayerControlsProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const statusId = useId();

  const canPlay = Boolean(audioSrc);
  const downloadHref = downloadUrl ?? audioSrc;

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !canPlay) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, [canPlay, playing]);

  const handleEnded = useCallback(() => {
    setPlaying(false);
  }, []);

  if (tier === "premium") {
    return (
      <div className="audio-track__actions">
        <ButtonLink
          href={checkoutUrl ?? EXTERNAL_LINKS.discoveryCall}
          variant="gold"
          external
          className="audio-track__action"
        >
          Purchase Audio
        </ButtonLink>
        {!checkoutUrl ? (
          <p id={statusId} className="audio-track__note">
            Checkout link coming soon — book a discovery call to purchase in the meantime.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="audio-track__actions">
      <button
        type="button"
        className={clsx("button-link button-link--sage audio-track__action")}
        onClick={() => void togglePlay()}
        disabled={!canPlay}
        aria-pressed={playing}
        aria-describedby={!canPlay ? statusId : undefined}
      >
        {playing ? "Pause" : "Play"}
      </button>
      {downloadHref ? (
        <a
          href={downloadHref}
          download
          className={clsx("button-link button-link--ghost audio-track__action")}
        >
          Download
        </a>
      ) : (
        <button
          type="button"
          className={clsx("button-link button-link--ghost audio-track__action")}
          disabled
          aria-describedby={statusId}
        >
          Download
        </button>
      )}
      {!canPlay ? (
        <p id={statusId} className="audio-track__note">
          Audio file coming soon — track listing is live; MP3 will be wired at{" "}
          <code className="audio-track__code">public/audio/{trackId}.mp3</code>.
        </p>
      ) : (
        <p className="sr-only" id={statusId}>
          {playing ? `Now playing ${title}` : `Paused: ${title}`}
        </p>
      )}
      {canPlay ? (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="none"
          onEnded={handleEnded}
          aria-label={title}
        />
      ) : null}
    </div>
  );
}
