import './App.css';
import NotesListPage from "./pages/NoteListPage"
import NotePage from "./pages/NotePage"
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


function Header() {
  return (
    <div className="app__header">
      <h1>Note List</h1>
    </div>
  )
}

function App() {
  return (
    <div className="container dark">
      <div className="app">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<NotesListPage />} />
            <Route path="/note/:id" element={<NotePage />} />
          </Routes>
        </Router>
      </div>
    </div >

  );
}

export default App;
