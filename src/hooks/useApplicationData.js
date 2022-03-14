import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //Updater function on spots for each day
  function updateSpotsForDay(state, appointments) {
    let appointment;
    const currentDay = state.days.find((day, index) => {
      if (state.day === day.name) {
        appointment = index;
        return day;
      }
      return null;
    });

    let spots = 0;
    for (let dayOne of currentDay.appointments) {
      if (appointments[dayOne].interview === null) {
        spots++;
      }
    }

    const days = [...state.days];
    days[appointment] = { ...currentDay, spots: spots };
    return days;
  }

  //function allowing users to book an interview from api data
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      const spotsUpdate = updateSpotsForDay(state, appointments)
      setState({
        ...state,
        days: spotsUpdate,
        appointments
      });
    });
  }

//function allowing users to cancel an interview from api data
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const spotsUpdate = updateSpotsForDay(state, appointments)
      setState({
        ...state,
        days: spotsUpdate,
        appointments
      });
    });
  }

// function that sets the days for each week to be booked
  const setDay = (day) => setState(() => ({ ...state, day }));
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
          setState((prev) => ({
            ...prev,
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data,
          }));
          console.log(all)
        });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}

