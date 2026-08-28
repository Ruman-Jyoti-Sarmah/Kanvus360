import Seo from '../components/Seo'
import { seo } from '../data/content'
import Hero from './home/Hero'
import Manifesto from './home/Manifesto'
import Intro from './home/Intro'
import ServicesShowcase from './home/ServicesShowcase'
import SelectedStories from './home/SelectedStories'
import Statement from './home/Statement'
import Method from './home/Method'
import Moments from './home/Moments'
import Numbers from './home/Numbers'
import Testimonial from './home/Testimonial'
import Social from './home/Social'
import FinalCTA from './home/FinalCTA'

export default function Home() {
  return (
    <>
      <Seo title={seo.home.title} description={seo.home.description} />
      <Hero />
      <Manifesto />
      <Intro />
      <ServicesShowcase />
      <SelectedStories />
      <Statement />
      <Method />
      <Moments />
      <Numbers />
      <Testimonial />
      <Social />
      <FinalCTA />
    </>
  )
}