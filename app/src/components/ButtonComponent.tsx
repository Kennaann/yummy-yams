interface ButtonComponentProps {
  type: "primary" | "secondary"
  label: string
}

export const ButtonComponent = ({ type, label }: ButtonComponentProps) => {
  const color = type === "primary" ? "bg-pink-400" : "bg-orange-300"

  return (
    <button
      className={`font-semibold text-slate-50 ${color} py-2 px-4 rounded-tl-lg rounded-tr-lg rounded-br-lg mt-6 sm:w-fit`}
    >
      {label}
    </button>
  )
}
