import { collection, getDocs } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { db } from "../firebase-config";

export async function getStaticProps() {
  const resp = await getDocs(collection(db, "WebNovels"));
  const data = resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return {
    props: { data },
  };
}

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Amateur Translator</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="md:w-5/6 mx-auto py-10">
        <div className="grid md:grid-cols-4 grid-cols-1 gap-y-10">
          {data.map((item) => (
            <Link href={`/${item.id}`} passHref key={item.id}>
              <div className="col-span-1 flex justify-center cursor-pointer">
                <div className="shadow-lg w-[230px] border-2">
                  <img src={item.img} className="w-full h-[300px]" alt="" />
                  <h2 className="mx-5 my-2 text-ellipsis overflow-hidden whitespace-nowrap">
                    {item.title}
                  </h2>
                  <h2 className="mx-5 my-2 text-md font-bold text-green-700 text-ellipsis overflow-hidden whitespace-nowrap">
                    {item.authorName}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
