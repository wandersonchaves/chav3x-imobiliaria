export function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <button
        type="button"
        className="w-1/2 bg-indigo-500 font-bold p-10 rounded-full"
        disabled
      >
        Processing...
      </button>
    </div>
  );
}
