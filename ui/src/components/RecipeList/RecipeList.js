import React from 'react';

export default ({ recipes, onEdit, onDelete, onView, onRate }) => 
    recipes && recipes.map( (recipe, index) => (
        <div key={index}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <p>{recipe.rating}</p>
            <button onClick={ () => onDelete && onDelete(recipe._id)}>delet dis</button>
            <button onClick={ () => onEdit && onEdit(recipe._id)}>edit dis</button>
            <button onClick={ () => onView && onView(recipe._id)}>view dis</button>
            <button onClick={ () => onRate && onRate(recipe._id)}>rate dis</button>
        </div>
    ))