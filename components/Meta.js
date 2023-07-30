import Head from "next/head";
const Meta = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <link
          rel="icon"
          type="image/png"
          href="/assets/jpg/icons8-home-48.png"
        ></link>
      </Head>
    </>
  );
};

export default Meta;
