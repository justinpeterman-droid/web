import { AudioPlayerControls } from "@/components/audio/AudioPlayerControls";
import type { AudioTrack, AudioTrackTier } from "@/types/audio";

type AudioTrackCardProps = {
  track: AudioTrack;
  tier: AudioTrackTier;
};

export function AudioTrackCard({ track, tier }: AudioTrackCardProps) {
  return (
    <article className="audio-track" aria-labelledby={`audio-track-${track.id}`}>
      <div className="audio-track__header">
        <h3 id={`audio-track-${track.id}`} className="audio-track__title">
          {track.title}
        </h3>
        {track.duration ? (
          <span className="audio-track__duration" aria-label={`Duration ${track.duration}`}>
            {track.duration}
          </span>
        ) : null}
      </div>
      <p className="audio-track__description">{track.description}</p>
      {track.price ? (
        <p className="audio-track__price">
          <span className="sr-only">Price </span>
          {track.price}
        </p>
      ) : null}
      <AudioPlayerControls
        trackId={track.id}
        title={track.title}
        tier={tier}
        audioSrc={track.audioSrc}
        downloadUrl={track.downloadUrl}
        checkoutUrl={track.checkoutUrl}
      />
    </article>
  );
}
