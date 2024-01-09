import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutJobItem extends Component {
  state = {
    jobDataDetails: [],
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  // eslint-disable-next-line no-unused-vars
  getJobData = async props => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const optionsJobData = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseJobData = await fetch(jobDetailsUrl, optionsJobData)
    if (responseJobData.ok === true) {
      const fetchedData = await responseJobData.json()
      const updatedJobData = [fetchedData.job_details].map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        companyWebsiteUrl: eachItem.company_website_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        lifeAtCompany: {
          description: eachItem.life_at_company.description,
          imageUrl: eachItem.life_at_company.image_url,
        },
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        skills: eachItem.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: eachItem.title,
      }))

      const updatedSimilarJobData = fetchedData.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        employmentType: eachItem.employment_type,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobDataDetails: updatedJobData,
        similarJobsData: updatedSimilarJobData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetailsSuccessView = () => {
    const {jobDataDetails, similarJobsData} = this.state
    if (jobDataDetails.length >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        // eslint-disable-next-line no-unused-vars
        id,
        jobDescription,
        lifeAtCompany,
        location,
        rating,
        skills,
        title,
        packagePerAnnum,
      } = jobDataDetails[0]
      return (
        <>
          <div className="job-item-container">
            <div className="employee-type-first-container">
              <div className="img-title-container">
                <img
                  src={companyLogoUrl}
                  alt="job details company logo"
                  className="company-logo"
                />
                <div className="title-rating-container">
                  <h1 className="title">{title}</h1>
                  <div className="rating-container">
                    <AiFillStar className="star-icon" />
                    <p className="rating-text">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="location-package-container">
                <div className="location-job-type-container">
                  <div className="location-container">
                    <MdLocationOn className="location-icon" />
                    <p className="location">{location}</p>
                  </div>
                  <div className="employee-type-container">
                    <BsFillBriefcaseFill className="emplyee-type-icon" />
                    <p className="job-type">{employmentType}</p>
                  </div>
                </div>
                <div className="package-container">
                  <p className="package">{packagePerAnnum}</p>
                </div>
              </div>
            </div>
            <hr className="line" />
            <div className="second-part-container">
              <div className="description-visit-container">
                <h1 className="description-heading">Description</h1>
                <a className="visit" href={companyWebsiteUrl}>
                  Visit
                  <BiLinkExternal />
                </a>
              </div>
              <p className="description-para">{jobDescription}</p>
            </div>
            <h1>Skills</h1>
            <ul className="skills-list-container">
              {skills.map(eachSkill => (
                <li className="skill-list" key={eachSkill.name}>
                  <img
                    src={eachSkill.imageUrl}
                    className="skill-img"
                    alt={eachSkill.name}
                  />
                  <p>{eachSkill.name}</p>
                </li>
              ))}
            </ul>
            <div className="life-atcompany-description-container">
              <div className="description-container">
                <h1>Life at Company</h1>
                <p>{lifeAtCompany.description}</p>
              </div>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="life-at-image"
              />
            </div>
          </div>
          <h1 className="similar-job-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {similarJobsData.map(eachItem => (
              <SimilarJobs
                key={eachItem.id}
                similarJobsData={eachItem}
                employmentType={employmentType}
              />
            ))}
          </ul>
        </>
      )
    }
    return null
  }

  onRetryJobDetailsAgain = () => {
    this.getJobData()
  }

  renderJobFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for.</p>
      <div className="btn-container-failure">
        <button
          className="failure-job-details-btn"
          type="button"
          onClick={this.onRetryJobDetailsAgain}
        >
          retry
        </button>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-view" data-testid="loader">
      <Loader type="ThreeDots" color="#fff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="app-container">{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default AboutJobItem
