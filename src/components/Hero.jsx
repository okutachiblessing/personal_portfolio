import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import avatarImage from '../assets/avatar.jpeg';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/okutachiblessing', label: 'GitHub' },
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/blessing-ele-agbonkpolor', label: 'LinkedIn' },
    { icon: FaEnvelope, url: 'mailto:okutachiblessing@gmail.com', label: 'Email' },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-3xl mx-auto"
      >
        {/* Profile Image */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-accent to-highlight p-1 overflow-hidden">
            <img 
              src={avatarImage} 
              alt="Blessing Ele Agbonkpolor" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </motion.div>

        {/* Main Text */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl font-bold mb-6 text-accent"
        >
          Blessing Ele Agbonkpolor
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl text-accent mb-4 font-semibold"
        >
          Agile Project Manager & Cybersecurity Specialist
        </motion.h2>

        {/* Certifications */}
        <motion.p
          variants={itemVariants}
          className="text-gray-300 text-base sm:text-lg mb-6 font-medium"
        >
          PMI-ACP Certified | ISC2 Certified in Cybersecurity
        </motion.p>

        {/* Location/Status */}
        <motion.p
          variants={itemVariants}
          className="text-gray-300 text-base sm:text-lg mb-2"
        >
          Agile Coach | DevSecOps Advocate | Risk Management Specialist
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-accent text-base sm:text-lg mb-10 font-medium"
        >
          📍 Whitby, Ontario | 📞 +1 (437) 871-6680
        </motion.p>
        <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap mb-12">
          <a
            href="#projects"
            className="px-8 py-3 bg-accent hover:bg-highlight text-primary font-bold rounded-lg transition glow"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            className="px-8 py-3 border-2 border-accent hover:bg-accent/10 text-accent rounded-lg font-semibold transition"
            download
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border-2 border-accent hover:bg-accent/10 text-accent rounded-lg font-semibold transition"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex gap-6 justify-center flex-wrap"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="text-accent hover:text-highlight transition-colors duration-300"
              aria-label={link.label}
            >
              <link.icon size={32} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-20"
        >
          <p className="text-gray-400 mb-3">Scroll Down</p>
          <FaChevronDown className="w-6 h-6 mx-auto text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
