import Hero from './components/Hero'
import './App.css'

function App() {
  return (
    <>
      <Hero
        title="Build Something Amazing"
        subtitle="A modern React application powered by Vite. Fast, reliable, and ready for production deployment."
        primaryButtonText="Get Started"
        primaryButtonLink="#get-started"
        secondaryButtonText="Learn More"
        secondaryButtonLink="#learn-more"
        backgroundVariant="mesh"
      />
    </>
  )
}

export default App
