import React from 'react';

export default ({recipe, onClose}) => (
    recipe ? <div>
        { recipe.title }
        { recipe.description }
        <button onClick={ () => onClose && onClose()}>close</button>
    </div> : null
)