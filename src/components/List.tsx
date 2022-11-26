import React from "react";

// Example of a data array that
// you might receive from an API
const data = [
    { Title: "Siapa aja", Singer_id: 19, audio_path: "entahlah" },
]

const ManageSong = () => {
    return (
        <div>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Singer ID</th>
                    <th>Audio Path</th>
                    <th>Action</th>
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.Title}</td>
                            <td>{val.Singer_id}</td>
                            <td>{val.audio_path}</td>
                            <td>
                                <button className='editButton' type='submit'>Edit</button>
                                <button className='deleteButton' type='submit'>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
}

export default ManageSong