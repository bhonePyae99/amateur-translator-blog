import { query, getDocs, collection, orderBy } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useState, useEffect } from "react";
import AddNewChapter from "../../../components/AddNewChapter";

export async function getServerSideProps(context) {
  const resp = await getDocs(
    query(
      collection(db, "WebNovels", context.params.id, "chapters"),
      orderBy("chapter")
    )
  );
  const data = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return {
    props: { data, novelId: context.params.id },
  };
}

const chapters = ({ data, novelId }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  useEffect(() => {
    if (data.length === 0) setCurrentChapter("1");
    else {
      let chap = data[data.length - 1].chapter;
      chap = parseInt(chap) + 1;
      setCurrentChapter(chap.toString());
    }
  }, [data]);
  const [addChapter, setAddChapter] = useState(false);
  return (
    <div className="w-5/6 mx-auto pt-10">
      <button
        className="px-2 py-1 rounded border-4 shadow float-right mb-5"
        onClick={() => {
          setAddChapter(true);
        }}
      >
        Add a Chapter
      </button>
      <ul className="list-none mt-5 h-full">
        {data.map((item) => (
          <li className="p-2 border-l-2 border-l-white cursor-pointer shadow hover:border-l-blue-500">
            {item.title}
          </li>
        ))}
      </ul>

      {addChapter && (
        <div
          className="absolute top-0 left-0 w-full h-screen backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
        >
          <AddNewChapter
            setAddChapter={setAddChapter}
            novelId={novelId}
            currentChapter={currentChapter}
          />
        </div>
      )}
    </div>
  );
};

export default chapters;
