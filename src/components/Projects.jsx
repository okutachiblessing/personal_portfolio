import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  const projects = [
    {
      title: 'Agile Delivery Management Platform',
      description: 'Led end-to-end Agile delivery as PMI-ACP certified PM for a secure, cloud-hosted web application. Managed backlog, sprints, and team coordination ensuring MVP delivery with JWT/OAuth2 authentication and role-based access control.',
      tech: ['React', 'Node.js', 'MongoDB', 'AWS', 'GitHub Actions', 'Jira'],
      github: 'https://github.com/okutachiblessing/agile-secure-webapp-delivery',
      live: 'https://github.com/okutachiblessing/agile-secure-webapp-delivery',
      image: '⚙️',
      featured: true,
    },
    {
      title: 'Personal Portfolio Website',
      description: 'Modern, responsive portfolio built with React, Vite, and Tailwind CSS. Features real-time visitor counter powered by Cloudflare KV storage, automated CI/CD deployment via GitHub Actions, and comprehensive security implementations.',
      tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Cloudflare'],
      github: 'https://github.com/okutachiblessing/personal_portfolio',
      live: 'https://blessing-portfolio.pages.dev',
      image: '🌐',
      featured: true,
    },
    {
      title: 'Incident Response Hub',
      description: 'Centralized incident response management system for security teams to track, triage, and resolve security incidents in real-time. Achieved 60% MTTR reduction with ML-powered severity classification.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'GraphQL', 'ELK Stack', 'Docker'],
      github: 'https://github.com/okutachiblessing/incident-response-hub',
      live: 'https://github.com/okutachiblessing/incident-response-hub',
      image: '🔒',
      featured: true,
    },
    {
      title: 'Compliance & Risk Management Dashboard',
      description: 'Enterprise dashboard for CISOs to monitor risk posture and compliance across frameworks (NIST, ISO 27001, SOC2). Reduced compliance audit time from 40 hours to 4 hours through automated evidence collection.',
      tech: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'SAML 2.0', 'Nessus API'],
      github: 'https://github.com/okutachiblessing/compliance-risk-dashboard',
      live: 'https://github.com/okutachiblessing/compliance-risk-dashboard',
      image: '📋',
      featured: true,
    },
    {
      title: 'DevSecOps CI/CD Pipeline',
      description: 'Automated security-hardened CI/CD pipeline integrating SAST, DAST, container scanning, and policy-as-code. Enables 12 teams to deploy 20+ times daily with 35% faster deployments and 4x security detection.',
      tech: ['GitHub Actions', 'Jenkins', 'Terraform', 'Kubernetes', 'SonarQube', 'Trivy', 'OPA/Rego'],
      github: 'https://github.com/okutachiblessing/devsecops-pipeline',
      live: 'https://github.com/okutachiblessing/devsecops-pipeline',
      image: '🚀',
      featured: true,
    },
    {
      title: 'Agile Team Analytics & Velocity Dashboard',
      description: 'Real-time analytics platform for Agile teams with predictive delivery forecasting. Provides sprint velocity tracking, burndown analysis, and capacity planning with 92% forecast accuracy.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'D3.js', 'Socket.io', 'Jira API', 'TensorFlow.js'],
      github: 'https://github.com/okutachiblessing/agile-team-analytics',
      live: 'https://github.com/okutachiblessing/agile-team-analytics',
      image: '📊',
      featured: true,
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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-secondary/30 backdrop-blur border border-accent/20 rounded-lg overflow-hidden hover:border-accent/60 transition-all duration-300 card-hover group"
            >
              {/* Project Image/Icon */}
              <div className="h-40 bg-gradient-to-br from-accent/10 to-highlight/10 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                {project.image}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-accent hover:text-highlight transition-colors duration-300"
                    aria-label={`GitHub link for ${project.title}`}
                  >
                    <FaGithub size={18} />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-accent hover:text-highlight transition-colors duration-300"
                    aria-label={`Live link for ${project.title}`}
                  >
                    <FaExternalLinkAlt size={18} />
                    <span>Live</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/okutachiblessing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border-2 border-accent hover:bg-accent/10 text-accent rounded-lg font-semibold transition-all duration-300"
          >
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
