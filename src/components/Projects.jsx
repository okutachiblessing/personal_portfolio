import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronDown } from 'react-icons/fa';

const Projects = () => {
  const [expandedProject, setExpandedProject] = React.useState(null);
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
    {
      title: 'Clinical Data Intelligence Platform',
      description: 'End-to-end data transformation initiative converting Electronic Medical Records (EMR) and clinical datasets into actionable healthcare insights. Led cross-functional Agile teams through data cleaning, quality assurance, and validation cycles using SQL and Python. Delivered interactive Power BI dashboards enabling clinicians to drive evidence-based decision-making. Managed project lifecycle with Jira sprint planning and MS Project resource allocation, reducing data processing time by 68% while achieving 99.8% data accuracy.',
      tech: ['Python', 'Anaconda', 'Jupyter Notebook', 'SQL', 'Power BI', 'Jira', 'MS Project'],
      github: 'https://github.com/okutachiblessing/clinical-data-intelligence',
      live: 'https://github.com/okutachiblessing/clinical-data-intelligence',
      image: '🏥',
      featured: true,
      caseStudy: {
        challenge: [
          'Patient datasets fragmented across multiple legacy EMR systems with inconsistent data formats and missing values',
          'Manual data validation process consumed 40+ hours per week, creating bottlenecks in clinical decision-making',
          'Data quality issues (duplicates, formatting inconsistencies, null values) affecting accuracy of healthcare analytics',
          'Cross-functional teams lacked visibility into data pipeline status and transformation progress',
          'Compliance requirements (HIPAA, data privacy) needed to be enforced throughout the pipeline',
        ],
        solution: [
          'Designed unified data lake architecture ingesting data from 5+ EMR sources using Python/Pandas for ETL',
          'Built automated data cleaning and validation pipelines in Jupyter Notebooks with 99.8% accuracy validation',
          'Implemented SQL-based quality control checks (uniqueness, referential integrity, business rule validation)',
          'Created interactive Power BI dashboards providing real-time data quality metrics and clinical insights',
          'Established Agile sprint cycles (2-week sprints) using Jira with daily standup tracking and weekly demos',
          'Developed comprehensive data lineage and audit trails for compliance documentation',
          'Used MS Project for resource allocation, capacity planning, and cross-team dependency management',
        ],
        results: {
          'Processing Time': '68% reduction (40 hours → 12.8 hours per week)',
          'Data Accuracy': '99.8% validation success rate with automated quality checks',
          'Team Efficiency': '3 team members handling 5x more data transformations',
          'Deployment Frequency': 'Weekly releases via automated CI/CD pipeline',
          'Compliance Score': '100% audit pass with automated evidence collection',
          'Clinician Satisfaction': '94% positive feedback on dashboard usability',
        },
        impact: [
          'Enabled clinicians to make faster evidence-based decisions, improving patient outcomes',
          'Reduced data-related bottlenecks by 85%, allowing analytics team to focus on insights vs. data fixes',
          'Created reusable ETL templates reducing onboarding time for new data sources from 4 weeks to 1 week',
          'Demonstrated Agile best practices (iterative delivery, continuous improvement) to healthcare organization',
          'Foundation for organization-wide data intelligence strategy and future analytics initiatives',
        ],
        metrics: [
          { label: 'Data Sources Integrated', value: '5+' },
          { label: 'Weekly Processing Volume', value: '500K+ Records' },
          { label: 'Data Quality Checks', value: '47' },
          { label: 'Agile Sprints Delivered', value: '12+' },
          { label: 'Team Members Managed', value: '3-5' },
        ],
      },
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
                  {project.caseStudy && (
                    <button
                      onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                      className="flex items-center gap-2 text-accent hover:text-highlight transition-colors duration-300 ml-auto"
                      aria-label={`View case study for ${project.title}`}
                    >
                      <span className="text-sm">Case Study</span>
                      <FaChevronDown size={14} className={`transition-transform ${expandedProject === index ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Case Study Detail Section */}
        {expandedProject !== null && projects[expandedProject]?.caseStudy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-12 bg-gradient-to-br from-secondary/50 to-primary border border-accent/30 rounded-lg overflow-hidden"
          >
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-accent font-semibold text-sm">CASE STUDY</span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
                      {projects[expandedProject].title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setExpandedProject(null)}
                    className="text-highlight hover:text-accent transition-colors"
                    aria-label="Close case study"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-gray-300 text-lg">{projects[expandedProject].description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Challenge Section */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 border-b border-accent/30 pb-3">
                    🎯 Challenge
                  </h4>
                  <ul className="space-y-3">
                    {projects[expandedProject].caseStudy.challenge.map((item, i) => (
                      <li key={i} className="flex gap-3 text-gray-300">
                        <span className="text-accent font-bold min-w-fit">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution Section */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 border-b border-accent/30 pb-3">
                    💡 Solution
                  </h4>
                  <ul className="space-y-3">
                    {projects[expandedProject].caseStudy.solution.map((item, i) => (
                      <li key={i} className="flex gap-3 text-gray-300">
                        <span className="text-highlight font-bold min-w-fit">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Results Section */}
              <div className="mt-8 pt-8 border-t border-accent/20">
                <h4 className="text-xl font-bold text-white mb-6 border-b border-accent/30 pb-3">
                  📊 Results
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(projects[expandedProject].caseStudy.results).map(([key, value], i) => (
                    <div key={i} className="bg-secondary/50 rounded-lg p-4 border border-accent/20">
                      <p className="text-gray-400 text-sm font-semibold mb-2">{key}</p>
                      <p className="text-2xl font-bold text-accent">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Section */}
              <div className="mt-8 pt-8 border-t border-accent/20">
                <h4 className="text-xl font-bold text-white mb-4 border-b border-accent/30 pb-3">
                  🚀 Business Impact
                </h4>
                <ul className="grid md:grid-cols-2 gap-4">
                  {projects[expandedProject].caseStudy.impact.map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-300">
                      <span className="text-accent font-bold">⭐</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics Section */}
              <div className="mt-8 pt-8 border-t border-accent/20">
                <h4 className="text-xl font-bold text-white mb-6">📈 Key Metrics</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {projects[expandedProject].caseStudy.metrics.map((metric, i) => (
                    <div key={i} className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
                      <p className="text-2xl font-bold text-highlight">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div className="mt-8 pt-8 border-t border-accent/20">
                <h4 className="text-xl font-bold text-white mb-4">🛠️ Technologies & Tools</h4>
                <div className="flex flex-wrap gap-3">
                  {projects[expandedProject].tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-accent/20 text-accent font-semibold rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

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
