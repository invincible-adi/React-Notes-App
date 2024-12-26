import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Notes() {

    const [data, setData] = useState([])
    // const {id}=useParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()

    const temData = JSON.parse(window.localStorage.getItem("Notes"))
    useEffect(() => {
        setData(temData)
    }, [])

    function del(id) {
        const newData = temData.filter((item, index) => index != id)
        window.localStorage.setItem("Notes", JSON.stringify(newData))
        setData(newData)
    }

    const [currentIndex, setCurrentIndex] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    function edit(id) {
        setShow(true);
        setCurrentIndex(id);
        const editData = data[id];
        setTitle(editData.title);
        setDescription(editData.description);
    }

    function update() {
        const obj = { title, description }
        let data = JSON.parse(window.localStorage.getItem('Notes'))
        data[currentIndex] = obj
        window.localStorage.setItem("Notes", JSON.stringify(data))
        navigate('/notes')
        setData(data);
        setShow(false);
        setTitle('');
        setDescription('');
    }
    function go() {
        navigate(`/`)
    }

    return (
        <>
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <h3 className="fw-bold text-center" >All Notes :-</h3>
                    {
                        data.map((item, index) => {
                            return (
                                <>
                                    <Card key={index} className="my-3 bg-transparent">
                                        <Card.Header as="h5" className="fw-bold fs-3 d-flex">Title :
                                            <Card.Title className="my-2 fs-3 title mx-auto">{item.title}</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Text className="txt">
                                                {item.description} <br /><br />
                                                <button className="btn btn-sm btn-primary me-3" onClick={() => edit(index)}>Edit <FaEdit /></button>
                                                <Modal show={show} onHide={handleClose} >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Edit Note</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div className="card-text ">
                                                            Title
                                                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control border-3" placeholder="Title" />
                                                        </div>
                                                        <div className="card-text mt-4">
                                                            Description
                                                            <textarea name="" id="" cols="100" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control border-3" placeholder="Enter Your Notes..." rows="10"></textarea>
                                                        </div>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                        <Button variant="primary" onClick={update}>
                                                            Save Changes
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>

                                                <button className="btn btn-sm btn-danger" onClick={() => del(index)}>Delete <FaTrash /></button>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </>
                            )
                        })
                    }
                    <button className="form-control w-50 mx-auto mt-3 " style={{ background: '#000B58', color: '#FFF4B7', }} onClick={go}>Add New Note</button>
                </div>
            </div>
        </>
    )
};

