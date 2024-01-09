import {Link} from 'react-router-dom'
import {BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobItem = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobData
  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="logo-title-location-container">
          <div className="logo-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <BsStarFill className="star-icon" />
                <p className="rating-heading">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-container">
            <div className="location-employee-container">
              <div className="location-container">
                <MdLocationOn className="location-icon" />
                <p className="location-heading">{location}</p>
              </div>
              <div className="employee-type-container">
                <p className="employee-type-heading">{employmentType}</p>
              </div>
            </div>
            <div>
              <p className="package-heading">{packagePerAnnum}</p>
            </div>
          </div>
        </div>
        <hr className="line" />
        <div>
          <h1 className="job-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
