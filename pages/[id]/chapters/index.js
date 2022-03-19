import {
  query,
  getDocs,
  getDoc,
  collection,
  orderBy,
  doc,
} from "firebase/firestore";
import Chapters from "../../../components/Chapters";
import { db } from "../../../firebase-config";

export async function getStaticPaths() {
  const resp = await getDocs(collection(db, "WebNovels"));
  const data = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  const paths = data.map((item) => ({
    params: { id: item.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const resp = await getDocs(
    query(
      collection(db, "WebNovels", context.params.id, "chapters"),
      orderBy("chapter")
    )
  );

  const bookResp = await getDoc(doc(db, "WebNovels", context.params.id));

  const data = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return {
    props: {
      data,
      novelId: context.params.id,
      bookTitle: bookResp.data().title,
    },
  };
}

const chapters = ({ data, novelId, bookTitle }) => {
  return <Chapters data={data} novelId={novelId} bookTitle={bookTitle} />;
};

export default chapters;
