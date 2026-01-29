import './hero.css'
import Button from '../ui/Button'

const HeroSction = () => {
  return (
    <section className='hero-section'>
      <div className='section-content'>
          <h1>Dari Kukusan, Sampai ke Hati</h1>
          <p>Kami percaya dimsum terbaik lahir dari proses yang sabar, rasa yang jujur, dan kehangatan yang bisa kamu rasakan.</p>
          <div className='section-content-button'>
            <Button text={"Produk unggulan"} />
            <Button text={"Jelajahi Menu"} />
          </div>
      </div>
      <div style={{ backgroundImage: `url('/hero-example.png')` }} className='section-bg'></div>
    </section>
  )
}

export default HeroSction