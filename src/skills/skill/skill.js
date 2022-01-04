import './skill.scss'

function Skill(props) {
    return (
        <div className="skill-container">
            <img src={props.icon} />
            <h3 className="skill-title">{props.title}</h3>
            <span>{props.details}</span>
        </div>
    )
}

export default Skill;