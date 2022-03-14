# Interview Scheduler

## Project Description

Interviewer Scheduler is a single page application for booking and tracking student interview slots. The app has a clean interface to help you book, cancel, and edit all your interview needs with your favourite mentors. This app uses React built-in and custom hooks, an API server using PostgreSQL database, and communicates with an API server over HTTP using JSON.

## Project Features
- The days show the number of slots available as a snapshot of the week
- Appointment days (Monday to Friday) are displayed and change colours depending on availability
- Users can change the details of an existing interview by pressing the edit icon
- Users can cancel an existing interview, a pop-up message will ask to confirm the action before permanently deleting an interview
- Users can switch between days and see detailed information
- Booked and available slots are organized and differenciated
- Users can book interviews by typing in a student name and clicking on an interviewer from a list of interviewers
- Days display currently remaining spots and capture updates after each modification


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
