import AboutMe from "../components/AboutMe";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import SkillsSection from "../components/SkillsSection";
import StarBackground from "../components/StarBackground";
import ThemeToggle from "../components/ThemeToggle";

function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Background Effects */}
            <StarBackground />

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main>
                {/* Hero section */}
                <HeroSection />
                <AboutMe />
                <SkillsSection />
            </main>

            {/* Footer */}


        </div>
    );
}

export default Home;