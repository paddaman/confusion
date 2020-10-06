import React from "react";

function RenderLeader({leader}) {
    return (
        /*<Media className="row">
            <Media className="col-lg-2 col-md-2 col-sm-12">
                <Media src={leader.image}/>
            </Media>
            <Media body className="col-lg-10 col-md-10 col-sm-12">
                <Media heading>
                    {leader.name}
                </Media>
                <p>{leader.designation}</p>
                <p>{leader.description}</p>
            </Media>
        </Media>*/
        <div className="row">
            <div className="col-lg-2 col-md-2 col-sm-12">
                <img src={leader.image} alt={leader.name}/>
            </div>
            <div className="col-lg-10 col-md-10 col-sm-12">
                <h3>{leader.name}</h3>
                <p>{leader.designation}</p>
                <p>{leader.description}</p>
            </div>
        </div>
    );
}

export default RenderLeader;