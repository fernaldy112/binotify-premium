import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import token from "./store/token";

const SongPage = () => {
    const [file, setFile] = useState<File>();
    const [songErrorExists, setSongErrorExists] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [formData, setFormData] = useState({
        judul: "",
        audio_path: "",
    });

    function handleChange(e: any) {
        let data = { ...formData };
        data[e.target.name as keyof typeof data] = e.target.value;
        setFormData(data);
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (!file) {
            return;
        }

        fetch("https://httpbin.org/post", {
            method: "POST",
            body: file,
            headers: {
                "content-type": file.type,
                "content-length": `${file.size}`,
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    };

    function handleSubmit(e: any) {
        e.preventDefault();
        alert("New Song will be added");
        if (formData.judul === "" || formData.audio_path === "") {
            alert("all field must be input!")
        }
        else {
            const data = new FormData();
            data.append("judul", formData.judul);
            data.append("audioFile", file!);

            axios({
                method: "post",
                url: "http://localhost:8081/song",
                data,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token.value}`,
                },
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

            setFormData({ judul: "", audio_path: "" });
        }
    }

    return (
        <div className="w-full max-w-xl flex flex-col justify-center mx-auto my-10">
            <div className="border-2 border-primary rounded-lg">
                <form
                    id="insertSongForm"
                    onSubmit={handleSubmit}
                    className="p-10 flex flex-col items-center justify-items-stretch pb-6"
                    action=""
                    method="post"
                >
                    <h2 className="w-full mx-auto text-center text-5xl font-bold mb-10">
                        Song
                    </h2>
                    <p
                        className={`${songErrorExists
                            ? "bg-rose-600 text-white w-full text-center h-10 leading-10 rounded-md mb-4"
                            : ""
                            }`}
                    >
                        {errorMsg}
                    </p>
                    <div className="w-full">
                        <label htmlFor="songjudul" className="w-full text-left block">
                            Judul
                        </label>
                        <input
                            id="songjudul"
                            name="judul"
                            className="border-2 rounded-lg border-black p-1 w-full mb-8 text-black"
                            value={formData.judul}
                            onChange={handleChange}
                            type=" text"
                            placeholder="Enter song judul"

                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="songAudio" className="w-full text-left block">
                            Audio Path
                        </label>
                        <input
                            id="songAudio"
                            name="songAudio"
                            className="border-2 rounded-lg border-white p-1 w-full mb-8"
                            type="file"
                            onChange={handleFileChange}
                            placeholder="Enter song audio path"
                        />
                        {/* <div>{file && `${file.name} - ${file.type}`}</div> */}
                    </div>

                    <button
                        className="border-2 rounded-lg border-primary p-1 w-full max-w-[100px] hover:bg-primary hover:text-black"
                        type="submit"
                        onClick={handleUploadClick}
                    >
                        Insert Song
                    </button>
                </form>
            </div>
            <br></br>
        </div>
    );
};

export default SongPage;
