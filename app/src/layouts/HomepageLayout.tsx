export const HomepageLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-slate-50 text-slate-800 static">
      <img
        src="assets/lp_md.jpeg"
        alt="cupcake"
        className="absolute md:static inset-0 h-full md:h-[500px] w-full object-cover md:rounded-b-3xl"
      />
      <div className="absolute inset-0 md:h-[500px] bg-black opacity-35 z-10 md:rounded-b-3xl"></div>

      <div className="z-20 px-2 text-slate-50">
        <div className="h-screen md:h-[500px] flex flex-col justify-between md:justify-normal md:items-center md:gap-20 md:absolute md:inset-0">
          <div className="flex flex-col items-center mt-3">
            <h1 className="text-6xl font-light font-reenie">Yummy Yams</h1>
          </div>

          <div className="m-5 flex flex-col md:items-center">
            <h2 className="text-2xl font-semibold md:hidden">
              Lancer c'est gagner ! (ou pas)
            </h2>
            <p className="text-sm w-1/2 md:w-2/3 font-semibold">
              Lancez les dés et tentez de gagner jusqu'à 3 pâtisseries !
            </p>

            <button className="font-semibold bg-pink-400 py-2 px-4 rounded-tl-lg rounded-tr-lg rounded-br-lg my-4 md:mt-6 sm:w-fit ">
              Découvrir nos pâtisseries
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2>La première boulangerie géré par une IA</h2>
        <div>
          Bye bye les boulangers ! Chez yummy nos patisseries sont imprimées en
          3d et les modèles sont généré par des IA. Pour s'assurer de la
          suppression du plus d'emplois possibles, nous n'avons pas de serveurs.
          Vous commandez et récupérez vos commandes sur nos bornes !
        </div>
      </div>
    </div>
  )
}
