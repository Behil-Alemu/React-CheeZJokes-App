// import React from "react";
// import "./Joke.css";

// function Joke({ vote, votes, text, id }) {
//   const upVote = () => vote(id, +1);
//   const downVote = () => vote(id, -1);

//   return (
//     <div className="Joke">
//       <div className="Joke-votearea">
//         <button onClick={upVote}>
//           <i className="fas fa-thumbs-up" />
//         </button>

//         <button onClick={downVote}>
//           <i className="fas fa-thumbs-down" />
//         </button>

//         {votes}
//       </div>

//       <div className="Joke-text">{text}</div>
//     </div>
//   );
// }

// export default Joke;

//################ below class component
import React from "react";
import "./Joke.css";

class Joke extends React.Component {
 // React.Component added 

render(){

  // destructure props from this.props
  const { vote, votes, text, id } = this.props
// move up vote and downVote inside the render 
// using arrow functions makes they are bound to the instance of the component
  const upVote = () => vote(id, +1);
  const downVote = () => vote(id, -1);
  return (
    <div className="Joke">
      <div className="Joke-votearea">
        <button onClick={upVote}>
          <i className="fas fa-thumbs-up" />
        </button>

        <button onClick={downVote}>
          <i className="fas fa-thumbs-down" />
        </button>

        {votes}
      </div>

      <div className="Joke-text">{text}</div>
    </div>
  );
}
}

export default Joke;