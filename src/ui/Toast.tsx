export function Toast({ message }: any) {
  return (
    <div className="fixed bottom-20 left-0 right-0 flex justify-center animate-fade-in">
      <div className="bg-black/80 text-white px-4 py-2 rounded-xl text-sm">
        {message}
      </div>
    </div>
  )
}