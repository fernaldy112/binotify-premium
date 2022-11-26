import React, { ChangeEvent, useState } from 'react'
import ManageSong from "./List";


const SongPage = () => {
    const [file, setFile] = useState<File>();
    const [songData, setSong] = useState([
        {
            id: 1,
            Title: "Anjay",
            Singer_id: 10,
            audio_path: "hehe",
        },
        {
            id: 2,
            Title: "Turu",
            Singer_id: 1,
            audio_path: "hehe",
        },
    ])

    const [formData, setFormData] = useState({
        Title: "",
        audio_path: "",
    })

    function handleChange(e) {
        let data = { ...formData };
        data[e.target.name] = e.target.value;
        setFormData(data);
    }

    const [isUpdate, setIsUpdate] = useState({ id: null, status: false });
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {

        if (!file) {
            return;
        }

        // 👇 Uploading the file using the fetch API to the server
        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: file,
            // 👇 Set headers manually for single file upload
            headers: {
                'content-type': file.type,
                'content-length': `${file.size}`, // 👈 Headers need to be a string
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    };

    function handleSubmit(e) {
        e.preventDefault();
        alert("Add new song?");

        let data = [...songData];
        data.push({ id: 10, Title: formData.Title, Singer_id: 11, audio_path: file.name });
        setSong(data);
        console.log(data);
        // TODO: Masukkan ke DB
    }


    return (
        <div className='w-full max-w-xl flex flex-col justify-center mx-auto my-10'>
            <div className='border-2 border-black rounded-lg'>
                <form id="insertSongForm" onSubmit={handleSubmit} className='p-10 flex flex-col items-center justify-items-stretch pb-6' action="" onSubmit={handleSubmit}>
                    <h2 className='w-full mx-auto text-center text-5xl font-bold mb-10'>Song</h2>
                    <div className='w-full'>
                        <label htmlFor="songTitle" className='w-full text-left block'>Title</label>
                        <input id="songTitle" name="Title" className='border-2 rounded-lg border-black p-1 w-full mb-8' value={formData.Title} onChange={handleChange} type=" text" placeholder='Enter song Title' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="songAudio" className='w-full text-left block'>Audio Path</label>
                        <input id="songAudio" name='songAudio' className='border-2 rounded-lg border-black p-1 w-full mb-8' type="file" onChange={handleFileChange} placeholder='Enter song audio path' />
                        <div>{file && `${file.name} - ${file.type}`}</div>
                    </div>

                    <button className='border-2 rounded-lg border-black p-1 w-full max-w-[100px]' type='submit' onClick={handleUploadClick}>Insert Song</button>
                </form>
                <hr />
            </div >
            <br></br>
        </div >
    )
}

export default SongPage