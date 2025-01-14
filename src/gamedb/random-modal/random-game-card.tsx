import { Card, Dropdown } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import DeleteGameModal from "../delete-game-modal/delete-game-modal";
import { Game } from "../models/game";

function RandomGameCard(props: { game: Game, isSelected: boolean }) {
    var cardHeaderClass = "d-flex text-nowrap"
    if (!props.isSelected) {
        cardHeaderClass += " d-sm-block d-none"
    }

    return (
        <Card style={{ minWidth: "90%", maxWidth: "90%", margin: "auto" }}>
            <Card.Img variant="top" src={props.game.img ?? "question-mark.jpg"} style={{ maxHeight: "50vh", objectFit: "cover" }} />
            <Card.Header className={cardHeaderClass}>
                <span style={{
                    textOverflow: "ellipsis",
                    display: "block",
                    overflow: "hidden"
                }}>{props.game.name}</span>
            </Card.Header>
        </Card>
    )
}

export default RandomGameCard