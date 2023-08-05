import React from "react";

const Home = () => {
  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="row">
          <div className="col text-center mt-5">
            <img
              width="50%"
              src="https://hybridheroes.de/blog/content/images/2022/03/redux-toolkit-1400.jpg"
              alt="REDUX"
            />
            <p className="h3 display-3">
              Crash Course <span className="fw-bold">2022</span>
            </p>
            <button>Add AntD</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
