import Head from "next/head";
import { useState } from "react";
import List from "../components/List";
import Modal from "../components/Model";
import Navbar from "../components/Navbar";

export default function Home() {
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <Head>
        <title>Shared Transition Animation</title>
        <meta name="description" content="Shared Transition Animation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <List setSelected={setSelected} />
      <Modal selected={selected} setSelected={setSelected} />
    </div>
  );
}