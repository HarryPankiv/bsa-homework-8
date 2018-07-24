import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import createStore from '../store';
import history from '../store/history';
import Recipes from '../containers/Recipes/Recipes';
import RecipeCreation from '../containers/RecipeCreation/RecipeCreation';
import RecipeEditing from '../containers/RecipeEditing/RecipeEditing';

const store = createStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/" render={ () => <Redirect to="recipes" /> }/>                     
                        <Route path="/recipes/new" component={RecipeCreation} />                     
                        <Route path="/recipes/:id" component={RecipeEditing} />                     
                        <Route path="/recipes" component={Recipes} />                     
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default App;