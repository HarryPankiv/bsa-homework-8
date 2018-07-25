import React from 'react';

export default ({ recipes, onEdit, onDelete, onView }) => 
    recipes && recipes.map( (recipe, index) => (
        <div key={index}>
            <button onClick={ () => onDelete && onDelete(recipe._id)}>delet dis</button>
            <button onClick={ () => onEdit && onEdit(recipe._id)}>edit dis</button>
            <button onClick={ () => onView && onView(recipe._id)}>view dis</button>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
        </div>
    ))