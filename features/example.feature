Feature: Search Movies

    Scenario: Search for the movie "Matrix"
        Given the home page is opened
        Then the TMDB header should be visible
        And the Login button in the Header should be visible

        When the "Matrix" search term is typed into the Search Bar
        And the Search button is clicked
        Then the Search result page should be loaded
        And the title of the first search result should be "Matrix"