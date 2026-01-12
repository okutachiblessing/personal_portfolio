import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaAward, FaCheck } from 'react-icons/fa';

const Certifications = () => {
  const certifications = [
    {
      title: 'PMI-ACP (Agile Certified Practitioner)',
      issuer: 'Project Management Institute (PMI)',
      date: '2025',
      description: 'Certified Agile Project Manager with expertise in Agile methodologies, Scrum, Kanban, and iterative project delivery.',
      icon: FaAward,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'ISC2 Certified in Cybersecurity',
      issuer: 'International Information System Security Certification Consortium',
      date: '2024',
      description: 'Comprehensive knowledge in security principles, risk management, incident response, and information asset protection.',
      icon: FaCertificate,
      color: 'from-purple-500 to-pink-500',
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
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent"
        >
          Certifications & Credentials
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12"
        >
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-secondary/30 backdrop-blur border border-accent/20 rounded-lg p-6 hover:border-accent/60 transition-all duration-300 card-hover group"
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${cert.color} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-full h-full text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>

                {/* Issuer */}
                <p className="text-accent font-semibold mb-2 text-sm">{cert.issuer}</p>

                {/* Date */}
                <p className="text-gray-400 text-sm mb-4">{cert.date}</p>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed">{cert.description}</p>

                {/* Badge */}
                <div className="mt-4 pt-4 border-t border-accent/20">
                  <span className="inline-block px-4 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full">
                    Verified
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skills Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-secondary/30 backdrop-blur border border-accent/20 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-white">Key Expertise Areas</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-accent font-bold mb-4">Project Management</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex gap-2">
                  <FaCheck className="text-accent mt-1" />
                  Agile/Scrum Methodologies
                </li>
                <li className="flex gap-2">
                  <FaCheck className="text-accent mt-1" />
                  Risk Management
                </li>
                <li className="flex gap-2">
                  <FaCheck className="text-accent mt-1" />
                  Stakeholder Management
                </li>
                <li className="flex gap-2">
                  <FaCheck className="text-accent mt-1" />
                  Process Improvement
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-accent font-bold mb-4">Cybersecurity</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex gap-2">
                  <FaCheck className="text-accent mt-1" />
                  Security Architecture
                </li>
                <li className="flex gap-2">
                  <FaCheck className="text-accent mt-1" />
                  Incident Response
                </li>
                <li className="flex gap-2">
                  <FaCheck className="text-accent mt-1" />
                  Risk Assessment
                </li>
                <li className="flex gap-2">
                  <FaCheck className="text-accent mt-1" />
                  Compliance & Governance
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
