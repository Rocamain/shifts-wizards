type ModalActionsProps = {
  onCancel: () => void;
  onSave: () => void;
};

export function ModalActions({ onCancel, onSave }: ModalActionsProps) {
  return (
    <div className="mt-4 flex justify-end gap-2">
      <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">
        Cancel
      </button>
      <button
        onClick={onSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
