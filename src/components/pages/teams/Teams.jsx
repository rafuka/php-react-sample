import React, { Component } from 'react';
import Error from '../../error/Error';
import Modal from '../../modal/Modal';
import Button from '../../button/Button';
import TeamCard from '../../team-card/TeamCard';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import './teams.scss';

class Teams extends Component {
  state = {
    teams: [],
    error: false,
    loadedTeams: false,
    addTeamData: {
      name: '',
      logo: ''
    },
    teamSearch: '',
    searchResult: []
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

  handleSearch = e => {
    let { value } = e.target;
    if (value[0] === ' ') value = value.trim();

    this.setState({ teamSearch: value }, () => this.searchTeams(value))
  }

  searchTeams = value => {
    if (value !== '') {
      const { teams } = this.state;
      const searchResult = teams.filter(team =>
        team.name.toLowerCase().includes(value.toLowerCase())
      );

      this.setState({ searchResult: searchResult });
    }
    else {
      this.setState({ searchResult: [...this.state.teams] });
    }
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
          this.setState({ teams: jsonData, loadedTeams: true, searchResult: jsonData });
        }, (Math.random() * 1000) + 1000);
      }
    }
    catch (err) {
      console.error(err);
      this.setState({ error: err });
    }
  }

  createTeam = async data => {

    try {
      let res = await fetch('http://localhost:3030/teams', {
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
    const { loadedTeams, error, searchResult } = this.state;

    if (error) {
      return <Error message={error.message ? error.message : null} />
    }
    return (
      <main className="page">
        <div className={`loading teams${loadedTeams ? ' done' : ''}`}>
          <span className="loading__figure">
            <Icon className="icon" icon="check" />
          </span>
        </div>
        <div className="page__header">
          <h2 className="page__title">Teams</h2>
          <div className="team-search">
            <input
              id="team-search"
              className="team-search__input"
              name="team-search"
              type="text"
              placeholder="Search for a team"
              value={this.state.teamSearch}
              onChange={this.handleSearch}
            />
            <Icon className="team-search__icon" icon="search" />
          </div>
        </div>

        <div className="teams-container">
          {searchResult.length > 0 ? searchResult.map(team => (
            <TeamCard
              key={team.id}
              teamName={team.name}
              teamLogo={team.logo}
              teamId={team.id}
              onDelete={this.handleTeamDelete}
              onEdit={this.handleTeamEdit}
              onToggleModal={this.toggleEditTeamModal}
            />
          ))
            : "No teams found."}
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
      </main>
    );
  }
}

export default Teams;