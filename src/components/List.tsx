import React, {
  ChangeEvent,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import Pagination from "./Pagination";
import axios from "axios";
import token from "./store/token";

let PageSize = 5;

export default function ManageSong() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  let dataMirror: ReactNode[][] | null = null;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/song`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        setData(response.data);
        dataMirror = response.data;
        setError(null);
        console.log(data);
      } catch (error: any) {
        setError(error.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [loading]);

  const [currentPage, setCurrentPage] = useState(1);

  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const currentTableData = data
    ? data!.slice(firstPageIndex, lastPageIndex)
    : [];

  const [file, setFile] = useState<File>();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const [formData, setFormData] = useState({
    Title: "",
    audio_path: "",
  });

  function handleSave(e: any, value: number) {
    if (!file) {
      return;
    }

    e.preventDefault();
    alert("Song will be edited");
    const data = new FormData();
    data.append("judul", formData.Title);
    data.append("audioFile", file);
    axios({
      method: "put",
      url: `http://localhost:8081/song/${value}`,
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
        setErrorMsg("Something wrong with the server");
      });
    setFormData({ Title: "", audio_path: "" });
    setEditingId(-1);
  }

  const [editingId, setEditingId] = useState(-1);

  function handleEdit(value: number) {
    setEditingId(value);
  }

  function handleDelete(value: number) {
    alert("Song is deleted");
    axios({
      method: "delete",
      url: `http://localhost:8081/song/${value}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then(function (response) {
        const res = response.data;
        if (res.valid) {
          setErrorMsg("");
          dataMirror!.splice(value, 1);
          setData(dataMirror);
        } else {
          setErrorMsg(res.note);
        }
      })
      .catch(function (error) {
        // console.log(error);
        setErrorMsg("Something wrong with the server");
      });
  }

  function handleChange(e: ChangeEvent) {
    let data = { ...formData };
    const target = e.target as HTMLInputElement;
    data[target.name as "Title"] = target.value;
    setFormData(data);
  }

  const listItems = currentTableData.map((song: any) => {
    if (editingId === song.song_id) {
      return (
        <tr>
          <td>
            <input
              id="songTitle"
              name="Title"
              className="border-2 rounded-lg border-black p-1 mb-8 text-black"
              value={song.judul}
              onChange={handleChange}
              type=" text"
              placeholder="Enter song Title"
            />
          </td>
          <td>{song.penyanyi_id}</td>
          <td>
            <input
              id="songAudio"
              name="songAudio"
              className="border-2 rounded-lg border-black p-1 mb-8"
              type="file"
              value={song.audio_path}
              onChange={handleFileChange}
              placeholder="Enter song audio path" />
          </td>
          <td>
            <button
              className="editButton"
              type="submit"
              onClick={(e) => {
                handleSave(e, song.song_id);
              }}
            >
              Save
            </button>
            <button
              className="deleteButton"
              type="submit"
              onClick={(e) => {
                handleDelete(song.song_id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>{song.judul}</td>
          <td>{song.penyanyi_id}</td>
          <td>{song.audio_path}</td>
          <td>
            <button
              className="editButton"
              type="submit"
              onClick={(e) => {
                handleEdit(song.song_id);
              }}
            >
              Edit
            </button>
            <button
              className="deleteButton"
              type="submit"
              onClick={(e) => {
                handleDelete(song.song_id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }
  });

  return !data ? (
    <></>
  ) : (
    <div>
      <table className="border-primary">
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
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
}
