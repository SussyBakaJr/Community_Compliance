import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";
import HowItWorks from "../components/HowItWorks";
import FeatureCards from "../components/FeatureCards";
import DashboardPreview from "../components/DashboardPreview";
export default function Home() {

    return (

        <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

            <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-violet-600/20 blur-[220px] rounded-full"></div>

            <Hero />

            <StatsSection />

            <HowItWorks />
            <FeatureCards />
            <DashboardPreview />
        </main>

    );

}