import AboutMe from "../components/AboutMe";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import StarBackground from "../components/StarBackground";

function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Background Effects */}
            <StarBackground />

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main>
                {/* Hero section */}
                <Hero />

                {/* About me section */}
                <AboutMe />

                {/* Skills section */}
                <Skills />

                {/* Projects section*/}
                <Projects />

                {/* Contact Section*/}
                <Contact />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Home;