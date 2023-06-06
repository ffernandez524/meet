Feature: Show/Hide an Event's Details

Scenario: When the app loads, the event's details are collapsed by default
Given a user has not expanded any events
When the page loads
Then events should load collapsed by default

Scenario: User can expand an event to see details
Given an event is collapsed
When the user clicks on the expand button
Then the event expands to show more details

Scenario: User can collapse an event to hide its details
Given an event is expanded
When the user clicks the collapse button
Then the event collapses and hides details