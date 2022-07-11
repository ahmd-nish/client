import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import ResetPassword from './Pages/ResetPassword';
import Login from './Pages/Login';
import AddUser from './Pages/AddUser';
import StudentPage from './Pages/StudentPage';
import UserRegistrations from './Pages/UserRegistrations';
import Adminpage from './Pages/AdminPage';
import NotesPage from './Pages/NotesPage';
import ViewNotes from './Pages/ViewNotes';
import EditNotes from './Pages/EditNotes';
import Loading from './Pages/Loading';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reset/:id" element={<ResetPassword />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/studentpage/:id" element={<StudentPage />} />
          <Route path="/userregistrations/:id" element={<UserRegistrations />} />
          <Route path="/adminpage/:id" element={<Adminpage />} />
          <Route path="/notespage/:id" element={<NotesPage />} />
          <Route path="/viewnotes/:id" element={<ViewNotes />} />
          <Route path="/editnotes/:id" element={<EditNotes />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
