import './Hero.css'

interface HeroProps {
  title: string
  subtitle?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  backgroundVariant?: 'gradient' | 'solid' | 'mesh'
}

function Hero({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink = '#',
  secondaryButtonText,
  secondaryButtonLink = '#',
  backgroundVariant = 'gradient',
}: HeroProps) {
  return (
    <section className={`hero hero--${backgroundVariant}`}>
      <div className="hero__backdrop" />
      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>
        {subtitle && <p className="hero__subtitle">{subtitle}</p>}
        {(primaryButtonText || secondaryButtonText) && (
          <div className="hero__buttons">
            {primaryButtonText && (
              <a href={primaryButtonLink} className="hero__button hero__button--primary">
                {primaryButtonText}
              </a>
            )}
            {secondaryButtonText && (
              <a href={secondaryButtonLink} className="hero__button hero__button--secondary">
                {secondaryButtonText}
              </a>
            )}
          </div>
        )}
      </div>
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />
    </section>
  )
}

export default Hero
