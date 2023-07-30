import Layout from "@/components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/index.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head></Head>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </>
  );
}
