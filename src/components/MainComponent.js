import React, {Component} from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import {Switch, Route, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {addComment, fetchDishes, fetchComments, fetchPromos} from '../redux/ActionCreators';
import {actions} from "react-redux-form";
import WebcamCapture from "./WebcamComponent";

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset("feedback"))},
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos())
})

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render() {
        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                      dishesLoading={this.props.dishes.isLoading}
                      dishesErrorMessage={this.props.dishes.errorMessage}
                      promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                      promotionLoading={this.props.promotions.isLoading}
                      promotionErrorMessage={this.props.promotions.errorMessage}
                      leader={this.props.leaders.filter((leader) => leader.featured)[0]}/>
            );
        };

        const DishWithId = ({match}) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                            dishesLoading={this.props.dishes.isLoading}
                            errorMessage={this.props.dishes.errorMessage}
                            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId))}
                            commentsErrorMessage={this.props.comments.errorMessage}
                            addComment={this.props.addComment}/>
            );
        }

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                    <Route path="/menu/:dishId" component={DishWithId}/>
                    <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                    <Route exact path="/videochat" component={WebcamCapture}/>
                    <Redirect to="/home"/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));