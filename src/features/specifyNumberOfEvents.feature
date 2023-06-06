Feature: User can specify number of events shown

Scenario: When user has not specified a number of events, 32 is the default number
Given a user has not specified a number of events to view at once
When the page loads
Then the default number of events shown is 32

Scenario: User can change the number of events they want to see
Given the page is loaded
When the user changes the number of events
Then the page updates to show that number of events