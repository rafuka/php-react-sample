import React, { Component } from 'react';
import './calendar.scss';

class Calendar extends Component {
  state = {
    calendar: [],
    error: false
  }

  componentDidMount() {
    fetch('http://localhost:3030/calendar')
    .then(res => res.json())
    .then(jsonData => {
      this.setState({ calendar: jsonData });
    }).catch(err => {
      this.setState({ error: err });
    });
  }

  render() {
    return (
      <main className="page">
        <div className="page__header">
          <h2 className="pagetitle">Calendar</h2>
        </div>
        <div className="calendar">
        {this.state.calendar.map((dayMatches, num) =>(
          <Calendar.Day key={num} matches={dayMatches} dayNum={num + 1}/>
        ))}
        </div>
      </main>
    );
  }

  static Day = props => {
    const { matches, dayNum } = props;
    return (
      <article className="calendar__day">
        <h3 className="calendar__day-title">Day {dayNum}</h3>
        <div className="calendar__day-matches">
        {matches.map((match, idx) => (
          <div key={idx} className="calendar__match">
            <div className={`calendar__team left${match[0] === "Resting" ? " resting" : ''}`}>{match[0]}</div>
            <div className="calendar__team right">{match[1]}</div>
          </div>
        ))}
        </div>
      </article>
    );
  }
}
     
export default Calendar;