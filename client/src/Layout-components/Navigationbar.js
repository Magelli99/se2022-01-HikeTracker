import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import API from '../API';

function NavigationBar(props){
    const navigate = useNavigate();
    return <Navbar className='navbar navbar-dark bg-dark position-sticky top-0'>
        <Container fluid>
            <h2 className="main-title col-4 text-white" onClick={ ()=> navigate('/')}>
                <i className="bi bi-building"></i>
                <span className="d-none d-md-inline">Hike-Tracker</span>
            </h2>
            <h3 className='text-white'>Welcome, {props.logged.login === false ? 'Guest' : props.logged.user.Id}!</h3>
            {props.logged.login ? <Logout setLogged = {props.setLogged} navigate={navigate} user={props.logged}/> : <Login navigate={navigate}/>}
        </Container>
    </Navbar>
}

function Login(props){
    return <div className='col-4 d-flex flex-row-reverse'>
        <Button variant="outline-success" onClick={ () => props.navigate('/login')}>
            <span className='btn-icon'><i className="bi bi-box-arrow-in-right mr-2"></i></span><span>Log-In</span>
        </Button>
        <Button variant="outline-success" onClick={() => props.navigate('/register')}>
            <span className='btn-icon'><i className="bi bi-file-earmark-plus"></i></span><span>Register</span>
        </Button>
    </div>
}

function Logout(props){
    return <div className='col-4 d-flex flex-row-reverse'>
        <Button variant="outline-danger" onClick={() => handleLogout(props.setLogged, props.navigate, props.user.id)}>
            <span className='btn-icon'><i className="bi bi-box-arrow-left"></i></span><span>Logout</span>
        </Button>
    </div>
}

const handleLogout = async (setLogged, navigate, id) => {
    if (await API.logOut()){
        setLogged({
            login: false,
            user: undefined,
        });
        navigate('/');
    }
};

export default NavigationBar;