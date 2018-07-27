import React from 'react';

export default ({onCreate, listLength, onSort }) => (
    <div>
        <p>{listLength} {listLength === 1 ? 'recipe' : 'recipes'}</p>
        <button onClick={ () => onCreate && onCreate()}>add recipe</button>
        <button onClick={ () => onSort && onSort()}>sort recipes</button>
    </div>
)