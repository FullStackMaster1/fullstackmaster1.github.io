import PlaylistCard from "../PlaylistCard";

export default function PlaylistCardExample() {
  return (
    <div className="max-w-xs">
      <PlaylistCard
        title="AWS Interview Tips"
        url="https://www.youtube.com/@FullStackMaster/playlists"
        videoCount={25}
        description="Essential tips for AWS technical interviews"
      />
    </div>
  );
}
