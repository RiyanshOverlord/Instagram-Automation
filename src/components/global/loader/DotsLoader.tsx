export const DotsLoader = ({ color = "bg-indigo-500" }) => {
  return (
    <div className="flex items-center gap-1">
      <span className={`h-2 w-2 rounded-full ${color} animate-bounce [animation-delay:-0.3s]`} />
      <span className={`h-2 w-2 rounded-full ${color} animate-bounce [animation-delay:-0.15s]`} />
      <span className={`h-2 w-2 rounded-full ${color} animate-bounce`} />
    </div>
  )
}