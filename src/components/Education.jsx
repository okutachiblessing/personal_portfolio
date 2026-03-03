import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBook, FaCheckCircle } from 'react-icons/fa';

const Education = () => {
  const education = [
    {
      degree: 'Data Analytics',
      institution: 'Professional Development & Industry Training',
      date: '2025 - Present',
      description: 'Advanced expertise in data analytics with hands-on experience in data cleaning, quality assurance, and transformation of Electronic Medical Records (EMR) and clinical datasets. Proficient in Python (Anaconda, Jupyter Notebook), SQL database management, Power BI visualization, and statistical analysis.',
      highlights: [
        'Data Cleaning & Quality Assurance',
        'Python Analytics (Anaconda, Jupyter)',
        'SQL Database Management',
        'Power BI Visualization',
        'Statistical Analysis',
        'Clinical Data Transformation',
      ],
      icon: FaGraduationCap,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent"
        >
          Education & Development
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {education.map((edu, index) => {
            const IconComponent = edu.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-primary/40 backdrop-blur border border-accent/20 rounded-lg overflow-hidden hover:border-accent/60 transition-all duration-300 card-hover"
              >
                <div className="md:flex">
                  {/* Icon Section */}
                  <div className={`md:w-1/4 bg-gradient-to-br from-accent/10 to-highlight/10 p-8 flex items-center justify-center`}>
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${edu.color} p-6 flex items-center justify-center`}>
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="md:w-3/4 p-8">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold text-white mb-2">{edu.degree}</h3>
                      <p className="text-accent font-semibold text-lg mb-1">{edu.institution}</p>
                      <p className="text-gray-400 text-sm">{edu.date}</p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed">{edu.description}</p>

                    {/* Highlights */}
                    <div>
                      <h4 className="text-accent font-bold mb-4 flex items-center gap-2">
                        <FaBook className="text-sm" />
                        Key Skills & Focus Areas
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {edu.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <FaCheckCircle className="text-accent text-sm flex-shrink-0" />
                            <span className="text-gray-300">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Development Path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-accent/10 to-highlight/10 border border-accent/20 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-white">Continuous Learning Path</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-accent font-bold mb-4">Technical Skills</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex gap-2">
                  <FaCheckCircle className="text-accent mt-1" />
                  Advanced Python for Data Science
                </li>
                <li className="flex gap-2">
                  <FaCheckCircle className="text-accent mt-1" />
                  SQL Advanced Query Optimization
                </li>
                <li className="flex gap-2">
                  <FaCheckCircle className="text-accent mt-1" />
                  Power BI Dashboard Development
                </li>
                <li className="flex gap-2">
                  <FaCheckCircle className="text-accent mt-1" />
                  Healthcare Data Standards (HL7, FHIR)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-accent font-bold mb-4">Domain Expertise</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex gap-2">
                  <FaCheckCircle className="text-accent mt-1" />
                  Clinical Data Management
                </li>
                <li className="flex gap-2">
                  <FaCheckCircle className="text-accent mt-1" />
                  Healthcare Analytics
                </li>
                <li className="flex gap-2">
                  <FaCheckCircle className="text-accent mt-1" />
                  Data Quality & Compliance
                </li>
                <li className="flex gap-2">
                  <FaCheckCircle className="text-accent mt-1" />
                  Agile Data Team Management
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
