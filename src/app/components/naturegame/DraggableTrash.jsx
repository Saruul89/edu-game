import { useDrag } from "react-dnd";
export const DraggableTrash = ({ type, image, index, isDisabled }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "trash",
    item: { type, index },
    canDrag: !isDisabled,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`
        transition-all duration-200
        ${isDragging ? "opacity-50 scale-105" : "opacity-100"}
        ${
          isDisabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-grab hover:scale-110"
        }
      `}
    >
      <img
        src={`/api/placeholder/80/80`} // Placeholder for demo
        alt={type}
        className="w-20 h-20 rounded-lg shadow-md"
      />
      <p className="text-center mt-2 font-medium text-gray-700">{type}</p>
    </div>
  );
};
