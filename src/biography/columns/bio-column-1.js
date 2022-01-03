import ProfilePicture from '../profile-picture/profile-picture'
import './bio-column-1.scss'

function BioColumnOne() {
    return (
        <div class="bio-column-1">
            <ProfilePicture />
            <div class="name-container">
                <h3>
                    Gavin Nicol
                </h3>
                <h4>
                    Senior Software Engineer
                </h4>
            </div>
            <div class="links-container">
                <a href="https://github.com/gsnicol24/">
                    <img src="icons/github.png" />
                </a>
                <a href="https://www.linkedin.com/in/gavinsnicol/">
                    <img src="icons/linkedin.png" />
                </a>
            </div>
        </div>
    )
}

export default BioColumnOne;