import { Link } from "react-router-dom"

interface ButtonProps {
  type: "primary" | "secondary"
  label: string
  href?: string
  onClick?: () => void
}

export const Button = ({ href, type, label, onClick }: ButtonProps) => {
  const color = type === "primary" ? "bg-pink-400" : "bg-orange-300"

  return (
    <Link to={href ?? "#"}>
      <button
        className={`font-semibold text-slate-50 ${color} py-2 px-4 rounded-tl-lg rounded-tr-lg rounded-br-lg mt-6 sm:w-fit`}
        onClick={onClick}
      >
        {label}
      </button>
    </Link>
  )
}
