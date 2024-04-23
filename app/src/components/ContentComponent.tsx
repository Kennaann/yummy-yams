interface ContentComponentProps {
  title: string
  text: string
  image: string
  ctaLabel: string
  isInverted: boolean
}

export const ContentComponent = ({
  title,
  text,
  image,
  ctaLabel,
  isInverted,
}: ContentComponentProps) => {
  return (
    <div
      className={`flex ${isInverted ? "flex-row-reverse" : ""} lg:w-2/3 mx-3 lg:mx-auto my-10 md:my-20 `}
    >
      <div className="mt-4 flex flex-col">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-2">{text}</p>

        <button className="font-semibold text-slate-50 bg-orange-300 py-2 px-4 rounded-tl-lg rounded-tr-lg rounded-br-lg mt-6 sm:w-fit ">
          {ctaLabel}
        </button>
      </div>

      <img
        src={`assets/${image}`}
        alt="Robot boulanger"
        className={`hidden md:block w-1/2 max-h-80 object-cover rounded-lg ${isInverted ? "mr-4 md:mr-8" : "ml-4 md:ml-8"}`}
      />
    </div>
  )
}
