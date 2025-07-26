interface Props {
  value: string;
  onClick: () => void;
  selected: boolean;
}

export default function Card({ value, onClick, selected }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-24 h-32 rounded-xl text-3xl font-bold flex items-center justify-center mx-3 my-5
      ${selected ? "bg-blue-500" : "bg-white text-black"} shadow-lg hover:scale-105 transition`}
    >
      {value}
    </button>
  );
}
