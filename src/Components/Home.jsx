import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
    .object()
    .shape({
        title: yup.string().required(),
        description: yup.string().required(),
    })
    .required();

export default function Home() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const saveData = (data) => {
        const existingData = JSON.parse(window.localStorage.getItem("Notes")) || [];
        const newData = [...existingData, data];
        window.localStorage.setItem("Notes", JSON.stringify(newData));
        setTitle('');
        setDescription('');
    };

    const onAdd = (data) => {
        saveData(data);
    };

    const onCheckNotes = (data) => {
        saveData(data);
        navigate(`/notes`);
    };

    return (
        <>
            <div className="row h-100" style={{background:"",backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
                <div className="col-lg-8 my-5 col-md-10 col-sm-12 mx-auto" >
                    <div className="card " style={{background:'transparent'}}>
                        <div className="card-body">
                            <form>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        {...register('title')}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="form-control border-3 ms-0"
                                        placeholder="Title "
                                        style={{background:'transparent',color:'FFF4B7 !important'}}
                                    />
                                    <span>
                                        <button
                                            type="button"
                                            className="form-control ms-1 bttn"
                                            // style={{background:'#000B58',color:'#FFF4B7'}}
                                            onClick={handleSubmit(onAdd)}
                                        >
                                            Add
                                        </button>
                                    </span>
                                </div>
                                {errors.title && <p className="text-danger text-start fw-light ">{errors.title.message}</p>}
                                <textarea
                                    {...register('description')}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="form-control border-3 mt-3"
                                    placeholder="Enter Your Notes..."
                                    // style={{background:'transparent',color:'FFF4B7 !important'}}
                                    rows="10"
                                ></textarea>
                                {errors.description && <p className="text-danger text-start fw-light">{errors.description.message}</p>}
                                <button
                                    type="button"
                                    className="form-control mt-3 w-100 border-3 bttn"
                                    onClick={handleSubmit(onCheckNotes)}
                                    // style={{background:'#FFF4B7'}}
                                >
                                    Check Notes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
