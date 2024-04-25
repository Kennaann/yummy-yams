import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface ButtonProps {
  type: "primary" | "secondary"
  label: string
  href?: string
  disabled?: boolean
  onClick?: () => void
}

export const Button = ({
  type,
  label,
  onClick,
  href = "#",
  disabled = false,
}: ButtonProps) => {
  const [color, setColor] = useState("")

  useEffect(() => {
    if (disabled) {
      setColor("bg-gray-300")
    } else {
      setColor(type === "primary" ? "bg-pink-400" : "bg-orange-300")
    }
  }, [type, disabled])

  return (
    <Link to={href}>
      <button
        className={`font-semibold text-slate-50 ${color} py-2 px-4 rounded-tl-lg rounded-tr-lg rounded-br-lg mt-6 sm:w-fit`}
        onClick={onClick}
      >
        {label}
      </button>
    </Link>
  )
}
