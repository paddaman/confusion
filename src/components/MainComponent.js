import React, {Component} from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {fetchComments, fetchDishes, fetchPromos, postComment} from '../redux/ActionCreators';
import {actions} from "react-redux-form";
import {CSSTransition, TransitionGroup} from "react-transition-group";
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
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {
        dispatch(fetchDishes())
    },
    resetFeedbackForm: () => {
        dispatch(actions.reset("feedback"))
    },
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
                <DishDetail
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    errorMessage={this.props.dishes.errorMessage}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId))}
                    commentsErrorMessage={this.props.comments.errorMessage}
                    postComment={this.props.postComment}/>
            );
        }

        return (
            <div>
                <Header/>
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch location={this.props.location}>
                            <Route path="/home" component={HomePage}/>
                            <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
                            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                            <Route path="/menu/:dishId" component={DishWithId}/>
                            <Route exact path="/contactus"
                                   component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                            <Route exact path="/videochat" component={WebcamCapture}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));