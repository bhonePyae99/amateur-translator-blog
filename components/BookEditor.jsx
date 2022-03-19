import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase-config";

const BookEditor = ({ initialValues, setEdit }) => {
  const [title, setTitle] = useState(initialValues ? initialValues.title : "");
  const [img, setImg] = useState(initialValues ? initialValues.img : "");
  const [synposis, setSynposis] = useState(
    initialValues ? initialValues.synposis || "" : ""
  );
  const addBookToDatabase = async (e) => {
    e.preventDefault();
    const collectionRef = collection(db, "WebNovels");
    if (initialValues) {
      await setDoc(doc(collectionRef, initialValues.id), {
        title: e.target.title.value,
        img: e.target.image.value,
        synposis: e.target.synposis.value,
      });
      fetch(`/api/revalidate?id=${initialValues.id}&route=book`);
      window.location.pathname = `/${initialValues.id}`;
    } else {
      await addDoc(collectionRef, {
        title: e.target.title.value,
        img: e.target.image.value,
        synposis: e.target.synposis.value,
      });
      fetch("/api/revalidate?route=home");
      window.location.pathname = "/";
    }
  };
  return (
    <div className="w-5/6 mx-auto pt-10">
      <form
        className="w-1/2 mx-auto p-5 bg-white rounded shadow"
        onSubmit={addBookToDatabase}
      >
        <label htmlFor="title" className="block mb-2">
          Book Title:{" "}
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="outline-none mb-4 border-2 px-1 py-2 w-full rounded focus:border-blue-500"
          placeholder="Book name..."
        />
        <label htmlFor="img" className="block mb-2">
          Image Url:{" "}
        </label>
        <input
          type="text"
          value={img}
          onChange={(e) => {
            setImg(e.target.value);
          }}
          name="image"
          id="img"
          className="outline-none border-2 px-1 py-2 w-full mb-4 rounded focus:border-blue-500"
          placeholder="Book cover image url..."
        />
        <label htmlFor="synposis" className="block mb-2">
          Book Synposis:{" "}
        </label>
        <textarea
          name="synposis"
          value={synposis}
          onChange={(e) => {
            setSynposis(e.target.value);
          }}
          placeholder="Add a synposis..."
          id="synposis"
          cols="30"
          rows="10"
          className="w-full rounded focus:border-blue-500 border-2 p-2 outline-none"
        ></textarea>
        <button
          type="submit"
          className="px-2 py-1 bg-blue-600 hover:bg-white border-transparent hover:border-blue-600 hover:border hover:text-blue-600 text-white rounded mt-4"
        >
          {initialValues ? "Edit Book" : "Add a Book"}
        </button>
        {setEdit && (
          <button
            className="bg-red-600 ml-2 py-1 px-2 text-white rounded"
            onClick={() => {
              setEdit(false);
            }}
          >
            Close
          </button>
        )}
      </form>
    </div>
  );
};

export default BookEditor;
