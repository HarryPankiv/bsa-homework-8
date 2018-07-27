import api from '../adapter';

export default {
	fetchAllRecipes: () => {
		return api.makeRequest('/api/recipes', api.requestTypes.GET);
	},
	addRecipe: recipe => {
		return api.makeRequest('/api/recipes', api.requestTypes.POST, recipe);
	},
	updateRecipe: recipe => {
		return api.makeRequest(`/api/recipes/${recipe._id}`, api.requestTypes.PATCH, recipe);
	},
	deleteRecipe: id => {
		return api.makeRequest(`/api/recipes/${id}`, api.requestTypes.DELETE);
	},
	fetchRecipe: id => {
		return api.makeRequest(`/api/recipes/${id}`, api.requestTypes.GET);
	},
	updateRating: recipe => {
		return api.makeRequest(`/api/recipes/${recipe._id}/rating`, api.requestTypes.PATCH, recipe);
	}
}