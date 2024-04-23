export const HomepageLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 static">
      <img
        src="assets/lp_md.jpeg"
        alt="cupcake"
        className="absolute md:static inset-0 h-full md:h-[500px] w-full object-cover"
      />
      <div className="absolute inset-0 md:h-[500px] bg-black opacity-35 z-10"></div>

      <div className="z-20 px-2 text-slate-50">
        <div className="min-h-screen md:h-[500px] flex flex-col justify-between md:justify-normal md:items-center md:gap-20 md:absolute md:inset-0">
          <div className="flex flex-col items-center mt-3">
            <h1 className="text-6xl font-light font-reenie">Yummy Yams</h1>
          </div>

          <div className="m-5 flex flex-col md:items-center">
            <h2 className="text-2xl font-semibold md:hidden">
              Lancer c'est gagner ! (ou pas)
            </h2>
            <p className="text-sm w-1/2 md:w-2/3 font-semibold md:text-center">
              Lancez les dés et tentez de gagner jusqu'à 3 pâtisseries !
            </p>

            <button className="font-semibold bg-pink-400 py-2 px-4 rounded-tl-lg rounded-tr-lg rounded-br-lg my-4 md:mt-6 sm:w-fit ">
              Jouer maintenant
            </button>
          </div>
        </div>
      </div>

      <div className="flex lg:w-2/3 mx-3 lg:mx-auto my-10 md:my-20 space-x-4 md:space-x-8">
        <div className="mt-4 flex flex-col">
          <h2 className="text-2xl font-semibold">
            La première boulangerie gérée par une IA
          </h2>
          <p className="mt-2">
            Bye bye les boulangers ! Chez yummy nos patisseries sont imprimées
            en 3d et les modèles sont généré par des IA. Pour s'assurer de la
            suppression du plus d'emplois possibles, nous n'avons pas de
            serveurs. Vous commandez et récupérez vos commandes sur nos bornes !
          </p>

          <button className="font-semibold text-slate-50 bg-orange-300 py-2 px-4 rounded-tl-lg rounded-tr-lg rounded-br-lg mt-6 sm:w-fit ">
            Voirs nos boutiques
          </button>
        </div>

        <img
          src="assets/robots-baking.webp"
          alt="Robot boulanger"
          className="hidden md:block w-1/2 object-cover rounded-lg max-h-80"
        />
      </div>

      <div className="flex lg:w-2/3 mx-3 lg:mx-auto my-5 md:my-20 space-x-4 md:space-x-8">
        <img
          src="assets/eclair.jpeg"
          alt="Robot boulanger"
          className="hidden md:block w-1/2 object-cover rounded-lg  max-h-80"
        />

        <div className="mt-4 flex flex-col">
          <h2 className="text-2xl font-semibold">
            Des patisseries 100% artificielles
          </h2>
          <p className="mt-2">
            Nous détestons vos papilles, c'est pourquoi nous avons décidé de ne
            pas utiliser de produits naturels. Nos patisseries sont 100%
            artificielles et ne contiennent que des produits chimiques. Vous
            pouvez être sûr de ne pas prendre de plaisir en mangeant nos
            patisseries.
          </p>

          <button className="font-semibold text-slate-50 bg-orange-300 py-2 px-4 rounded-tl-lg rounded-tr-lg rounded-br-lg my-4 md:mt-6 sm:w-fit ">
            Découvrir nos patisseries
          </button>
        </div>
      </div>
    </div>
  )
}
