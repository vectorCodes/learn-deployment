import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import DeployCTA from './components/DeployCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <DeployCTA />
      <Footer />
    </div>
  );
}

export default App;
