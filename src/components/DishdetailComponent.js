import React, {Component} from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';

class Dishdetail extends Component {

    constructor(props) {
        super(props)
    }

    renderDish(dish) {
        if (dish != null) {
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
        } else {
            return (
                <div></div>
            );
        }
    }

    renderComments(dish) {
        if (dish != null) {

            const comments = dish.comments.map((comment) => {
                return (
                    <li key={comment.id}>
                        <blockquote className="blockquote">
                            <p>
                                {comment.comment}
                            </p>
                            <footer className="blockquote-footer">
                                {comment.author} - {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </footer>
                        </blockquote>
                    </li>
                );
            });

            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>
                        Comments
                    </h4>
                    <ul className="list-unstyled">
                        {comments}
                    </ul>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    {this.renderDish(this.props.dish)}
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
        );

    };
}

export default Dishdetail;