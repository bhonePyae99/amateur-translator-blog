import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useContext } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import BookEditor from "./BookEditor";
import {
  faArrowLeftLong,
  faPenToSquare,
  faTrashCan,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import UserContext from "../context/UserContext";
const Book = ({ data }) => {
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  const { user } = useContext(UserContext);

  const deleteBook = async () => {
    await deleteDoc(doc(db, "WebNovels", data.id));
    fetch("/api/revalidate?route=home");
    window.location.pathname = "/";
  };
  return (
    <>
      {data && (
        <div className="w-5/6 mx-auto py-10">
          <button
            className="shadow border-2 py-1 px-2 mb-5"
            onClick={() => {
              router.push("/");
            }}
          >
            <FontAwesomeIcon icon={faArrowLeftLong} className="mr-1" />
            Back
          </button>
          <div className="grid md:grid-cols-3 grid-cols-1">
            <div className="col-span-1">
              <img src={data.img} className="md:w-3/4 w-full" alt="" />
            </div>
            <div className="col-span-2">
              <h1 className="text-3xl font-bold mb-3 md:mt-0 mt-10">
                {data.title}
              </h1>
              <h2 className="text-2xl font-semibold mb-3">
                Translator - {data.authorName}
              </h2>
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Description</h2>
                <div>
                  {user && user.uid === data.authorId && (
                    <button
                      className="bg-blue-500 py-1 text-white rounded px-4"
                      onClick={() => {
                        setEdit(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
                      Edit
                    </button>
                  )}
                  {user && user.uid === data.authorId && (
                    <button
                      className="bg-red-500 py-1 px-2 rounded text-white ml-2"
                      onClick={deleteBook}
                    >
                      <FontAwesomeIcon icon={faTrashCan} className="mr-1" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-lg">{data.synposis}</p>
              <Link href={`/${data.id}/chapters`} passHref>
                <button className="py-1 px-3 mt-5 rounded text-xl bg-green-500 text-white">
                  Read Now
                  <FontAwesomeIcon icon={faArrowRightLong} className="ml-2" />
                </button>
              </Link>
            </div>
          </div>
          {edit && (
            <div
              className="fixed top-0 left-0 w-full h-screen backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(0,0,0,0.9)",
              }}
            >
              <BookEditor
                initialValues={{
                  title: data.title,
                  img: data.img,
                  id: data.id,
                  synposis: data.synposis,
                }}
                setEdit={setEdit}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Book;
