import React from 'react';
import { Button, DishTitle, DishField, Row, Container } from '../../Theme';

export default ({ recipes, onEdit, onDelete, onView, onRate }) => 
    recipes && recipes.map( (recipe, index) => (
        <Container key={index}>
            <DishTitle>{recipe.title}</DishTitle>
            <DishField>{recipe.description}</DishField>
            <DishField>{recipe.rating}</DishField>
            <Row>
                <Button onClick={ () => onDelete && onDelete(recipe._id)}>delet dis</Button>
                <Button onClick={ () => onEdit && onEdit(recipe._id)}>edit dis</Button>
                <Button onClick={ () => onView && onView(recipe._id)}>view dis</Button>
                <Button onClick={ () => onRate && onRate(recipe._id)}>rate dis</Button>
            </Row>
        </Container>
    ))