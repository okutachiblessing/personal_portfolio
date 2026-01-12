import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/50 to-primary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a strategic Agile Project Manager with expertise in delivering high-impact software solutions. 
                With 5+ years of experience managing complex projects, I've led cross-functional teams from startups to enterprise environments.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                PMI-ACP certified and ISC2 certified in Cybersecurity, I specialize in Agile methodologies, risk management, and security-by-design principles. 
                I'm passionate about building secure, scalable applications while maintaining team velocity and stakeholder satisfaction.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Beyond project management, I'm deeply involved in cybersecurity practices, DevOps automation, and continuous improvement initiatives.
                I actively contribute to knowledge sharing through technical articles and mentoring development teams.
              </p>

              <div className="pt-4">
                <a
                  href="/resume.pdf"
                  className="inline-block px-6 py-3 bg-accent hover:bg-highlight text-white rounded-lg font-semibold transition-all duration-300 glow"
                  download
                >
                  Download Resume
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '50+', label: 'Projects' },
                { number: '5+', label: 'Years Experience' },
                { number: '100+', label: 'Happy Clients' },
                { number: '200+', label: 'Code Reviews' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-secondary/50 backdrop-blur p-6 rounded-lg border border-accent/30 text-center hover:border-accent/60 transition-all duration-300"
                >
                  <h3 className="text-3xl font-bold text-accent mb-2">{stat.number}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
