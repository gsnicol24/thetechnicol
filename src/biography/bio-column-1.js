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
        </div>
    )
}

export default BioColumnOne;