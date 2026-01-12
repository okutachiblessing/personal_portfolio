import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaArrowRight, FaTags } from 'react-icons/fa';

const Articles = () => {
  const articles = [
    {
      title: 'Scaling Agile Beyond the Team: SAFe and Enterprise Frameworks',
      excerpt: 'Practical strategies for scaling Agile methodologies across large organizations, managing dependencies, and aligning multiple teams with business objectives.',
      date: 'Dec 20, 2025',
      readTime: '12 min read',
      tags: ['Agile', 'SAFe', 'Scaling'],
      link: '#',
    },
    {
      title: 'Mastering Sprint Planning: From Backlog to Velocity Forecasting',
      excerpt: 'Deep dive into sprint planning ceremonies, capacity planning, story pointing techniques, and using historical velocity data to make accurate delivery commitments.',
      date: 'Dec 15, 2025',
      readTime: '10 min read',
      tags: ['Scrum', 'Planning', 'Metrics'],
      link: '#',
    },
    {
      title: 'Risk Management in Agile: Proactive Identification and Mitigation',
      excerpt: 'How to identify technical, organizational, and resource risks in Agile projects, create risk registers, and implement mitigation strategies without slowing velocity.',
      date: 'Dec 10, 2025',
      readTime: '9 min read',
      tags: ['Risk Management', 'PMI-ACP', 'Leadership'],
      link: '#',
    },
    {
      title: 'Building High-Performing Agile Teams: Culture, Communication, and Coaching',
      excerpt: 'Techniques for developing self-organizing teams, fostering psychological safety, implementing effective retrospectives, and coaching teams toward continuous improvement.',
      date: 'Dec 5, 2025',
      readTime: '11 min read',
      tags: ['Team Building', 'Coaching', 'Culture'],
      link: '#',
    },
    {
      title: 'Integrating Security into Agile Workflows: DevSecOps Best Practices',
      excerpt: 'Embedding security practices into Agile ceremonies, automating security scanning, conducting security retrospectives, and maintaining compliance without compromising velocity.',
      date: 'Nov 28, 2025',
      readTime: '10 min read',
      tags: ['DevSecOps', 'Security', 'Compliance'],
      link: '#',
    },
    {
      title: 'Stakeholder Management in Agile: Communication Plans and Transparent Reporting',
      excerpt: 'Strategies for managing diverse stakeholder expectations, creating transparent metrics dashboards, conducting burndown analysis, and delivering bad news effectively.',
      date: 'Nov 22, 2025',
      readTime: '8 min read',
      tags: ['Stakeholders', 'Communication', 'Metrics'],
      link: '#',
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
    <section id="articles" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/50 to-primary">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-center text-accent"
        >
          Latest Articles & Insights
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {articles.map((article, index) => (
            <motion.a
              key={index}
              variants={itemVariants}
              href={article.link}
              className="bg-secondary/30 backdrop-blur border border-accent/20 rounded-lg p-6 hover:border-accent/60 transition-all duration-300 card-hover group flex flex-col"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300 flex-grow">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-400 text-sm mb-4 flex-grow">
                {article.excerpt}
              </p>

              {/* Meta Info */}
              <div className="border-t border-accent/20 pt-4">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <FaCalendar size={12} />
                    <span>{article.date}</span>
                  </div>
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Read More */}
              <div className="mt-4 flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                <span>Read More</span>
                <FaArrowRight size={14} />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* View All Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#"
            className="inline-block px-8 py-3 border-2 border-accent hover:bg-accent/10 text-accent rounded-lg font-semibold transition-all duration-300"
          >
            View All Articles
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Articles;
