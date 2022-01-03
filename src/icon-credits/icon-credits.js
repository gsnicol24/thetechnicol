import Modal from 'react-bootstrap/Modal';
import './icon-credits.scss'
import React, { useState } from 'react';

function IconCredits() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div class="icon-credits-container">
            <a onClick={handleShow}>Icon Credits</a>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    Icon Credits
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <a target="_blank" href="https://icons8.comundefined">Cloud Computing</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
                    </div>
                    <div>
                        <a target="_blank" href="https://icons8.comundefined">Databases</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>F
                    </div>
                    <div>
                        <a target="_blank" href="https://icons8.comundefined">Email Open</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
                    </div>
                    <div>
                        <a target="_blank" href="https://icons8.com/icon/73815/education">Education</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default IconCredits;