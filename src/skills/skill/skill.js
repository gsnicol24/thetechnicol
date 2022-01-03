import './skill.scss'

function Skill(props) {
    return (
        <div class="skill-container">
            <img src={props.icon} />
            <h3 class="skill-title">{props.title}</h3>
            <span>{props.details}</span>
        </div>
    )
}

export default Skill;