import api from '../adapter';

export default {
	fetchAllRecipes: () => {
		return api.makeRequest('/api/recipes', api.requestTypes.GET);
	},
	addRecipe: recipe => {
		return api.makeRequest('/api/recipes', api.requestTypes.POST);
	},
	updateRecipes: recipe => {
		return api.makeRequest(`/api/recipes/${recipe._id}`, api.requestTypes.PATCH, recipe);
	},
	deleteRecipes: id => {
		return api.makeRequest(`/api/recipes/${id}`, api.requestTypes.DELETE);
	},
	fetchRecipes: id => {
		return api.makeRequest(`/api/recipes/${id}`, api.requestTypes.GET);
	}
}