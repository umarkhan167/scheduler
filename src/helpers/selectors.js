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
  });
  return daysArr;
}
