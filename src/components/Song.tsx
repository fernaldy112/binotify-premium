import React, { ChangeEvent, useState } from 'react'
import List from "./List";


const SongPage = () => {
    const [file, setFile] = useState<File>();

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
    return (
        <div className='w-full max-w-xl flex flex-col justify-center mx-auto my-10'>
            <div className='border-2 border-black rounded-lg'>
                <form id="insertSongForm" className='p-10 flex flex-col items-center justify-items-stretch pb-6' action="">
                    <h2 className='w-full mx-auto text-center text-5xl font-bold mb-10'>Song</h2>
                    <div className='w-full'>
                        <label htmlFor="songTitle" className='w-full text-left block'>Title</label>
                        <input id="songTitle" name='songTitle' className='border-2 rounded-lg border-black p-1 w-full mb-8' type="text" placeholder='Enter song Title' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="songAudio" className='w-full text-left block'>Audio Path</label>
                        <input id="songAudio" name='songAudio' className='border-2 rounded-lg border-black p-1 w-full mb-8' type="file" onChange={handleFileChange} placeholder='Enter song audio path' />
                        <div>{file && `${file.name} - ${file.type}`}</div>
                    </div>

                    <button className='border-2 rounded-lg border-black p-1 w-full max-w-[100px]' type='submit' onClick={handleUploadClick}>Insert Song</button>
                </form>
                <hr />
            </div>
            <br></br>

        </div>
    )
}

export default SongPage
