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
                I'm a strategic Agile Project Manager and Data Analytics specialist with expertise in delivering high-impact solutions. 
                With 5+ years of experience managing complex projects, I've led cross-functional teams from startups to enterprise environments, combining Agile best practices with data-driven decision-making.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                PMI-ACP and Scrum certified (CSM/CSPO), I specialize in Agile methodologies, Scrum frameworks, and risk management. 
                I've recently deepened expertise in healthcare data analytics, transforming Electronic Medical Records (EMR) and clinical datasets into actionable insights using Python, SQL, and Power BI.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                My unique blend of project management and analytics enables me to lead data transformation initiatives, manage Agile team velocity, 
                and deliver enterprise dashboards. I'm proficient in data cleaning, quality assurance, and translating technical insights into business impact.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Beyond technical skills, I'm passionate about mentoring development teams, DevSecOps automation, continuous improvement, 
                and knowledge sharing through technical articles and speaking engagements.
              </p>

              <div className="pt-4">
                <a
                  href="/resume.pdf"
                  className="inline-block px-6 py-3 bg-accent hover:bg-highlight text-white rounded-lg font-semibold transition-all duration-300 glow"
                  download
                  aria-label="Download resume"
                >
                  Download Resume
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '50+', label: 'Projects Delivered' },
                { number: '5+', label: 'Years Experience' },
                { number: '12+', label: 'Agile Sprints' },
                { number: '4', label: 'Certifications' },
                { number: '500K+', label: 'Records Processed' },
                { number: '99.8%', label: 'Data Accuracy' },
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
                  <p className="text-gray-400 text-sm">{stat.label}</p>
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
