import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }
  return (
    <nav className="nav-container">
      <ul className="header-ul-container">
        <li className="logo-container">
          <Link to="/" className="link">
            <img
              className="logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </Link>
        </li>
        <li className="home-jobs-container">
          <Link to="/" className="link">
            <AiFillHome className="home-icon" />
            <h1 className="nav-text">Home</h1>
          </Link>
          <Link to="/jobs" className="link">
            <BsBriefcaseFill className="home-icon" />
            <h1 className="nav-text">Jobs</h1>
          </Link>
        </li>
        <li>
          <FiLogOut className="home-icon" onClick={onClickLogout} />
          <button className="btn-logout" onClick={onClickLogout} type="button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
