import AddNewChapter from "./AddNewChapter";
import { useState, useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faAnglesLeft,
  faList,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import UserContext from "../context/UserContext";
const Chapter = ({ data }) => {
  const [editChapter, setEditChapter] = useState(false);
  const { user } = useContext(UserContext);
  return (
    <>
      {user && user.uid === data.authorId && (
        <button
          className="py-1 rounded px-2 bg-blue-500 text-white float-right mt-10 mr-10"
          onClick={() => {
            setEditChapter((s) => !s);
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
          Edit
        </button>
      )}
      {data && (
        <div className="w-5/6 mx-auto py-10">
          <div className="w-full">
            <h2 className="font-bold text-3xl">{data.bookTitle}</h2>
            <h2 className="text-xl font-bold mt-1">{data.title}</h2>
            <p className="leading-loose mt-3">{data.content}</p>
          </div>

          <div className="flex md:w-1/2 w-full mt-10 mx-auto justify-between">
            <Link
              href={`/${data.bookId}/chapters/${(
                parseInt(data.chapter) - 1
              ).toString()}`}
              passHref
            >
              <button
                className="px-2 py-1 rounded shadow bg-green-500 text-white"
                disabled={data.chapter === "1"}
              >
                <FontAwesomeIcon icon={faAnglesLeft} className="mr-2" />
                Back
              </button>
            </Link>

            <Link href={`/${data.bookId}/chapters`} passHref>
              <button className="px-2 py-1 rounded shadow bg-green-500 text-white">
                Chapters
                <FontAwesomeIcon icon={faList} className="ml-2" />
              </button>
            </Link>

            <Link
              href={`/${data.bookId}/chapters/${(
                parseInt(data.chapter) + 1
              ).toString()}`}
              passHref
            >
              <button
                className="px-2 py-1 rounded shadow bg-green-500 text-white"
                disabled={parseInt(data.chapter) === data.chapCount}
              >
                Next
                <FontAwesomeIcon icon={faAnglesRight} className="ml-2" />
              </button>
            </Link>
          </div>
        </div>
      )}
      {editChapter && (
        <div
          className="fixed top-0 left-0 w-full h-screen backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
        >
          <AddNewChapter
            setAddChapter={setEditChapter}
            novelId={data.bookId}
            currentChapter={data.chapter}
            bookTitle={data.bookTitle}
            initialValues={{
              title: data.title,
              content: data.content,
              chapter: data.chapter,
            }}
          />
        </div>
      )}
    </>
  );
};

export default Chapter;
