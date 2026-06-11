import { AudioTrackCard } from "@/components/audio/AudioTrackCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { hometownContent } from "@/lib/content/hometown";

export function AudioLibraryPanels() {
  const { openSanctuary, deepDive } = hometownContent.audioLibrary;

  return (
    <div className="audio-library__grid">
      <GlassPanel glow="sage" className="audio-library__panel p-6 md:p-8">
        <header className="audio-library__panel-header">
          <p className="audio-library__panel-eyebrow">Free</p>
          <h2 className="audio-library__panel-title">{openSanctuary.title}</h2>
          <p className="audio-library__panel-subtitle">{openSanctuary.subtitle}</p>
        </header>
        <ul className="audio-library__track-list">
          {openSanctuary.tracks.map((track) => (
            <li key={track.id}>
              <AudioTrackCard track={track} tier="free" />
            </li>
          ))}
        </ul>
      </GlassPanel>

      <GlassPanel glow="gold" className="audio-library__panel p-6 md:p-8">
        <header className="audio-library__panel-header">
          <p className="audio-library__panel-eyebrow audio-library__panel-eyebrow--gold">
            Premium
          </p>
          <h2 className="audio-library__panel-title">{deepDive.title}</h2>
          <p className="audio-library__panel-subtitle">{deepDive.subtitle}</p>
        </header>
        <ul className="audio-library__track-list">
          {deepDive.tracks.map((track) => (
            <li key={track.id}>
              <AudioTrackCard track={track} tier="premium" />
            </li>
          ))}
        </ul>
      </GlassPanel>
    </div>
  );
}
