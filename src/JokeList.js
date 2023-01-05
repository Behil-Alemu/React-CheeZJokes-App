// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Joke from "./Joke";
// import "./JokeList.css";

// function JokeList({ numJokesToGet = 10 }) {
//   const [jokes, setJokes] = useState([]);

//   /* get jokes if there are no jokes */

//   useEffect(function() {
//     async function getJokes() {
//       let j = [...jokes];
//       let seenJokes = new Set();
//       try {
//         while (j.length < numJokesToGet) {
//           let res = await axios.get("https://icanhazdadjoke.com", {
//             headers: { Accept: "application/json" }
//           });
//           let { status, ...jokeObj } = res.data;

//           if (!seenJokes.has(jokeObj.id)) {
//             seenJokes.add(jokeObj.id);
//             j.push({ ...jokeObj, votes: 0 });

//           } else {
//             console.error("duplicate found!");
//           }
//         }
//         setJokes(j);
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     if (jokes.length === 0) getJokes();
//   }, [jokes, numJokesToGet]);

//   /* empty joke list and then call getJokes */

//   function generateNewJokes() {
//     setJokes([]);
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   function vote(id, delta) {
//     setJokes(allJokes =>
//       allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
//     );
//   }

//   /* render: either loading spinner or list of sorted jokes. */

// // If b.votes is greater than a.votes, then the function will return a positive value, which will cause b to be sorted before a. If b.votes is less than a.votes, then the function will return a negative value, which will cause a to be sorted before b. If b.votes is equal to a.votes, then the function will return 0, which will leave the order of the elements unchanged.

//   if (jokes.length) {
//     let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
//     console.log(sortedJokes)

//     return (
//       <div className="JokeList">
//         <button className="JokeList-getmore" onClick={generateNewJokes}>
//           Get New Jokes
//         </button>

//         {sortedJokes.map(j => (
//           <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
//         ))}
//       </div>
//     );
//   }

//   return null;

// }

// export default JokeList;

//################ below class component


import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import './JokeList.css';

class JokeList extends Component {
	// initial value is [] and have to use React.Component
	//   constructor(props) {
	//     super(props);
	//     this.state = {
	//       jokes: []
	//     };
	//   }

	state = {
		jokes: []
	};

	componentDidMount() {
		// mount after component rendered
		console.log('mounted first');
		this.getJokes();
	}

	async getJokes() {
		console.log(' then fetch');
		// to refer to the state we need this.state.jokes
		let j = [ ...this.state.jokes ];
		let seenJokes = new Set();
		try {
			////this.props.numJokesToGet refering to the default prop 10
			while (j.length < this.props.numJokesToGet) {
				let res = await axios.get('https://icanhazdadjoke.com', {
					headers: { Accept: 'application/json' }
				});
				let { status, ...jokeObj } = res.data;
				if (!seenJokes.has(jokeObj.id)) {
					seenJokes.add(jokeObj.id);
					j.push({ ...jokeObj, votes: 0 });
				} else {
					console.error('duplicate found!');
				}
			}
			//instead of setJokes we use this.setState
			this.setState({ jokes: j });
		} catch (e) {
			console.log(e);
		}

		//worked fine without the code below
		if (this.state.jokes.length === 0) this.getJokes();
	}
	// intead of placing just an empty array entry has to be like the state on line 87
	generateNewJokes = () => {
		this.setState({ jokes: [] });
	};
	// why doesn't the below code work?
	// function generateNewJokes() {
	//   this.setState({jokes:[]});
	// }
	//When a function is defined this way, the value of this inside the function refers to the global object (window in a web browser), not the component instance.

	vote = (id, delta) => {
		// change it to an object
		this.setState((allJokes) => ({
			jokes: allJokes.jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
		}));
	};

	render() {
		if (this.state.jokes.length) {
			const sortedJokes = [ ...this.state.jokes ].sort((a, b) => b.votes - a.votes);
			
			return (
				<div className="JokeList">
					<button className="JokeList-getmore" onClick={this.generateNewJokes}>
						Get New Jokes
					</button>
					{sortedJokes.map((j) => (
						<Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
					))}
				</div>
			);
		}
		return null;
	}
}
JokeList.defaultProps = {
	numJokesToGet: 10
};

export default JokeList;
