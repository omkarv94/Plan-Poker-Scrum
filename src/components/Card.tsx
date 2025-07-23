interface Props {
  value: string;
  onClick: () => void;
  selected: boolean;
}

export default function Card({ value, onClick, selected }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-20 h-28 rounded-lg text-2xl font-bold flex items-center justify-center mx-2 my-4
      ${selected ? "bg-blue-500" : "bg-white text-black"} shadow-lg hover:scale-105 transition`}
    >
      {value}
    </button>
  );
}
