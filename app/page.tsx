import { FairyStoryHeroSection } from "@/components/story/HeroSection";
import { RelatedFairyStories } from "@/components/story/RelatedFairyStories";

export default function Home() {
  return (
    

    <div >
      <section className="bg-gradient-to-b from-purple-100 to-blue-200 min-h-screen p-4 pt-8">
        <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-purple-800 mb-8">Brothers Grimm&apos; fairy tales</h2>
          <FairyStoryHeroSection author="Brothers Grimm" />
          
          <RelatedFairyStories author="Brothers Grimm" />
        </div>
      </section>
      <section className="bg-gradient-to-b from-blue-200 to-yellow-50 min-h-screen p-4 pt-8">
        <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-800 mb-8">Andersen&apos; stories</h2>
          <FairyStoryHeroSection author="Hans Christian Andersen" />
          
          <RelatedFairyStories author="Hans Christian Andersen" />
        </div>

      </section>
      <section className="bg-gradient-to-b from-yellow-50 to-red-200 min-h-screen p-4 pt-8">
        <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-yellow-800 mb-8">Aesop&apos; fables</h2>
          <FairyStoryHeroSection author="Aesop" />
          
          <RelatedFairyStories author="Aesop" />
        </div>

      </section>


    </div>
  );
}

function HeroSectionWithRelevant({ author, relevantTitle }: { author: string, relevantTitle: string }) {

  return (
    <section className="bg-gradient-to-b from-purple-100 to-blue-200 min-h-screen">
      <div className="max-w-6xl mx-auto">
      <FairyStoryHeroSection author={author}/>
          <h2 className="text-3xl font-bold text-purple-800 mb-8">{relevantTitle}</h2>
          <RelatedFairyStories author={author}/>
      </div>
          
        </section>
  )
}
