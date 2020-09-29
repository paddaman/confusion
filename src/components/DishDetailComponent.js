import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';


function RenderDish({dish}) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}) {
    if (comments != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (
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
                        )
                    }
                    )}
                </ul>
            </div>
        )
    } else {
        return <div></div>
    }
}

const DishDetail = (props) => {
    console.log('DishDetail Component render is invoked')
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.dish.comments}/>
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