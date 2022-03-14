
//goes through state array, days object and appointments object
//match appointments given in days object to the ones in appointments object
export function getAppointmentsForDay(state, day) {
  const daysArr = [];
  const days = state.days;
  const appointments = state.appointments;

  days.map((dayObj) => {
    if (dayObj.name === day) {
      const apntArr = dayObj.appointments;
      return apntArr.map((app) => {
        return daysArr.push(appointments[app]);
      });
    }
    return null
  });
  return daysArr;
}

export function getInterview(state, interview) {
  if (!interview) return null;

  const student = interview.student;
  const intId = interview.interviewer;

  const interviewer = state.interviewers[intId];

  if (interviewer) {
    return {
      student,
      interviewer,
    };
  }
}

export function getInterviewersForDay(state, day) {
  const intArray = [];
  const days = state.days;
  const interviewers = state.interviewers;

  days.map((dayObj) => {
    if (dayObj.name === day) {
      const intArry = dayObj.interviewers;

      return intArry.map((int) => {
        return intArray.push(interviewers[int]);
      });
    }
    return null
  });
  return intArray;
}


