import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import createStore from './../store';
import history from './../store/history';
import Recipes from './../containers/Recipes/Recipes';
import RecipeCreation from './../containers/RecipeCreation/RecipeCreation';
import RecipeEditing from './../containers/RecipeEditing/RecipeEditing';
import RecipeRatingEditing from '../containers/RecipeRatingEditing/RecipeRatingEditing';

const store = createStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/" render={ () => <Redirect to="recipes" /> }/>                     
                        <Route exact path="/recipes/new" component={RecipeCreation} />                     
                        <Route exact path="/recipes/:id" component={RecipeEditing} />                     
                        <Route exact path="/recipes/:id/rating" component={RecipeRatingEditing} />                     
                        <Route exact path="/recipes" component={Recipes} />                     
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default App;