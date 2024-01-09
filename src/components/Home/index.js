import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onRedirectToJobs = () => {
    const {history} = props
    history.push('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="heading">
          Find The Job That <br /> Fits Your Life
        </h1>
        <p className="description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the jobs that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="link">
          <button
            type="button"
            className="shop-now-btn"
            onClick={onRedirectToJobs}
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
