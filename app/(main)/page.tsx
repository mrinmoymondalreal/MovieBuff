import { Banner, GenreDivison, LangDivison, LangSection, TrendingSection } from '@/components/Sections';

export default async function Home(){
  return (
    <div className="md:ml-16 overflow-x-hidden">
        <Banner />
        <div className="downside md:relative md:mt-[100vh] md:-top-52 h-fit md:block space-y-8">
          <TrendingSection />
          <LangDivison />
          <GenreDivison />
        </div>
    </div>
  )
}