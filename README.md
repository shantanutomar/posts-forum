# Posts Forum

Application showing posts, users who created the posts and comments related to posts.
The application has been developed in ReactJS with Redux as state management library. The API used to fetch posts, users and comments data is https://jsonplaceholder.typicode.com/
The Posts are lazy loaded on scroll.

The project is deployed here-> https://posts-forum.netlify.app/

### Setting Up and Running

- Clone the [repository](https://github.com/shantanutomar/posts-forum.git).
- Install all the required dependencies using `npm install`.
- Run a development server of web client using `npm start`. This will start web local server on `http://localhost:3000/`
- A static production build can be made using `npm run build`.

#### Packages Used

- material-ui: UI library components has been used along with JSS CSS in JS style.
- react-test-renderer: Running tests and generating component screenshots for React Application
- redux: Used for managing application state along with thunk middleware.