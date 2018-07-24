import React from 'react';
import styled from 'styled-components';

export default ({ onCreate }) => (
    <React.Fragment>
        <h3>Add some recipes, bruh</h3>
        <button onClick={ () => onCreate && onCreate() }>add recipe</button>
    </React.Fragment>
)