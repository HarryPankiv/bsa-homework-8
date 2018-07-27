import React from 'react';

import { Button, DishTitle, DishField, Row, Container } from '../../Theme';


export default ({onCreate, listLength, onSort }) => (
    <React.Fragment>
        <DishField>{listLength} {listLength === 1 ? 'recipe' : 'recipes'}</DishField>
        <Button onClick={ () => onCreate && onCreate()}>add recipe</Button>
        <Button onClick={ () => onSort && onSort()}>sort recipes</Button>
    </React.Fragment>
)