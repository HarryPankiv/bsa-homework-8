import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addRecipe } from '../Recipes/RecipesActions';
import { isRecipesFetching } from '../Recipes/RecipesReducer';
import RecipeForm from '../../components/RecipeForm/RecipeForm'

const Form = styled.form`
	background-color: papayawhip;
	color: palevioletred;
`;

class Recipe extends Component {
	handleSubmit = data => {
		this.props.actions.addRecipe(data)
	}

	handleCancel = () => {
		this.props.history.push('/recipes');
	}

	render() {
		const isFetching = this.props.isFetching;

		return (
			<div>
				<RecipeForm
					disabled={isFetching}
					title="Specify new recipe"
					onSubmit={this.handleSubmit}
					onCancel={this.handleCancel}
					submitButtonTitle="Add recipe"
					cancelButtonTitle="Back to recipes"
					>
					
				</RecipeForm>
			</div>
		)
	}
}


Recipe.defaultProps = {
    isFetching: PropTypes.bool,
    actions: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    isFetching: isRecipesFetching(state)
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ addRecipe }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)