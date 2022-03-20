import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AddNewChapter from "./AddNewChapter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const Chapters = ({ data, novelId, bookTitle }) => {
  const router = useRouter();
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
        className="px-2 py-1 rounded border-4 shadow float-left"
        onClick={() => {
          router.back();
        }}
      >
        <FontAwesomeIcon icon={faArrowLeftLong} className="mr-1" />
        Back
      </button>
      <button
        className="px-2 py-1 rounded border-4 shadow float-right mb-5"
        onClick={() => {
          setAddChapter(true);
        }}
      >
        Add a Chapter
      </button>
      <ul className="list-none mt-20 h-full">
        {data.map((item) => (
          <Link href={`/${novelId}/chapters/${item.id}`} passHref key={item.id}>
            <li className="p-2 border-l-2 border-l-white cursor-pointer shadow hover:border-l-blue-500">
              {item.title}
            </li>
          </Link>
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
            bookTitle={bookTitle}
          />
        </div>
      )}
    </div>
  );
};

export default Chapters;
