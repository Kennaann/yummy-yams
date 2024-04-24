import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getIsGameOpen, selectIsGameOpen } from "../features/gameSlice"
import { ButtonComponent } from "./ButtonComponent"
import { LogoComponent } from "./LogoComponent"

interface HeroContent {
  title: string
  subtitle: string
  ctaLabel: string
}

const HERO_CONTENT: Record<string, HeroContent> = {
  OPEN: {
    title: "Lancer c'est gagner ! (ou pas)",
    subtitle: "Lancez les dés et tentez de gagner jusqu'à 3 pâtisseries !",
    ctaLabel: "Jouer maintenant",
  },
  CLOSED: {
    title: "Les résultats sont là !",
    subtitle: "Découvrez les gagnants de la dernière partie",
    ctaLabel: "Voir les résultats",
  },
}

export const HeroComponent = () => {
  const dispatch = useAppDispatch()

  const isGameOpen = useAppSelector(selectIsGameOpen)
  const gameStatus = useAppSelector(state => state.game.status)

  useEffect(() => {
    if (gameStatus === "idle") {
      dispatch(getIsGameOpen())
    }
  }, [gameStatus, dispatch])

  const getHeroContent = (): HeroContent => {
    if (gameStatus !== "succeeded" || isGameOpen) {
      return HERO_CONTENT.OPEN
    }

    return HERO_CONTENT.CLOSED
  }
  const { title, subtitle, ctaLabel } = getHeroContent()

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

            <ButtonComponent type="primary" label={ctaLabel} />
          </div>
        </div>
      </div>
    </>
  )
}