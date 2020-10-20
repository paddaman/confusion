import React from 'react';
import {Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';
import {Link} from "react-router-dom";
import CommentForm from "./CommentFormComponent";
import {Loading} from "./LoadingComponent";
import {baseUrl} from '../shared/baseUrl';
import {Fade, FadeTransform, Stagger} from "react-animation-components"

function RenderDish({dish}) {
    return (
        <div className="col-12 col-md-5 m-1">
            <FadeTransform in transformProps={{
                exitTransform: "scale(0.5) translateY(-50%)"
            }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );
}

function RenderComments({comments, postComment, dishId}) {
    if (comments != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {comments.map((comment) => {
                                return (
                                    <Fade in>
                                        <li key={comment.id}>
                                            <blockquote className="blockquote">
                                                <p>{comment.comment}</p>
                                                <footer className="blockquote-footer">
                                                    {comment.author} - {new Intl.DateTimeFormat('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: '2-digit'
                                                }).format(new Date(Date.parse(comment.date)))}
                                                </footer>
                                            </blockquote>
                                        </li>
                                    </Fade>
                                )
                            }
                        )}
                    </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        )
    } else {
        return <div><CommentForm/></div>
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    } else if (props.errorMessage) {
        return (
            <div className="container">
                <div className="row">
                    <h4>
                        {props.errorMessage}
                    </h4>
                </div>
            </div>
        );
    } else if (props.dish != null) {
        return (
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/menu">Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {props.dish.name}
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>
                        {props.dish.name}
                    </h3>
                    <hr/>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}
                                    postComment={props.postComment}
                                    dishId={props.dish.id}/>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;