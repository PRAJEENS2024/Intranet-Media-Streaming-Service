import { useState, useEffect } from 'react';
import axios from '../config/axios';

export const useVideos = (category = null, search = null, page = 1) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page,
          limit: 20
        });

        if (category) params.append('category_id', category);
        if (search) params.append('search', search);

        const response = await axios.get(`/api/videos/browse?${params}`);
        setVideos(response.data.videos);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [category, search, page]);

  return { videos, loading, error };
};

export const useVideoDetail = (videoId) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoId) return;

    const fetchVideo = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/api/videos/info/${videoId}`);
        setVideo(response.data.video);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch video');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  return { video, loading, error };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/categories');
        setCategories(response.data.categories);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useVideoEngagement = (videoId) => {
  const [engagement, setEngagement] = useState({
    isLiked: false,
    likesCount: 0
  });
  const [loading, setLoading] = useState(false);

  const likeVideo = async () => {
    try {
      setLoading(true);
      await axios.post('/api/engagement/like', { videoId });
      setEngagement(prev => ({
        ...prev,
        isLiked: true,
        likesCount: prev.likesCount + 1
      }));
    } catch (err) {
      console.error('Failed to like video:', err);
    } finally {
      setLoading(false);
    }
  };

  const unlikeVideo = async () => {
    try {
      setLoading(true);
      await axios.post('/api/engagement/unlike', { videoId });
      setEngagement(prev => ({
        ...prev,
        isLiked: false,
        likesCount: Math.max(0, prev.likesCount - 1)
      }));
    } catch (err) {
      console.error('Failed to unlike video:', err);
    } finally {
      setLoading(false);
    }
  };

  const recordWatch = async (durationWatched = 0) => {
    try {
      await axios.post('/api/engagement/watch-record', { videoId, durationWatched });
    } catch (err) {
      console.error('Failed to record watch:', err);
    }
  };

  const setContinuePosition = async (lastPosition) => {
    try {
      await axios.post('/api/engagement/continue-position', { videoId, lastPosition });
    } catch (err) {
      console.error('Failed to set continue position:', err);
    }
  };

  return {
    engagement,
    loading,
    likeVideo,
    unlikeVideo,
    recordWatch,
    setContinuePosition
  };
};

export const useWatchHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/engagement/watch-history');
        setHistory(response.data.history);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch watch history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const clearHistory = async () => {
    try {
      await axios.delete('/api/engagement/watch-history');
      setHistory([]);
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
  };

  return { history, loading, error, clearHistory };
};

export const useContinueWatching = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContinueWatching = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/engagement/continue-watching');
        setVideos(response.data.videos);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch continue watching');
      } finally {
        setLoading(false);
      }
    };

    fetchContinueWatching();
  }, []);

  return { videos, loading, error };
};
