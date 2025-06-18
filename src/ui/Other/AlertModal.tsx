import Drag from "./Drag";

export default function AlertModal({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <Drag>
      <p className="my-4 w-full text-center text-lg ">{message}</p>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
        >
          OK
        </button>
      </div>
    </Drag>
  );
}
