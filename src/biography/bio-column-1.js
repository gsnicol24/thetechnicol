import ProfilePicture from '../profile-picture/profile-picture'
import './bio-column-1.css'

function BioColumnOne() {
    return (
        <div class="bio-column-1">
            <ProfilePicture />
            <h3 class="name-container">
                Gavin Nicol
            </h3>
        </div>
    )
}

export default BioColumnOne;