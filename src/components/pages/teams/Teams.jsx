import React, { Component } from 'react';
import Error from '../../error/Error';
import Modal from '../../modal/Modal';
import Button from '../../button/Button';
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

  componentDidMount() {
    this.getTeams();
  }

  toggleAddTeamModal = (e, data) => {

  }

  handleTeamAdd = async (e) => {
    const { addTeamData } = this.state;
    const teamCreated = await this.createTeam(addTeamData);

    if (teamCreated) {
      console.log(teamCreated.success);

      this.setState({
        addTeamData: {
          name: '',
          imgUrl: ''
        }
      },
        this.getTeams
      );
    }
  }

  handleTeamDelete = async (e, teamId, teamName) => {
    
    const data = {
      teamId: teamId
    };
    console.log('data', teamId);
    if (window.confirm("Are you sure you want to delete team " + teamName + "?")) {
      const deleted = await this.deleteTeam(data);

      if (deleted) { 
        console.log('BOOOOM');
        this.setState({ loadedTeams: false}, this.getTeams);
      }
      else {
        console.error('problem deleting team');
      }
    }
  }

  handleTeamEdit = (e, teamId) => {
    console.log('bam', teamId);
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    let { addTeamData } = this.state;

    if (name === "team-name") addTeamData.name = value;
    if (e.target.name === "team-img-url") addTeamData.imgUrl = value;

    this.setState({ addTeamData });
  }

  getTeams = async () => {
    try {
      const res = await fetch('http://localhost:3030/teams/');
      const jsonData = await res.json();
      console.log('teams', jsonData, 'type', typeof jsonData);
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

  createTeam = async data => {
    try {
      let res = await fetch('http://localhost:3030/teams/create', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      let jsonData = await res.json();

      if (jsonData.error) {
        let error = new Error();
        error.status = jsonData.error.status || 500;
        error.message = jsonData.error.message || "There was an error fetching the data";
        throw error;
      }
      else {
        return jsonData;
      }
    }
    catch (err) {
      console.error(err);
      this.setState({ error: err });
    }
  }

  deleteTeam = async data => {
    console.log(JSON.stringify(data));
    try {
      let res = await fetch('http://localhost:3030/teams', {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      let resData = await res.json();

      if (resData.error) {
        let error = new Error();
        error.status = resData.error.status || 500;
        error.message = resData.error.message || "There was an error while attempting to delete the team.";
        throw error;
      }
      else {
        return resData;
      }
    }
    catch (err) {
      console.error(err);
      this.setState({ error: err });
    }
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
            {teams.length > 0 ? teams.map(team => (
              <Teams.Card
                key={team.id}
                teamName={team.name}
                teamImages={team.images}
                teamId={team.id}
                onDelete={this.handleTeamDelete}
                onEdit={this.handleTeamEdit}
              />
            )): null}
          </div>

          <Modal onToggle={this.toggleAddTeamModal}
            toggler={({ toggle }) => (
              <Button
                className="team-add-btn"
                onClick={toggle}
                icon="plus"
                rounded
              />
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
                    Team Name (required)
                </label>
                  <input
                    id="team-name"
                    className="team-add__input-field"
                    type="text"
                    name="team-name"
                    value={this.state.addTeamData.name}
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
                    value={this.state.addTeamData.imgUrl}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="team-add__options">
                <Button
                  className="team-add__add-btn"
                  text="Add"
                  icon="plus"
                  onClick={this.handleTeamAdd}
                />
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
    const {
      teamName,
      teamImages,
      teamId,
      onDelete,
      onEdit
    } = props;

    const teamImage = teamImages && teamImages.length > 0
      ? teamImages[0]
      : './football.png';

    return (
      <div className="team-card-wrapper">
        <div className="team-card">
          <div className="front">
            <img src={teamImage} alt="Team Logo" className="team-card__logo" />
            <p className="team-card__name">{teamName}</p>
          </div>
          <div className="back">
            <div className="team-card__info">
              this is some info
            </div>
            <div className="team-card__options">
              <Button
                className="delete-btn"
                text="Delete"
                danger
                icon="trash"
                onClick={e => onDelete(e, teamId, teamName)}
              />
              <Button
                className="edit-btn"
                text="Edit"
                icon="edit"
                onClick={e => onEdit(e, teamId)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Teams;