import React from "react";

export default function Listing(props) {
  return (
    <React.Fragment>
      <div className="container">
        <h1>Recipe Listing</h1>
        {props.data.map((r) => (
          <React.Fragment key={r._id}>
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">{r.title}</h3>
                <h4>Ingredients</h4>
                <ul>
                  {r.ingredients.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
}
