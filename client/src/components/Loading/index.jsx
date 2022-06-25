export function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <button
        type="button"
        className="w-1/2 bg-lime-500 font-black p-10 rounded-full"
        disabled
      >
        Processing...
      </button>
    </div>
  );
}
