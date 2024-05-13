import { ContentLayout } from "../layouts/ContentLayout"
import { HeroLayout } from "../layouts/HeroLayout"

export const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 static">
      <HeroLayout />

      <ContentLayout
        title="La première boulangerie gérée par une IA"
        text="Bye bye les boulangers ! Chez yummy nos patisseries sont imprimées
            en 3d et les modèles sont généré par des IA. Pour s'assurer de la
            suppression du plus d'emplois possibles, nous n'avons pas de
            serveurs. Vous commandez et récupérez vos commandes sur nos bornes !"
        image="robots-baking.webp"
        ctaLabel="Voir nos boutiques"
        isInverted={false}
      />

      <ContentLayout
        title="Des patisseries 100% artificielles"
        text="Nous détestons vos papilles, c'est pourquoi nous avons décidé de ne
            pas utiliser de produits naturels. Nos patisseries sont 100%
            artificielles et ne contiennent que des produits chimiques. Vous
            pouvez être sûr de ne pas prendre de plaisir en mangeant nos
            patisseries."
        image="eclair.jpeg"
        ctaLabel="Découvrir nos patisseries"
        isInverted={true}
      />
    </div>
  )
}
