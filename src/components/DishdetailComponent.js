import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

    constructor(props) {
        super(props)
    }

    renderDish(selectedDish) {
        if (selectedDish != null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={selectedDish.image} alt={selectedDish.name} />
                        <CardBody>
                            <CardTitle>{selectedDish.name}</CardTitle>
                            <CardText>{selectedDish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    renderComments(selectedDish) {
        if (selectedDish != null) {

            const comments = selectedDish.comments.map((comment) => {
                return (
                    <li key={comment.id}>
                        <blockquote className="blockquote">
                            <p>
                                {comment.comment}
                            </p>
                            <footer className="blockquote-footer">
                                {comment.author}, {comment.date}
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
        }
        else {
            return (
                <div></div>
            );
        }
    }

    render() {
        const selectedDish = this.props.selectedDish;

        return (
            <div className="row">
                {this.renderDish(selectedDish)}
                {this.renderComments(selectedDish)}
            </div>
        );

    };
}

export default Dishdetail;