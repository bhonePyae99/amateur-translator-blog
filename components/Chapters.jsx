import { useState, useEffect } from "react";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import AddNewChapter from "./AddNewChapter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import ChapterSelect from "./ChapterSelect";

const Chapters = ({ novelId, bookTitle, chapCount }) => {
  const router = useRouter();
  const chapters = _.range(1, chapCount + 1);

  const [displayChapters, setDisplayChapters] = useState(
    _.chunk(chapters, 50)[0]
  );
  const [currentChapter, setCurrentChapter] = useState(0);
  useEffect(() => {
    if (chapCount === 0) setCurrentChapter("1");
    else {
      let chap = chapCount;
      chap = chap + 1;
      setCurrentChapter(chap.toString());
    }
  }, [chapCount]);
  const [addChapter, setAddChapter] = useState(false);
  return (
    <div className="w-5/6 mx-auto py-10">
      <button
        className="px-2 py-1 rounded border-4 shadow float-left"
        onClick={() => {
          router.push(`/${novelId}`);
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

      <div className="mt-20">
        <ChapterSelect
          items={chapters}
          setDisplayChapters={setDisplayChapters}
        />
      </div>

      <ul className="list-none mt-10">
        {/* {data.map((item) => (
          <Link href={`/${novelId}/chapters/${item.id}`} passHref key={item.id}>
            <li className="p-2 border-l-2 border-l-white cursor-pointer shadow hover:border-l-blue-500">
              {item.title}
            </li>
          </Link>
        ))} */}
        {displayChapters.map((item) => (
          <Link
            href={`/${novelId}/chapters/${item.toString()}`}
            passHref
            key={item}
          >
            <li className="p-2 border-l-2 border-l-white cursor-pointer shadow hover:border-l-blue-500">
              {item}
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
