import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Youtube } from 'lucide-react'
import { motion } from 'framer-motion'
import { api } from '../lib/api'

const Motion = motion

const ExerciseDetail = () => {
  const { id } = useParams()
  const [exercise, setExercise] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await api.get(`/exercises/id/${id}`)
        setExercise(response.data)
      } catch (error) {
        console.error("Error fetching exercise:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchExercise()
    window.scrollTo(0, 0)
  }, [id])

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="spinner"></div>
        <h2 style={{ fontFamily: "Teko", color: "var(--primary)" }}>
          INITIALIZING SEQUENCE...
        </h2>
      </div>
    )
  }

  if (!exercise) {
    return (
      <div className="loading-wrapper">
        <h2 style={{ fontFamily: "Teko", color: "#ff2e63" }}>
          SYSTEM OVERRIDE: EXERCISE NOT LOGGED
        </h2>

        <Link to="/" className="btn-primary" style={{ marginTop: "20px" }}>
          <ArrowLeft size={20} /> ABORT TO HOME
        </Link>
      </div>
    )
  }

  return (
    <Motion.main
      className="detail-layout"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link to="/" className="nav-back">
        <ArrowLeft size={20} /> RETURN TO HOME
      </Link>

      <div className="detail-hero-section">

        <Motion.div
          className="detail-img-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={exercise.image}
            alt={exercise.name}
            className="detail-img"
          />
        </Motion.div>

        <Motion.div
          className="detail-info-wrapper"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="detail-title">{exercise.name}</h1>

          <p className="detail-desc">{exercise.description}</p>

          <div style={{ marginBottom: "2.5rem" }}>
            <h3 className="detail-target-label">PRIMARY TARGET:</h3>

            <div className="muscle-tags">
              {(exercise.musclesAffected || []).map(muscle => (
                <span key={`${exercise.id}-${muscle}`} className="tag">
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          {exercise.ytLink && (
            <a
              href={exercise.ytLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Youtube size={24} />
              ENGAGE TUTORIAL
            </a>
          )}

        </Motion.div>
      </div>

      <div className="steps-container">

        <Motion.h2
          className="steps-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          EXECUTION PROTOCOL
        </Motion.h2>

        <div className="steps-list">
          {(exercise.steps || []).map((step, idx) => (
            <Motion.div
              key={idx}
              className="step-row"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
            >
              <div className="step-number">0{idx + 1}</div>
              <div className="step-text">{step}</div>
            </Motion.div>
          ))}
        </div>

      </div>
    </Motion.main>
  )
}

export default ExerciseDetail