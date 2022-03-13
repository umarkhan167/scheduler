import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";


        function updateSpotsForDay(days, appointments, day) {
          let spotsRemaining = 0;
          days.forEach((element) => {
            if (element.name === day) {
              element.appointments.forEach((microElement) => {
                for (let key in appointments) {
                  if (key == microElement) {
                    if (appointments[key].interview === null) {
                      spotsRemaining++;
                    }
                  }
                }
              });
            }
          });
          const newDays = state.days.map(day => day.name === state.day ? {...day,spots:spotsRemaining} : day)
          return newDays
        }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      setState({ type:SET_INTERVIEW, interview, id});
    });
  }

  function cancelInterview(id) {
    
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({ type:SET_INTERVIEW, interview: null, id});
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
}