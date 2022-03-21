import {
  faAnglesRight,
  faAnglesLeft,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase-config";

export async function getStaticPaths() {
  const resp = await getDocs(collection(db, "WebNovels"));
  const data = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const ids = data.map((item) => item.id);
  let paths = [];
  const getChapters = async (id) => {
    const resp = await getDocs(collection(db, "WebNovels", id, "chapters"));
    const data = resp.docs.map((item) => ({ ...item.data(), id: item.id }));
    return data;
  };

  for (let i = 0; i < ids.length; i++) {
    const data = await getChapters(ids[i]);
    for (let j = 0; j < data.length; j++) {
      paths.push({ params: { id: ids[i], chapter: data[j].id } });
    }
  }
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const resp = await getDoc(
    doc(
      collection(db, "WebNovels", context.params.id, "chapters"),
      context.params.chapter
    )
  );

  const bookResp = await getDoc(
    doc(collection(db, "WebNovels"), context.params.id)
  );

  if (!resp.exists()) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...resp.data(),
        chapter: resp.id,
        bookId: context.params.id,
        chapCount: bookResp.data().chapCount,
      },
    },
  };
}

const chapter = ({ data }) => {
  return (
    <>
      {data && (
        <div className="w-5/6 mx-auto pt-10">
          <div className="w-full">
            <h2 className="font-bold text-3xl">{data.bookTitle}</h2>
            <h2 className="text-2xl font-bold mt-1">{data.title}</h2>
            <p className="leading-loose mt-5">{data.content}</p>
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

            <button className="px-2 py-1 rounded shadow bg-green-500 text-white">
              Chapters
              <FontAwesomeIcon icon={faList} className="ml-2" />
            </button>

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
    </>
  );
};

export default chapter;
