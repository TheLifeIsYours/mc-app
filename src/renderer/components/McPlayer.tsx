type McPlayerProps = {
  player: McPlayer;
  size?: number;
  style?: 'horizontal' | 'vertical';
  shortName?: boolean | number;
  className?: string;
};

export default function McPlayer({
  player,
  size = 32,
  style = 'horizontal',
  shortName,
  className,
}: McPlayerProps) {
  let name = player.name_raw;
  if (shortName) {
    const originalName = player.name_raw;
    let cutName = originalName.slice(0, shortName === true ? 5 : shortName);
    if (cutName.length < originalName.length) {
      cutName += '...';
    }

    name = cutName;
  }

  return (
    <div
      className={`${className} flex ${
        style == 'horizontal' ? 'inline-flex' : 'flex-col'
      } items-center gap-2`}
    >
      <img
        src={`https://crafatar.com/renders/head/${player.uuid}`}
        width={size}
        height={size}
        className="rounded-full"
      />
      <p>{name}</p>
    </div>
  );
}
