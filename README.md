# TMnT

### Team Management Tool

Not to be confused with [Teenage Mutant Ninja Turtles](https://en.wikipedia.org/wiki/Teenage_Mutant_Ninja_Turtles), TMnT is a team management tool for any teams or projects that follow the Agile Scrum project management methodology.

-----------------------

Co-authors:

- Nattie Chan [@nattiechan](https://github.com/nattiechan)
- Michael Gacetta [@gacetta](https://github.com/gacetta)
- Jason Huang [@jjuang3](https://github.com/jjhuang3)
- Clark Pang [@clark-pang](https://github.com/clark-pang)

-----------------------

v.1.1 features:

- End-to-end (E2E) authentication with password hashing using `bcrypt`
- Implemented Google Sign-in
- UI feedback for issues with sign-in, sign-up and adding boards
- Additional CRUD functionality: add/delete boards and columns
- Decoupling routing and state management in the front end to facilitate smooth page transitions and future scalability

----------------------

### Motivation and background

As part of the iteration project for the Codesmith Software Engineering Immersive Program, the group was looking for an opportunity to focus on authentication and implement further CRUD functionalities. We [forked](https://github.com/WCRI56-Team-GS/Scratch-Project) a project from an existing group that has potential for us to practice implementing authentication end-to-end as well as continuing on implementing the CRUD features that the previous group left off.

### Future iterations recommendations:

- Add ability to add and remove cards
- Use name from google sign-in instead of the email as username display on the UI
- Ensure session persists upon refreshes so the browser would not show a blank screen
- Refactor all front end fetch calls to using `axios`
- Refactor modal infrastructure in the front end to minimize prop drilling
