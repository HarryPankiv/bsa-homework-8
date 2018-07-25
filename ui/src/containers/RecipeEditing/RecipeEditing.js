import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { updateRecipe, fetchRecipe } from '../Recipes/RecipesActions';
import { isRecipesFetching, activeRecipe } from '../Recipes/RecipesReducer';
import RecipeForm from '../../components/RecipeForm/RecipeForm'

class RecipeEditing extends Component {
    constructor(props) {
		super(props);

		this.state = {
			recipeToFetch: null
		}
    }
    
    static getDerivedStateFromProps(props, state) {
        if (state.recipeToFetch !== props.match.params.id) {
            return {
                recipeToFetch: props.match.params.id
            }
        }
        return null;
    }

    componentDidMount() {
        if (this.state.recipeToFetch) {
            this.props.actions.fetchRecipe(this.state.recipeToFetch)
        }
    }

    componentDidUpdate() {
        if (this.props.recipe && (this.state.recipeToFetch !== this.props.recipe._id)) {
            this.props.actions.fetchRecipe(this.state.recipeToFetch);
        }
    }

    handleSubmit = data => {
        this.props.actions.updateRecipe({
            ...this.props.recipe, 
            ...data
        })
    }

    handleCancel = () => {
        this.props.histry.push(`/recipes`);
    }

    render() {
        const { isFetching, recipe } = this.props
        console.log(this.props)
        
        return (
            <div>
                hello
                {
                    !!recipe && <RecipeForm
                        disabled={isFetching}
                        title="Edit recipe"
                        onSubmit={this.handleSubmit}
                        onCancel={this.handleCancel}
                        submitButtonTitle="Update recipe"
                        cancelButtonTitle="Back to recipes"
                        initialValues={recipe}
                    ></RecipeForm>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
	isFetching: isRecipesFetching(state),
	recipe: activeRecipe(state)	
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ updateRecipe, fetchRecipe }, dispatch)
})

RecipeEditing.defaultProps = {
	recipe: PropTypes.object,
	isFetching: PropTypes.bool,
	actions: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEditing)