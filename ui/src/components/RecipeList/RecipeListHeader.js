import React from 'react';

export default ({onCreate, listLength}) => (
    <div>
        <p>{listLength} {listLength === 1 ? 'recipe' : 'recipes'}</p>
        <button onClick={ () => onCreate && onCreate()}>add recipe</button>
    </div>
)