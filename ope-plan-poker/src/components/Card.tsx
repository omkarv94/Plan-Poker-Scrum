interface Props {
  value: string;
  onClick: () => void;
  selected: boolean;
}

export default function Card({ value, onClick, selected }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-16 h-24 rounded-lg text-xl font-bold flex items-center justify-center
      ${selected ? "bg-blue-500" : "bg-white text-black"} shadow-lg hover:scale-105 transition`}
    >
      {value}
    </button>
  );
}
