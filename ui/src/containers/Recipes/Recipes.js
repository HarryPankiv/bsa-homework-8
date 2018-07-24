import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllRecipes, deleteRecipe } from './RecipesActions';
import { allRecipes, isRecipesFetching } from './RecipesReducer';
import RecipeList from '../../components/RecipeList/RecipeList';
import RecipeListHeader from '../../components/RecipeList/RecipeListHeader'
import EmptyRecipeList from '../../components/RecipeList/EmptyRecipeList';
import RecipeModal from '../../components/RecipeModal/RecipeModal';

class Recipes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeRecipe: null
		}
	}

    componentDidMount() {
        this.props.actions.fetchAllRecipes();
    }

	handleDelete = id => {
		this.props.actions.deleteRecipe(id);
    }
    
    handleEdit = id => {
		this.props.history.push(`/recipes/${id}`)
	}

	handleRecipeCreate = () => {
		this.props.history.push(`/recipes/new`)
	}

    toggleRecipeModal = id => {
        this.setState({
            activeRecipe: this.props.allRecipes.find( r => r._id === id)
        })
    }

    handleModalClose = () => {
        this.toggleRecipeModal(null);
    }

	render() {
		const { isFetching, allRecipes } = this.props 
		const { activeRecipe } = this.state;

		return (
			<div>
                {!allRecipes.length && !isFetching ?
                    <EmptyRecipeList onCreate={this.handleRecipeCreate}/> :
                    <React.Fragment>
                        <RecipeListHeader 
                            onCreate={this.handleRecipeCreate}
                            listLength={allRecipes.length}
                        />
				        <RecipeList 
                            recipes={allRecipes}
                            onView={this.toggleRecipeModal}
                            onDelete={this.handleDelete}
                            onEdit={this.handleEdit}
                        />
                    </React.Fragment>
                }
                <RecipeModal
                    recipe={activeRecipe}
                    onClose={this.handleModalClose}
                />
			</div>
		)
	}
}

Recipes.defaultProps = {
    allRecipes: PropTypes.array,
    isFetching: PropTypes.bool,
    actions: PropTypes.object
}

const mapStateToProps = state => ({
    allRecipes: allRecipes(state),
    isFetching: isRecipesFetching(state)
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ fetchAllRecipes, deleteRecipe }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)