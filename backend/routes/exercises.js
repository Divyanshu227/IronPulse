const express = require('express');
const router = express.Router();
const axios = require('axios');

const apiClient = axios.create({
  baseURL: process.env.GYMBASE_API_URL,
  headers: {
    'x-api-key': process.env.GYMBASE_API_KEY
  }
});

const exercisesPath = (path = '') => `/api/exercises${path}`;

// Proxy to get all exercises
router.get('/', async (req, res) => {
  try {
    const response = await apiClient.get(exercisesPath());
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching exercises:', error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Failed to fetch exercises' });
  }
});

// Proxy to get an exercise by ID
router.get('/id/:id', async (req, res) => {
  try {
    const response = await apiClient.get(exercisesPath(`/id/${req.params.id}`));
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Failed to fetch exercise by ID' });
  }
});

// Proxy to get an exercise by name
router.get('/name/:name', async (req, res) => {
  try {
    const response = await apiClient.get(exercisesPath(`/name/${req.params.name}`));
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Failed to fetch exercise by name' });
  }
});

// Proxy to get exercises by muscle
router.get('/muscle/:muscle', async (req, res) => {
  try {
    const response = await apiClient.get(exercisesPath(`/muscle/${req.params.muscle}`));
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Failed to fetch exercises by muscle' });
  }
});

module.exports = router;
