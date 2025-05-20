const API_BASE_URL = 'http://localhost:8081/api';

export const getProductReviews = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/product/${productId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Échec de la récupération des avis');
    }

    const data = await response.json();
    return Array.isArray(data) ? data : (data.content || []); // Gérer différents formats de réponse
  } catch (error) {
    console.error('Erreur lors de la récupération des avis:', error);
    throw error; // Propager l'erreur pour la gérer dans le composant
  }
};

export const createReview = async (reviewData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(reviewData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Échec de la soumission de l\'avis');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la création de l\'avis:', error);
    throw error;
  }
};