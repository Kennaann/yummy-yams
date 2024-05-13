interface AuthInputComponentProps {
  type: string
  name: string
  placeholder: string
  value: string
  errors: Record<string, any>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AuthInput = ({
  type,
  name,
  placeholder,
  value,
  errors,
  onChange,
}: AuthInputComponentProps) => {
  return (
    <div className="w-full">
      <input
        type={type}
        className="w-full py-2 px-4 rounded-lg bg-slate-200 mt-4 focus:outline-slate-300"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errors[name] && (
        <p className="text-sm text-red-500 pt-2">{errors[name]}</p>
      )}
    </div>
  )
}
