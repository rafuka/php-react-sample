import React, { Component } from 'react';
import Modal from '../modal/Modal';
import Button from '../button/Button';
import './team-card.scss';

class TeamCard extends Component {
  state = {
    newTeamName: this.props.teamName,
    newTeamLogo: this.props.teamLogo
  }

  handleInputChange = e => {
    const { name, value } = e.target;

    if (name === "edit-team-name") {
      this.setState({ newTeamName: value });
    }
    else if (name === "edit-team-logo") {
      this.setState({ newTeamLogo: value });
    }
  }

  render() {
    const {
      teamName,
      teamId,
      onDelete,
      onToggleModal,
      onEdit
    } = this.props;

    const teamLogo = this.props.teamLogo || './football.png';
  
    return (
      <Modal onToggle={e => onToggleModal(e, teamId, teamName, teamLogo)}
        toggler={({ toggle }) => (
          <div className="team-card-wrapper">
            <div className="team-card">
              <div className="front">
                <img src={teamLogo} alt="Team Logo" className="team-card__logo" />
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
                    onClick={toggle}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      >
        <div className="team-add">
          <p className="team-add__title">Editing team</p>
          <div className="team-add__data">
            <div className="team-add__input">
              <label
                className="team-add__input-label"
                htmlFor="edit-team-name"
              >
                Team Name (required)
                </label>
              <input
                id="edit-team-name"
                className="team-add__input-field"
                type="text"
                name="edit-team-name"
                value={this.state.newTeamName}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="team-add__input">
              <label
                className="team-add__input-label"
                htmlFor="edit-team-logo"
              >
                Logo Url
              </label>
              <input
                id="edit-team-logo"
                className="team-add__input-field"
                type="text"
                name="edit-team-logo"
                value={this.state.newTeamLogo}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="team-add__options">
            <Button
              className="edit-btn"
              text="Save Changes"
              icon="check"
              onClick={e => onEdit(e, teamId, this.state.newTeamName, this.state.newTeamLogo)}
            />
          </div>
        </div>
      </Modal>
    );
  }
}
 
export default TeamCard;