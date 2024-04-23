import { LogoComponent } from "./LogoComponent"

interface HeroComponentProps {
  title: string
  subtitle: string
  ctaLabel: string
}

export const HeroComponent = ({
  title,
  subtitle,
  ctaLabel,
}: HeroComponentProps) => {
  return (
    <>
      <img
        src="assets/lp_md.jpeg"
        alt="cupcake"
        className="absolute md:static inset-0 h-full md:h-[500px] w-full object-cover"
      />
      <div className="absolute inset-0 md:h-[500px] bg-black opacity-35 z-10"></div>

      <div className="z-20 px-2 text-slate-50">
        <div className="min-h-screen md:h-[500px] flex flex-col justify-between md:justify-normal md:items-center md:gap-20 md:absolute md:inset-0">
          <LogoComponent />

          <div className="m-5 flex flex-col md:items-center">
            <h2 className="text-2xl font-semibold md:hidden">{title}</h2>
            <p className="text-sm w-1/2 md:w-2/3 font-semibold md:text-center">
              {subtitle}
            </p>

            <button className="font-semibold bg-pink-400 py-2 px-4 rounded-tl-lg rounded-tr-lg rounded-br-lg my-4 md:mt-6 sm:w-fit ">
              {ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
