import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('All fields are required');
      }

      // Create FormData for Web3Forms
      const form = new FormData();
      form.append('access_key', 'bfa326d0-3b49-4894-9196-1d0c18c3483a');
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('subject', formData.subject);
      form.append('message', formData.message);
      form.append('from_name', 'Blessing Portfolio Contact');
      form.append('redirect', window.location.href);

      // Submit directly to Web3Forms with redirect
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent"
        >
          Get In Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 mb-12"
        >
          Have a project in mind or want to collaborate? Let's talk!
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-secondary/30 backdrop-blur border border-accent/20 rounded-lg p-8 space-y-6"
        >
          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-500/20 border border-green-500/50 text-green-300 rounded-lg"
            >
              ✓ Message sent successfully! I'll get back to you soon.
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg"
            >
              ✗ {error}
            </motion.div>
          )}

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-white font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full px-4 py-3 bg-secondary/50 border border-accent/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors duration-300"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-white font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 bg-secondary/50 border border-accent/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors duration-300"
            />
          </div>

          {/* Subject Input */}
          <div>
            <label htmlFor="subject" className="block text-white font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Message subject"
              required
              className="w-full px-4 py-3 bg-secondary/50 border border-accent/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors duration-300"
            />
          </div>

          {/* Message Input */}
          <div>
            <label htmlFor="message" className="block text-white font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message..."
              rows="5"
              required
              className="w-full px-4 py-3 bg-secondary/50 border border-accent/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-3 bg-accent hover:bg-highlight disabled:opacity-50 text-white rounded-lg font-semibold transition-all duration-300 glow"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>

        {/* Resume Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="/resume.pdf"
            download="Blessing_Ele_Agbonkpolor_Resume.pdf"
            className="px-8 py-3 bg-accent hover:bg-highlight text-black rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
          >
            <span>📄 Download Resume</span>
          </a>
          <a
            href="https://linkedin.com/in/blessingagbonkpolor"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-accent hover:bg-accent/10 text-accent rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
          >
            <span>🔗 LinkedIn Profile</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
