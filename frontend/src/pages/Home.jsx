import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/api';

const Motion = motion;

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await api.get('/exercises');
        if (!Array.isArray(response.data)) {
          throw new Error('Exercise API returned an unexpected response.');
        }

        setExercises(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching exercises:', error);
        setError('EXERCISE FEED OFFLINE');
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const filteredExercises = exercises.filter((ex) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = ex.name.toLowerCase().includes(query);
    const muscleMatch = (ex.musclesAffected || []).some((m) =>
      m.toLowerCase().includes(query)
    );
    return nameMatch || muscleMatch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <main>
      <section className="hero-section">
        <Motion.h1 
          className="main-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Master Your <span className="highlight">Movement</span>
        </Motion.h1>
        <Motion.p 
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore expert-curated exercises designed to maximize performance and build your ultimate physique.
        </Motion.p>

        <Motion.div 
          className="search-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Search size={22} className="search-icon" />
          <input
            type="text"
            placeholder="Search by exercise or target muscle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </Motion.div>
      </section>

      {loading ? (
        <div className="loading-wrapper">
          <div className="spinner"></div>
          <h2 style={{ fontFamily: 'Teko', color: 'var(--primary)'}}>LOAD PHASE INITIALIZING...</h2>
        </div>
      ) : error ? (
        <div className="loading-wrapper">
          <h2 style={{ fontFamily: 'Teko', color: '#ff2e63' }}>{error}</h2>
        </div>
      ) : (
        <Motion.div 
          className="grid-container"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {filteredExercises.map((exercise) => (
              <Motion.div 
                key={exercise.id} 
                variants={itemVariants} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/exercise/${exercise.id}`} className="exercise-card">
                  <div className="card-img-container">
                    <img src={exercise.image} alt={exercise.name} className="card-img" />
                    <div className="card-img-overlay"></div>
                  </div>
                  <div className="card-info">
                    <h3 className="card-title">{exercise.name}</h3>
                    <div className="muscle-tags">
                      {(exercise.musclesAffected || []).map((muscle) => (
                        <span key={`${exercise.id}-${muscle}`} className="tag">
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Motion.div>
            ))}
          </AnimatePresence>

          {filteredExercises.length === 0 && (
            <Motion.div 
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              NO EXERCISES FOUND FOR "{searchQuery.toUpperCase()}"
            </Motion.div>
          )}
        </Motion.div>
      )}
    </main>
  );
};

export default Home;
