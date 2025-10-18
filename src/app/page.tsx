import React from 'react';
import SlideTabs from '@/components/SliderTabs';
import About from '@/components/About'
import Contact from '@/components/Contact'

const Home = () => {
  return (
    <div>
      <About/>
      <SlideTabs/>
      <Contact/>
    </div>
  )
}

export default Home