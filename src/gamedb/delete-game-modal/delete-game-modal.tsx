import React from "react";
import { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import FirebaseConfig from "../firebase-config";

function DeleteGameModal(props: { selectedId: string, gameName: string }) {
    const app = initializeApp(FirebaseConfig)
    const db = getFirestore(app);

    const [deleting, setDeleting] = useState(false)
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        if (!deleting) {
            setShow(false);
        }
    }
    const handleDelete = async () => {
        setDeleting(true)
        await deleteDoc(doc(db, "games", props.selectedId));
        setDeleting(false)
        setShow(false)
    }

    return (
        <React.Fragment>
            <Dropdown.Item onClick={handleShow}>Delete</Dropdown.Item>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Delete game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Are you sure you want to delete {props.gameName}?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={deleting}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDelete} disabled={deleting}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default DeleteGameModal;