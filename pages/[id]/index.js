import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import BookEditor from "../../components/BookEditor";
import { db } from "../../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faPenToSquare,
  faTrashCan,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

export async function getServerSideProps(context) {
  const resp = await getDoc(doc(db, "WebNovels", context.params.id));
  const data = { ...resp.data(), id: resp.id };

  if (!resp.exists()) {
    return {
      notFound: true,
    };
  }

  return { props: { data } };
}

const book = ({ data }) => {
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  const deleteBook = async () => {
    await deleteDoc(doc(db, "WebNovels", data.id));
    window.location.pathname = "/";
  };
  return (
    <div className="w-5/6 mx-auto pt-10">
      <button
        className="shadow border-2 py-1 px-2 mb-5"
        onClick={() => {
          router.push("/");
        }}
      >
        <FontAwesomeIcon icon={faArrowLeftLong} className="mr-1" />
        Back
      </button>
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <img src={data.img} className="w-3/4" alt="" />
        </div>
        <div className="col-span-2">
          <h1 className="text-3xl font-bold mb-10">{data.title}</h1>
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Description</h2>
            <div>
              <button
                className="bg-blue-500 py-1 text-white rounded px-4"
                onClick={() => {
                  setEdit(true);
                }}
              >
                <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
                Edit
              </button>
              <button
                className="bg-red-500 py-1 px-2 rounded text-white ml-2"
                onClick={deleteBook}
              >
                <FontAwesomeIcon icon={faTrashCan} className="mr-1" />
                Delete
              </button>
            </div>
          </div>
          <p className="mt-5 leading-relaxed text-lg">{data.synposis}</p>
          <Link href={`/${data.id}/chapters`}>
            <button className="py-1 px-3 mt-5 rounded text-xl bg-green-500 text-white">
              Read Now
              <FontAwesomeIcon icon={faArrowRightLong} className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
      {edit && (
        <div
          className="absolute top-0 left-0 w-full h-screen backdrop-blur-sm"
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
  );
};

export default book;
