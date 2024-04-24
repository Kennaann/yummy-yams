import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getIsGameOpen, selectIsGameOpen } from "../features/gameSlice"
import { Button } from "../components/ButtonComponent"
import { Logo } from "../components/LogoComponent"

interface HeroContent {
  title: string
  subtitle: string
  button: {
    label: string
    href: string
  }
}

const HERO_CONTENT: Record<string, HeroContent> = {
  OPEN: {
    title: "Lancer c'est gagner ! (ou pas)",
    subtitle: "Lancez les dés et tentez de gagner jusqu'à 3 pâtisseries !",
    button: {
      label: "Jouer maintenant",
      href: "/yams",
    },
  },
  CLOSED: {
    title: "Les résultats sont là !",
    subtitle: "Découvrez les gagnants de la dernière partie",
    button: {
      label: "Voir les résultats",
      href: "/leaderboard",
    },
  },
}

export const HeroLayout = () => {
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
  const { title, subtitle, button } = getHeroContent()

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
          <Logo />

          <div className="m-5 flex flex-col md:items-center">
            <h2 className="text-2xl font-semibold md:hidden">{title}</h2>
            <p className="text-sm w-1/2 md:w-2/3 font-semibold md:text-center">
              {subtitle}
            </p>

            <Button href={button.href} type="primary" label={button.label} />
          </div>
        </div>
      </div>
    </>
  )
}
