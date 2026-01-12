import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaArrowRight, FaTags, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa';

const MediumArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMediumArticles();
  }, []);

  const fetchMediumArticles = async () => {
    try {
      setLoading(true);
      // Using Medium's RSS feed for the user
      const mediumUsername = 'okutachiblessing';
      const rssUrl = `https://medium.com/feed/@${mediumUsername}`;
      
      // Call our Cloudflare Worker to fetch the RSS feed (CORS workaround)
      const response = await fetch(`/api/medium-feed?user=${mediumUsername}`);
      
      if (!response.ok) {
        // Fallback to hardcoded articles if API is not available
        setArticles(getStaticArticles());
        setError(null);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setArticles(data.articles || getStaticArticles());
      setError(null);
    } catch (err) {
      console.log('Using static articles as fallback');
      // Use static articles as fallback
      setArticles(getStaticArticles());
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const getStaticArticles = () => {
    return [
      {
        title: 'Mastering Sprint Planning: From Backlog to Velocity Forecasting',
        excerpt: 'Deep dive into sprint planning ceremonies, capacity planning, story pointing techniques, and using historical velocity data to make accurate delivery commitments.',
        date: 'Dec 15, 2025',
        readTime: '10 min read',
        tags: ['Scrum', 'Planning', 'Metrics'],
        url: 'https://medium.com/@okutachiblessing/mastering-sprint-planning-from-backlog-to-velocity-forecasting-698792245068',
        source: 'Medium',
      },
      {
        title: 'Risk Management in Agile: Proactive Identification and Mitigation',
        excerpt: 'How to identify technical, organizational, and resource risks in Agile projects, create risk registers, and implement mitigation strategies without slowing velocity.',
        date: 'Jan 9, 2026',
        readTime: '12 min read',
        tags: ['Risk Management', 'PMI-ACP', 'Leadership'],
        url: 'https://medium.com/@okutachiblessing/risk-management-in-agile-proactive-identification-mitigation-and-continuous-control-364a60e72371',
        source: 'Medium',
      },
      {
        title: 'Building High-Performing Agile Teams: Culture, Communication, and Coaching',
        excerpt: 'Techniques for developing self-organizing teams, fostering psychological safety, implementing effective retrospectives, and coaching teams toward continuous improvement.',
        date: 'Dec 5, 2025',
        readTime: '11 min read',
        tags: ['Team Building', 'Coaching', 'Culture'],
        url: 'https://medium.com/@okutachiblessing',
        source: 'Medium',
      },
      {
        title: 'Agile Is Not About Speed: A PMI-ACP Perspective',
        excerpt: 'Agile isn\'t a rebellion against project management—it\'s an evolution of it. Learn why value delivery matters more than velocity and how to plan with intent.',
        date: 'Dec 1, 2025',
        readTime: '8 min read',
        tags: ['Agile', 'PMI-ACP', 'Leadership'],
        url: 'https://medium.com/@okutachiblessing',
        source: 'Medium',
      },
      {
        title: 'Integrating Security into Agile Workflows: DevSecOps Best Practices',
        excerpt: 'Embedding security practices into Agile ceremonies, automating security scanning, conducting security retrospectives, and maintaining compliance without compromising velocity.',
        date: 'Nov 28, 2025',
        readTime: '10 min read',
        tags: ['DevSecOps', 'Security', 'Compliance'],
        url: 'https://medium.com/@okutachiblessing',
        source: 'Medium',
      },
      {
        title: 'Stakeholder Management in Agile: Communication Plans and Transparent Reporting',
        excerpt: 'Strategies for managing diverse stakeholder expectations, creating transparent metrics dashboards, conducting burndown analysis, and delivering bad news effectively.',
        date: 'Nov 22, 2025',
        readTime: '8 min read',
        tags: ['Stakeholders', 'Communication', 'Metrics'],
        url: 'https://medium.com/@okutachiblessing',
        source: 'Medium',
      },
    ];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="medium-articles" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-accent to-accent/50"></div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Published Articles</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Featured on Medium
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl">
            In-depth articles on Agile Project Management, PMI-ACP certification, and leadership strategies for high-performing teams.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-12"
          >
            <FaSpinner className="text-accent text-4xl animate-spin" />
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-8 text-red-400"
          >
            {error}
          </motion.div>
        )}

        {/* Articles Grid */}
        {!loading && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {articles.slice(0, 6).map((article, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary/40 backdrop-blur border border-accent/20 rounded-lg p-6 hover:border-accent/60 transition-all duration-300 group flex flex-col h-full hover:bg-secondary/60"
              >
                {/* Medium Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-black/40 text-white text-xs rounded-full font-medium border border-accent/30">
                    {article.source}
                  </span>
                  <FaExternalLinkAlt className="text-accent/60 group-hover:text-accent transition-colors" size={14} />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300 flex-grow line-clamp-3">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-2">
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

                {/* Read More Link */}
                <div className="mt-4 flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                  <span>Read on Medium</span>
                  <FaArrowRight size={12} />
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* CTA to Medium Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://medium.com/@okutachiblessing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-accent hover:bg-accent/90 text-black rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
          >
            <span>View Full Medium Profile</span>
            <FaExternalLinkAlt size={14} />
          </a>
          <a
            href="https://medium.com/@okutachiblessing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-accent hover:bg-accent/10 text-accent rounded-lg font-semibold transition-all duration-300"
          >
            Follow on Medium
          </a>
        </motion.div>

        {/* Note about Updates */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 text-sm mt-8"
        >
          Articles are automatically synced from Medium. Subscribe to stay updated with the latest insights.
        </motion.p>
      </div>
    </section>
  );
};

export default MediumArticles;
