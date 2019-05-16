import React, { Component } from 'react';
import Error from '../../error/Error';
import Modal from '../../modal/Modal';
import Button from '../../button/Button';
import TeamCard from '../../team-card/TeamCard';
import './teams.scss';

class Teams extends Component {
  state = {
    teams: [],
    error: false,
    loadedTeams: false,
    addTeamData: {
      name: '',
      logo: ''
    }
  }

  componentDidMount() {
    this.getTeams();
  }

  toggleEditTeamModal = (e, teamId, teamName, teamLogo) => {
    console.log('editing', teamName, teamId);
  }

  handleTeamAdd = async (e) => {
    const { addTeamData } = this.state;
    const teamCreated = await this.createTeam(addTeamData);

    if (teamCreated) {
      this.setState({
        addTeamData: {
          name: '',
          logo: ''
        }
      },
        this.getTeams
      );
    }
    else {

    }
  }

  handleTeamDelete = async (e, teamId, teamName) => {
    const data = {
      id: teamId
    };

    if (window.confirm("Are you sure you want to delete team " + teamName + "?")) {
      const deleted = await this.deleteTeam(data);

      if (deleted) {
        this.setState({ loadedTeams: false }, this.getTeams);
      }
      else {
        console.error('problem deleting team');
      }
    }
  }

  handleTeamEdit = async (e, teamId, newName, newLogo) => {
    console.log('edit', teamId, newName, newLogo);
    const data = {
      id: teamId,
      name: newName,
      logo: newLogo
    };

    const edited = await this.editTeam(data);

    if (edited) {
      console.log('EDITED');
      this.setState({ loadedTeams: false }, this.getTeams);
    }
    else {
      console.error('problem updating team');
    }
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    let { addTeamData } = this.state;

    if (name === "team-name") addTeamData.name = value;
    if (name === "team-logo") addTeamData.logo = value;

    this.setState({ addTeamData });
  }

  getTeams = async () => {
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

  editTeam = async data => {
    console.log(JSON.stringify(data));
    try {
      let res = await fetch('http://localhost:3030/teams', {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      let resData = await res.json();

      if (resData.error) {
        let error = new Error();
        error.status = resData.error.status || 500;
        error.message = resData.error.message || "There was an error while attempting to update the team.";
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
              <TeamCard
                key={team.id}
                teamName={team.name}
                teamLogo={team.logo}
                teamId={team.id}
                onDelete={this.handleTeamDelete}
                onEdit={this.handleTeamEdit}
                onToggleModal={this.toggleEditTeamModal}
              />
            )) : null}
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
                    htmlFor="team-logo"
                  >
                    Logo Url
                </label>
                  <input
                    id="team-logo"
                    className="team-add__input-field"
                    type="text"
                    name="team-logo"
                    value={this.state.addTeamData.logo}
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
}

export default Teams;