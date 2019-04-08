import React, { Component } from 'react';
import Error from '../../error/Error';
import Modal from '../../modal/Modal';
import './teams.scss';

class Teams extends Component {
  state = {
    teams: [],
    error: false,
    loadedTeams: false,
    addTeamData: {
      name: '',
      imgUrl: ''
    }
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:3030/teams/');
      const jsonData = await res.json();

      if (jsonData.error) {
        let error = new Error();
        error.status = jsonData.error.status || 500;
        error.message = jsonData.error.message || "There was an error fetching the data";
        throw error;
      }
      else {
        setTimeout(() => { // Just for the thrills
          this.setState({ teams: jsonData, loadedTeams: true });
        }, (Math.random() * 1000) + 500);
      }
    }
    catch (err) {
      console.error(err);
      this.setState({ error: err });
    }
  }

  toggleAddTeamModal = (e, data) => {

  }

  handleTeamAdd = async (e) => {
    const { addTeamData } = this.state;
    try {
      let res = await fetch('http://localhost:3030/teams/create', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addTeamData)
      });

      let jsonData = await res.json();
      if (jsonData.error) {
        let error = new Error();
        error.status = jsonData.error.status || 500;
        error.message = jsonData.error.message || "There was an error fetching the data";
        throw error;
      }
      else {
        
      }
      console.log('server response:', jsonData);
    }
    catch(err) {
      console.error(err);
      this.setState({ error: err });
    }
    
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    let { addTeamData } = this.state;

    if (name === "team-name") addTeamData.name = value;
    if (e.target.name === "team-img-url") addTeamData.imgUrl = value;

    this.setState({ addTeamData });
  }

  render() {
    const { teams, loadedTeams, error } = this.state;
    if (error) {
      return <Error message={error.message ? error.message : null} />
    }
    if (loadedTeams) {
      return (
        <React.Fragment>
          <h2 className="page-title">Teams</h2>
          <div className="teams-container">
            {teams.map(team => (
              <Teams.Card
                key={team.id}
                teamName={team.name}
                teamImages={team.images}
              />
            ))}
          </div>

          <Modal onToggle={this.toggleAddTeamModal}
            toggler={({ toggle }) => (
              <button
                className="team-add-btn"
                onClick={toggle}
              >
                +
              </button>
            )}
          >
            <div className="team-add">
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
                    onChange={this.handleInputChange}
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
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="team-add__options">
                <button
                  className="team-add__add-btn"
                  onClick={this.handleTeamAdd}
                >
                  Add
                </button>
              </div>
            </div>
          </Modal>
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
        <img src={teamImage} alt="Team Logo" className="team-card__logo" />
        <p className="team-card__name">{teamName}</p>
      </div>
    );
  };
}

export default Teams;