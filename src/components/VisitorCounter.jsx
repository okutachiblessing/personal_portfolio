import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_WORKER_URL || 'https://api.example.com'}/visitors`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setVisitorCount(data.count || 0);
        }
      } catch (error) {
        console.error('Failed to fetch visitor count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed bottom-4 right-4 bg-secondary/80 backdrop-blur border border-accent/30 rounded-lg px-4 py-3 text-sm text-gray-300"
    >
      <p>
        👋 Visitors: <span className="text-accent font-bold">{loading ? '...' : visitorCount}</span>
      </p>
    </motion.div>
  );
};

export default VisitorCounter;
