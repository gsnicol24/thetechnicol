import './panel-header.scss'

function PanelHeader(props) {
    return (
        <h1 class="panel-header">{props.title}</h1>
    )
}

export default PanelHeader;