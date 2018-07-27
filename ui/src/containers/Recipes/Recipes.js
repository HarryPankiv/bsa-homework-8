import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'; 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllRecipes, deleteRecipe, updateRating } from './RecipesActions';
import { allRecipes, isRecipesFetching } from './RecipesReducer';
import RecipeList from '../../components/RecipeList/RecipeList';
import RecipeListHeader from '../../components/RecipeList/RecipeListHeader'
import EmptyRecipeList from '../../components/RecipeList/EmptyRecipeList';
import RecipeModal from '../../components/RecipeModal/RecipeModal';
import { Title, Row } from "../../Theme";


class Recipes extends Component {
	constructor(props) {
		super(props);

		this.state = {
            activeRecipe: null,
            searchQuery: '',
            recipes: []
        }
        
        this.handleSort = this.handleSort.bind(this)
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
    
    handleRating = id => {
		this.props.history.push(`/recipes/${id}/rating`)
	}

    handleSearchChange = (e) => {
        this.setState({searchQuery: e.target.value})
        let newList = this.props.allRecipes.filter( el => {
            return el.title.includes(e.target.value);
        })
        this.setState({recipes: newList})
    }
    
    handleUpdateRating = (recipe) => {
        this.props.actions.updateRating(recipe);
    }

    toggleRecipeModal = id => {
        this.setState({
            activeRecipe: this.props.allRecipes.find( r => r._id === id)
        })
    }

    handleModalClose = () => {
        this.toggleRecipeModal(null);
    }

    handleSort() {
        let newlist = this.props.allRecipes.sort( (a, b) => {
            return b.rating-a.rating;
        })
        this.setState({recipes: newlist})
    }

	render() {
		const { isFetching, allRecipes } = this.props 
        const { activeRecipe } = this.state;

		return (
			<div>
                {!allRecipes.length && !isFetching ?
                    <EmptyRecipeList onCreate={this.handleRecipeCreate}/> :
                    <React.Fragment>
                        <Row>
                            <Title type="text" 
                                placeholder="search..." 
                                onChange={this.handleSearchChange} 
                                value={this.state.searchQuery}
                            />

                            <RecipeListHeader 
                                onCreate={this.handleRecipeCreate}
                                listLength={allRecipes.length}
                                onSort={this.handleSort}
                            />
                        </Row>
                        

                        {
                            this.state.searchQuery.length > 0 ? 
                            <RecipeList 
                                recipes={this.state.recipes}
                                onView={this.toggleRecipeModal}
                                onDelete={this.handleDelete}
                                onEdit={this.handleEdit}
                                onRate={this.handleRating}
                            /> :
                            <RecipeList 
                                recipes={allRecipes}
                                onUpdateRating={this.handleUpdateRating}
                                onView={this.toggleRecipeModal}
                                onDelete={this.handleDelete}
                                onRate={this.handleRating}
                                onEdit={this.handleEdit}
                            />
                        }
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
    actions: bindActionCreators({ fetchAllRecipes, deleteRecipe, updateRating }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)