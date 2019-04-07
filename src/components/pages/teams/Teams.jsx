import React, { Component } from 'react';
import Error from '../../error/Error';
import './teams.scss';

class Teams extends Component {
  state = {
    teams: [],
    error: false,
    loadedTeams: false,
    modalOpen: false
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:3030/teams/');
      const jsonData = await res.json();

      if (jsonData.error) {
        console.log(jsonData);
        let error = new Error();
        error.status = jsonData.error.status || 500;
        error.message = jsonData.error.message || "There was an error fetching the data";
        console.log()
        throw error;
      }
      else {
        setTimeout(()=>{ // Just for the thrills
          this.setState({ teams: jsonData, loadedTeams: true });
        }, (Math.random() * 1000) + 500);
      }
    }
    catch(err) {
      console.error(err);
      this.setState({ error: err });
    }
  }

  toggleAddModal = e => {
    e.preventDefault();
    let visible = this.state.modalOpen;
    this.setState({ modalOpen: !visible });
  }

  handleAdd = async (e, data) => {
    console.log('Adding!');
    console.log(data);
    let res = await fetch('http://localhost:3030/teams/create', {

    });
  }

  render() {
    const { teams, loadedTeams, error } = this.state;
    if (error) {
      return <Error message={error.message ? error.message : null} />
    }
    if (loadedTeams) {
      const teamsWithImages = teams.with_images;
      const twiKeys = Object.keys(teamsWithImages);
      const teamsWithoutImages = teams.no_images;

      return (
        <React.Fragment>
          <h2 className="page-title">Teams</h2>
          <div className="teams-container">
          {twiKeys.map(key => (
            <Teams.Card
              key={key}
              teamName={teamsWithImages[key].name}
              teamImages={teamsWithImages[key].images}
            />
          ))}
          {teamsWithoutImages.map((teamName, idx) => (
            <Teams.Card
              key={idx}
              teamName={teamName}
            />
          ))}
          </div>
          <Teams.Add
            visible={this.state.modalOpen}
            handleAdd={this.handleAdd}
            handleToggle={this.toggleAddModal}
          />
        </React.Fragment>
      );
    }
    else {
      return (
        <div className="loading">
          <p>Loading teams...</p>
        </div>
      );
    }
  }

  static Card = props => {
    const { teamName, teamImages } = props;
    const teamImage = teamImages && teamImages.length > 0
    ? teamImages[0]
    : './football.png';

    return (
      <div className="team-card">
        <img src={teamImage} alt="Team Logo" className="team-card__logo"/>
        <p className="team-card__name">{teamName}</p>
      </div>
    );
  };

  static Add = props => {
    let modalClasses = ['team-add__modal'];
    if (props.visible) modalClasses.push('visible');
    
    let data = {  // Fakey state?
      teamName: '',
      teamImgUrl: ''
    }

    const handleInputChange = e => {
      if (e.target.name === "team-name") {
        data.teamName = e.target.value;
        console.log(data.teamName);
      }

      if (e.target.name === "team-img-url") {
        data.teamImgUrl = e.target.value;
        console.log(data.teamImgUrl);
      }
    }

    return (
      <div className="team-add">
        <button
          className="team-add__btn"
          onClick={props.handleToggle}
        >
          +
        </button>
        <div className={modalClasses.join(' ')}>
          <div className="team-add__modal-container">
            <p className="team-add__title">Adding new team</p>
            <div className="team-add__data">
              <div className="team-add__input">
                <label
                  className="team-add__input-label"
                  htmlFor="team-name"
                >
                  Team Name
                </label>
                <input
                  id="team-name"
                  className="team-add__input-field"
                  type="text"
                  name="team-name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="team-add__input">
                <label
                  className="team-add__input-label"
                  htmlFor="team-img-url"
                >
                  Logo Url
                </label>
                <input
                  id="team-img-url"
                  className="team-add__input-field"
                  type="text"
                  name="team-img-url"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="team-add__options">
              <button
                className="team-add__cancel"
                onClick={props.handleToggle}
              >
                Cancel
              </button>
              <button
                className="team-add__add"
                onClick={(e) => props.handleAdd(e, data)}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Teams;