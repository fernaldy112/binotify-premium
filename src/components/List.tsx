import React, {
  ChangeEvent,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Pagination from "./Pagination";
import axios from "axios";
import token from "./store/token";
import { Navigate, useNavigate } from "react-router-dom";

let PageSize = 5;

export default function ManageSong() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [, updateState] = React.useState<any>();
  let dataMirror: ReactNode[][] | null = null;
  const navigate = useNavigate();

  if (!token.exists()) {
    return <Navigate to="/login" />
  }

  const forceUpdate = React.useCallback(() => updateState({}), []);

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

  function handleSave(e: any, value: number, index: number) {

    e.preventDefault();
    alert("Song will be edited");
    const newSongDetails = new FormData();
    
    if (formData.Title) {
      newSongDetails.append("judul", formData.Title);
    }

    if (file) {
      newSongDetails.append("audioFile", file);
    }

    axios({
      method: "put",
      url: `http://localhost:8081/song/${value}`,
      data: newSongDetails,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token.value}`,
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          setErrorMsg("");
          data![index].judul = formData.Title ? formData.Title : data![index].judul;
          setData((_: any) => [...data]);
        } else {
          navigate("/login");
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

  function handleDelete(value: number, index: number) {
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
        
        if (response.status === 200) {
          setErrorMsg("");
          data!.splice(index, 1);
          setData((_: any)=> [...data!]);
          forceUpdate();
        } else {
          navigate("/login");
        }
      })
      .catch(function (error) {
        setErrorMsg("Something wrong with the server");
      });
  }

  function handleChange(e: ChangeEvent) {
    let data = { ...formData };
    const target = e.target as HTMLInputElement;
    data[target.name as "Title"] = target.value;
    setFormData(data);
  }

  const listItems = (data? data!.slice(firstPageIndex, lastPageIndex): []).map((song: any, index: number) => {
    if (editingId === song.song_id) {
      return (
        <tr>
          <td>
            <input
              id="songTitle"
              name="Title"
              className="border-2 rounded-lg border-black p-1 mb-8 text-black"
              value={formData.Title}
              onChange={handleChange}
              type=" text"
              placeholder={song.judul}
            />
          </td>
          <td>{song.penyanyi_id}</td>
          <td>
            <input
              id="songAudio"
              name="songAudio"
              className="border-2 rounded-lg border-black p-1 mb-8"
              type="file"
              onChange={handleFileChange}
              placeholder="Enter song audio path" />
          </td>
          <td>
            <button
              className="editButton"
              type="submit"
              onClick={(e) => {
                handleSave(e, song.song_id, index);
              }}
            >
              Save
            </button>
            <button
              className="deleteButton"
              type="submit"
              onClick={(e) => {
                handleDelete(song.song_id, index);
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
                handleDelete(song.song_id, index);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    }
  });

  return (!data || data.length === 0) ? (
    <div><p className="text-lg">You don't have any Song</p></div>
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
