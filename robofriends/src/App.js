import React, {Component} from 'react';
import { connect } from 'react-redux'
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Components/Scroll';
import { setSearchField } from './actions'

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}
const mapDispatchToProps = (dispatch) =>
{
    return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots:[],
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> {
            return response.json();
        })
        .then(users => {
            this.setState({ robots: users})
        });
    }



    render() {
        const {searchField, onSearchChange} =this.props;
        const filteredRobots=this.state.robots.filter(robots =>{
            return robots.name.toLowerCase().includes(searchField.toLowerCase())
        })
        if (this.state.robots.length ===0) {
            return <h1>Loading</h1>
        } else {
        return (
            <div className='tc'>
             <h1 style={{color:"Orange"}} className='f2 georgia b'>RoboFriends</h1>
             <h4 style={{color:"white"}}> RoboFriends App is built on React and helps you find Name, E-Mail and Profile Picture of Funny Robots using RoboHash API.</h4>
             <SearchBox searchChange={onSearchChange} />
             <Scroll>
              <CardList robots={filteredRobots} />
             </Scroll>
             </div>
            );
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
