# Meet App

 Welcome to Meet, an app created based on the Meet App with CareerFoundry! This app is calendar based and is designed to organize dates and details of events occurring by city!

# APP Feature User Stories

## FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS
As a user,
I should be able to show or hide an event’s details
So that only the detailed data that I am interested in is shown on the page.

### Scenario 1: An event element is collapsed by default
    - Given a user has not expanded any events
    - When the page loads
    - Then events should load collapsed by default

### Scenario 2: User can expand an event to see its details
    - Given the user chooses an event
    - When they click on the event
    - Then the event expands to show more details

### Scenario 3: User can collapse an event to hide its details
    - Given the user is finished viewing an event
    - When they click the collapse button
    - Then the event collapses and the user can continue browsing

## FEATURE 3: SPECIFY NUMBER OF EVENTS
As a user,
I should be able to specify the number of events shown on the page
So that I can comfortably view events based on my display or network speed

### Scenario 1: When user hasn’t specified a number, 32 is the default number
    - Given a user hasn’t specified a number of events to view at once
    - When the page loads
    - Then the default number of events shown is 32 (fits comfortably on a 720p monitor)

### Scenario 2: User can change the number of events they want to see
    - Given a user wishes to view more/less events at once
    - When the user clicks on a number
    - Then the page loads that number of events on the screen

## FEATURE 4: USE THE APP WHEN OFFLINE
As a user,
I should be able to view cached data offline,
So that if my PC’s connection to the server fails, I can continue browsing

### Scenario 1: Show cached data when there’s no internet connection
    - Given the user has data cached locally
    - When the app loads and fails to connect to the server
    - Then the app displays the latest data received and cached

### Scenario 2: Show error when user changes the settings (city, time range)
    - Given the user searches for an event
    - When the city or time range is invalid
    - Then the app displays an error message

## FEATURE 5: DATA VISUALIZATION
As a user,
I should be able to view interesting data visually,
So that I may make better use of the app’s functions

### Scenario 1: Show a chart with the number of upcoming events in each city
    - Given the user loads the app
    - When they view the main page
    - Then they can view a chart which shows the number of events in each city

## Serverless Functions
    - Mock API hosting and data retrieval
    - OAUTH Client authorization and authentication

## Dependencies

React

NodeJS

Bootstrap
