import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Project Management',
      skills: ['Agile/Scrum', 'Kanban', 'Sprint Planning', 'Backlog Management', 'Stakeholder Management', 'Risk Management'],
    },
    {
      title: 'Cybersecurity',
      skills: ['Security Risk Assessment', 'Incident Response', 'Compliance (ISO27001, NIST)', 'Security Governance', 'Vulnerability Management', 'Threat Analysis'],
    },
    {
      title: 'Development Technologies',
      skills: ['React', 'Node.js', 'TypeScript', 'Python', 'REST APIs', 'GraphQL'],
    },
    {
      title: 'DevSecOps & Cloud',
      skills: ['CI/CD Pipelines', 'Docker', 'Kubernetes', 'AWS', 'Cloudflare', 'GitHub Actions'],
    },
    {
      title: 'Project Management Tools',
      skills: ['Jira', 'Confluence', 'GitHub Projects', 'Slack', 'MS Project', 'Azure DevOps'],
    },
    {
      title: 'Core Competencies',
      skills: ['Team Leadership', 'Process Improvement', 'Security By Design', 'Technical Communication', 'Agile Coaching', 'Metrics & Analytics'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/50 to-primary">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent"
        >
          Skills & Expertise
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-secondary/30 backdrop-blur border border-accent/20 rounded-lg p-6 hover:border-accent/60 transition-all duration-300 card-hover"
            >
              <h3 className="text-xl font-bold text-accent mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-accent/10 border border-accent/30 text-accent rounded-full text-sm font-medium hover:bg-accent/20 transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Proficiency Levels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-secondary/30 backdrop-blur border border-accent/20 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-8 text-white">Core Competencies</h3>
          <div className="space-y-4">
            {[
              { name: 'Agile Project Management', level: 95 },
              { name: 'Risk & Compliance Management', level: 92 },
              { name: 'Cybersecurity & Incident Response', level: 90 },
              { name: 'Team Leadership & Coaching', level: 88 },
            ].map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-accent">{skill.level}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-accent to-highlight"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
