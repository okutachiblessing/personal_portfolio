import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Articles from './components/Articles';
import MediumArticles from './components/MediumArticles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VisitorCounter from './components/VisitorCounter';
import SecurityHeaders from './utils/security';

function App() {
  useEffect(() => {
    // Apply security headers
    SecurityHeaders.setCSP();
  }, []);

  return (
    <div className="min-h-screen bg-primary text-white">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Articles />
        <MediumArticles />
        <Contact />
      </main>
      <VisitorCounter />
      <Footer />
    </div>
  );
}

export default App;
