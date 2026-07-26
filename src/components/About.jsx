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
                I'm a Business & Systems Analyst with 10 years of experience transforming complex business challenges into data-driven solutions. I specialize in business requirements gathering, process improvement, and delivering analytics insights that drive strategic decision-making. My expertise spans data analysis, reporting, business intelligence, and Power BI dashboard development across diverse industries and enterprise environments.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Core Expertise:
                - Business Analysis & Requirements Gathering: Eliciting, documenting, and translating complex business needs into actionable technical solutions
                - Analytics & Reporting: Designing and building interactive Power BI dashboards and reports that deliver actionable insights
                - Technical Skills: Advanced proficiency in Power BI, SQL, Microsoft Excel (Advanced), Python, and data visualization
                - Process Improvement: Analyzing workflows and implementing solutions that drive efficiency and measurable business impact
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                I've successfully delivered end-to-end analytics initiatives including interactive dashboards that empower business leaders to make evidence-based decisions. Recent work includes building intelligent reporting systems that improved data processing efficiency by 68% while maintaining 99.8% accuracy across 500K+ records. My approach combines technical rigor with business acumen to ensure solutions deliver real organizational value.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                Complementary strengths in Agile Project Management (PMP, PMI-ACP, CSM, CSPO certified) and Cybersecurity (ISC2 Certified in Cybersecurity) enable me to deliver secure, well-governed analytics solutions within enterprise frameworks. I'm passionate about continuous improvement, mentoring teams, and translating complex data into clear business insights.
              </p>

              <div className="pt-4 flex gap-4 flex-wrap">
                <a
                  href="/resume.pdf"
                  className="inline-block px-6 py-3 bg-accent hover:bg-highlight text-white rounded-lg font-semibold transition-all duration-300 glow"
                  download
                  aria-label="Download resume as PDF"
                >
                  📄 Download Resume (PDF)
                </a>
                <a
                  href="/resume.docx"
                  className="inline-block px-6 py-3 border-2 border-accent hover:bg-accent/10 text-accent rounded-lg font-semibold transition-all duration-300"
                  download
                  aria-label="Download resume as DOCX"
                >
                  📋 Download Resume (DOCX)
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: '50+', label: 'Projects Delivered' },
                { number: '10', label: 'Years Experience' },
                { number: '12+', label: 'Agile Sprints' },
                { number: '5', label: 'Certifications' },
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
