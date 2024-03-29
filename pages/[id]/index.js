import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import Book from "../../components/Book";
import Head from "next/head";
import { db } from "../../firebase-config";

export async function getStaticPaths() {
  const resp = await getDocs(collection(db, "WebNovels"));
  const data = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  const paths = data.map((item) => ({
    params: { id: item.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
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
  return (
    <>
      {data && (
        <Head>
          <title>{data.title}</title>
          <meta name="description" content={data.title} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}
      <Book data={data} />
    </>
  );
};

export default book;
