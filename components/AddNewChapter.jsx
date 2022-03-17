import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";

const AddNewChapter = ({
  initialValues,
  setAddChapter,
  novelId,
  currentChapter,
}) => {
  const [title, setTitle] = useState(initialValues ? initialValues.title : "");
  const [content, setContent] = useState(
    initialValues ? initialValues.content || "" : ""
  );
  const [chapter, setChapter] = useState(
    initialValues ? initialValues.chapter || "" : ""
  );

  useEffect(() => {
    if (currentChapter) {
      setChapter(currentChapter);
    }
  }, []);

  const addChapterToDatabase = async (e) => {
    e.preventDefault();
    const collectionRef = collection(db, "WebNovels");
    await setDoc(doc(collectionRef, novelId, "chapters", chapter), {
      title: e.target.title.value,
      content: e.target.content.value,
      chapter: e.target.chapter.value,
    });
    window.location.pathname = `/${novelId}/chapters`;

    setAddChapter(false);
  };
  return (
    <div className="w-5/6 mx-auto pt-10">
      <form
        className="w-1/2 mx-auto p-5 bg-white rounded shadow"
        onSubmit={addChapterToDatabase}
      >
        <label htmlFor="chapter" className="block mb-2">
          Chapter:{" "}
        </label>
        <input
          type="text"
          name="chapter"
          id="chapter"
          value={chapter}
          onChange={(e) => {
            setChapter(e.target.value);
          }}
          className="outline-none mb-4 border-2 px-1 py-2 w-full rounded focus:border-blue-500"
          placeholder="Chapter number..."
        />
        <label htmlFor="title" className="block mb-2">
          Chapter Title:{" "}
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
          placeholder="Chapter title..."
        />
        <label htmlFor="content" className="block mb-2">
          Chapter content:{" "}
        </label>
        <textarea
          name="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="Add a content..."
          id="content"
          cols="30"
          rows="10"
          className="w-full rounded focus:border-blue-500 border-2 p-2 outline-none"
        ></textarea>
        <button
          type="submit"
          className="px-2 py-1 bg-blue-600 hover:bg-white border-transparent hover:border-blue-600 hover:border hover:text-blue-600 text-white rounded mt-4"
        >
          {initialValues ? "Edit Chapter" : "Add a Chapter"}
        </button>
        {setAddChapter && (
          <button
            className="bg-red-600 ml-2 py-1 px-2 text-white rounded"
            onClick={() => {
              setAddChapter(false);
            }}
          >
            Close
          </button>
        )}
      </form>
    </div>
  );
};

export default AddNewChapter;
