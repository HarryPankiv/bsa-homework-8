import { takeLatest, all, call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';
import { push } from 'connected-react-router';
import { arrayOfRecipes } from './RecipesSchema';
import * as constants from './RecipesConstants';
import { recipeAPI } from '../../api';

function* fetchAllRecipes() {
	try {
		const recipes = yield call(recipeAPI.fetchAllRecipes);
		const normalizedData = normalize(recipes.data, arrayOfRecipes);

		yield put({
			type: constants.FETCH_ALL_RECIPES_SUCCESS,
			payload: {
				all: normalizedData.result,
				byId: normalizedData.entities.byId || {}
			}
		})
	} catch (error) {
		yield put({
			type: constants.FETCH_ALL_RECIPES_FAILED
		})
	}
}

function* addRecipe(action) {
	try {
		console.log(action.payload)
		const recipeResponse = yield call(recipeAPI.addRecipe, action.payload);

		yield put({
			type: constants.ADD_RECIPE_SUCCESS,
			payload: {
				...recipeResponse.data
			}
		})

		yield put(push('/recipes'))
	} catch (error) {
		yield put({
			type: constants.ADD_RECIPE_FAILED
		})
	}
} 

function* updateRecipe(action) {
	try {
		yield call(recipeAPI.updateRecipe, action.payload);

		yield put({
			type: constants.UPDATE_RECIPE_SUCCESS,
			payload: action.payload
		})

		yield put(push('/recipes'))
	} catch (error) {
		yield put({
			type: constants.UPDATE_RECIPE_FAILED
		})
	}
} 

function* deleteRecipe(action) {
	try {
		yield call(recipeAPI.deleteRecipe, action.payload.id);

		yield put({
			type: constants.DELETE_RECIPE_SUCCESS,
			payload: {
				id: action.payload.id
			}
		})
	} catch (error) {
		yield put({
			type: constants.DELETE_RECIPE_FAILED
		})
	}
} 

function* fetchRecipe(action) {
	try {
		const req = yield call(recipeAPI.fetchRecipe, action.payload.id);

		yield put({
			type: constants.FETCH_RECIPE_SUCCESS,
			payload: {
				...req.data
			} 
				
		})
	} catch (error) {
		yield put({
			type: constants.FETCH_RECIPE_FAILED
		})
	}
} 

export default function* recipesSaga() {
	yield all([
		takeLatest(constants.FETCH_ALL_RECIPES, fetchAllRecipes),
		takeLatest(constants.ADD_RECIPE, addRecipe),
		takeLatest(constants.UPDATE_RECIPE, updateRecipe),
		takeLatest(constants.DELETE_RECIPE, deleteRecipe),
		takeLatest(constants.FETCH_RECIPE, fetchRecipe)
	])
}
