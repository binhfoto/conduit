import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

// pages
import Home from './Home';
import Register from './Register';
import SignIn from './SignIn';
import Article from './Article';
import EditArticle from './EditArticle';
import Settings from './Settings';

import Token from './services/token';
import Api from './services/api';
import withProps from './hocs/withProps';

class RealworldApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            loading: true
        };

        this.setUser = this.setUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    setUser(user) {
        this.setState({user});
    }

    removeUser() {
        this.setState({user: undefined});
    }

    componentDidMount() {
        let token = Token.get();
        if (token) {
            Api
                .currentUser(token)
                .then(user => {
                    this.setState({
                        user,
                        loading: false
                    });
                });
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {

        console.log('RealApp render');

        const   {user, loading} = this.state,
                setUser = this.setUser,
                removeUser = this.removeUser;

        return (
            <div>
                <Header user={user} loading={loading}/>
                <div className="content">
                    <Switch>
                        <Route path="/" exact   component={Home} />
                        <Route path="/login"    component={withProps({setUser})(SignIn)} />
                        <Route path="/settings" component={withProps({user, removeUser})(Settings)} />
                        <Route path="/editor"   component={EditArticle} />
                        <Redirect to="/" />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

export default RealworldApp;