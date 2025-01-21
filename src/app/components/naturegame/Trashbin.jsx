import { Trash2 } from "lucide-react";
import { useDrop } from "react-dnd";
export const TrashBin = ({
  acceptedType,
  onDrop,
  totalItems,
  correctItems,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "trash",
    drop: (item) => {
      if (item.type === acceptedType) onDrop(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const progress = (correctItems / totalItems) * 100;

  return (
    <div
      ref={drop}
      className={`
        w-32 h-40 m-4 rounded-xl transition-all duration-200
        flex flex-col items-center justify-between p-4
        ${isOver && canDrop ? "bg-green-200 scale-105" : "bg-white"}
        shadow-lg border-2 ${
          isOver && canDrop ? "border-green-500" : "border-gray-200"
        }
      `}
    >
      <Trash2
        className={`w-10 h-10 ${
          isOver && canDrop ? "text-green-500" : "text-gray-400"
        }`}
      />
      <p className="font-medium text-gray-700">{acceptedType}</p>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-green-500 rounded-full h-2 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
