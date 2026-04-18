# Technical Documentation

## Project Structure
- `index.html`: Main application structure and content sections.
- `css/styles.css`: Layout, theme variables, responsive styles, transitions, and animations.
- `js/script.js`: Application logic, state handling, project rendering, API requests, timer, and form validation.
- `assets/images/`: Optimized SVG image assets used in the portfolio.
- `docs/`: Documentation and AI usage report.

## Assignment 3 Requirements Coverage

### 1. API Integration
The project connects to the GitHub public API using `fetch()`:
- Endpoint pattern: `https://api.github.com/users/USERNAME/repos`
- Displays repository name, description, language, and updated date
- Handles loading, success, empty, and error states with user-friendly feedback

### 2. Complex Logic
The Projects section demonstrates advanced logic using multiple conditions and steps:
- Filter projects by category
- Sort projects by newest, oldest, or title
- Show different project recommendations depending on visitor level (Beginner or Advanced)
- Count and display the number of matching projects after each update
- Timer counts how long the visitor remains on the site

### 3. State Management
The project stores and updates interface state in several ways:
- Theme preference is saved in `localStorage`
- Visitor name is saved in `localStorage`
- Project controls update a shared JavaScript `state` object
- The UI re-renders when state changes

### 4. Performance Improvements
The project includes several simple performance optimizations:
- Uses lightweight SVG images instead of larger image files
- Adds `loading="lazy"` for non-critical images
- Uses `defer` on the JavaScript file to avoid blocking page rendering
- Removes repeated code by using reusable rendering and validation functions
- Keeps CSS and JavaScript organized to reduce unnecessary complexity

### 5. Form Validation
The contact form checks several rules before submission:
- All fields are required
- Name must be at least 2 characters
- Subject must be at least 3 characters
- Message must be at least 10 characters
- Email must match a valid format pattern
- User receives clear success or error feedback

## Main JavaScript Functions
- `setTheme(theme)`: Applies and stores the selected theme.
- `renderVisitorMessage()`: Updates the welcome message using saved visitor data.
- `startVisitTimer()`: Increments and displays time spent on the site.
- `getFilteredProjects()`: Applies category and level filtering plus sorting.
- `renderProjectHighlights(projects)`: Shows beginner/advanced messages based on selection.
- `renderProjects()`: Draws project cards into the DOM.
- `fetchRepositories()`: Requests repository data from GitHub and handles errors.
- `validateContactForm(formData)`: Runs form validation rules and returns a message when invalid.

## How to Test
1. Open `index.html` in a browser.
2. Test theme toggle and refresh the page to confirm it persists.
3. Click **Save Visitor Name**, enter a name, and refresh the page.
4. Change project filters and sorting options to confirm the list updates correctly.
5. Switch the visitor level between Beginner and Advanced to verify the message changes.
6. Confirm the timer increases every second.
7. Test the GitHub section:
   - wait for repositories to load
   - click **Reload Repositories**
   - disconnect internet temporarily to test the error message
8. Test the contact form using:
   - empty fields
   - invalid email
   - short subject or short message
   - valid data
9. Resize the browser to test responsive navigation and layout.
