import React, { ChangeEvent, useState, useEffect, useMemo } from "react";
import Pagination from './Pagination';
import axios from "axios";

let PageSize = 10;

export default function ManageSong() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8081/song`
                );
                setData(response.data);
                setError(null);
                console.log(data);
            } catch (err) {
                setError(err.message);
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [loading]);
    // const [data, setData] = useState([
    //     // TODO: READ DATA DARI DB
    //     {
    //         id: 1,
    //         Title: "Anjay",
    //         Singer_id: 10,
    //         audio_path: "hehe",
    //     },
    //     {
    //         id: 2,
    //         Title: "Turu",
    //         Singer_id: 1,
    //         audio_path: "hehe",
    //     },
    // ])

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    const [file, setFile] = useState<File>();
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    // const handleUploadClick = () => {

    //     if (!file) {
    //         return;
    //     }

    //     // 👇 Uploading the file using the fetch API to the server
    //     fetch('https://httpbin.org/post', {
    //         method: 'POST',
    //         body: file,
    //         // 👇 Set headers manually for single file upload
    //         headers: {
    //             'content-type': file.type,
    //             'content-length': `${file.size}`, // 👈 Headers need to be a string
    //         },
    //     })
    //         .then((res) => res.json())
    //         .then((data) => console.log(data))
    //         .catch((err) => console.error(err));
    // };

    const [formData, setFormData] = useState({
        Title: "",
        audio_path: "",
    })


    function handleSave(e) {
        // let tes = [...data];
        // tes.push({ id: 10, Title: formData.Title, Singer_id: 11, audio_path: file.name });
        // setData(tes);
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
        e.preventDefault();
        alert("Song will be edited");
        const songData = {
            judul: formData.Title,
            audio_path: file.name
        }
        axios({
            method: "put",
            url: `http://localhost:8081/song/${value}`,
            data: songData,
            headers: { "Content-Type": "application/json" },
        })
            .then(function (response) {
                const res = response.data;
                if (res.valid) {
                    setErrorMsg("");
                } else {
                    setErrorMsg(res.note);
                }
            })
            .catch(function (error) {
                // console.log(error);
                setErrorMsg("Something wrong with the server");
            });
        setFormData({ Title: "", audio_path: "" });
        setEditingId(-1)

    }

    const [editingId, setEditingId] = useState(-1)

    function handleEdit(value) {
        setEditingId(value)
    }

    function handleDelete(value) {
        // TODO: DELETE DARI DB

        axios({
            method: "delete",
            url: `http://localhost:8081/song/${value}`,
            headers: { "Content-Type": "application/json" },
        })
            .then(function (response) {
                const res = response.data;
                if (res.valid) {
                    setErrorMsg("");
                } else {
                    setErrorMsg(res.note);
                }
            })
            .catch(function (error) {
                // console.log(error);
                setSongErrorExists(true);
                setErrorMsg("Something wrong with the server");
            });

    }

    function handleChange(e) {
        let data = { ...formData };
        data[e.target.name] = e.target.value;
        setFormData(data);
    }

    const listItems = currentTableData.map((song) => {
        if (editingId === song.id) {
            return (
                <tr>
                    <td><input id="songTitle" name="Title" className='border-2 rounded-lg border-black p-1 mb-8' value={formData.Title} onChange={handleChange} type=" text" placeholder='Enter song Title' /></td>
                    <td>{song.Singer_id}</td>
                    <td><input id="songAudio" name='songAudio' className='border-2 rounded-lg border-black p-1 mb-8' type="file" onChange={handleFileChange} placeholder='Enter song audio path' /></td>
                    <td>
                        <button className='editButton' type='submit' onClick={(e) => { handleSave(song.id) }}>Save</button>
                        <button className='deleteButton' type='submit' onClick={(e) => { handleDelete(song.id) }}>Delete</button>
                    </td>
                </tr>)
        }
        else {
            return (
                <tr>
                    <td>{song.Title}</td>
                    <td>{song.Singer_id}</td>
                    <td>{song.audio_path}</td>
                    <td>
                        <button className='editButton' type='submit' onClick={(e) => { handleEdit(song.id) }}>Edit</button>
                        <button className='deleteButton' type='submit' onClick={(e) => { handleDelete(song.id) }}>Delete</button>
                    </td>
                </tr>)
        }
    })

    return (
        <div>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Singer ID</th>
                    <th>Audio Path</th>
                    <th>Action</th>
                </tr>
                {listItems}
            </table>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={data.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}

