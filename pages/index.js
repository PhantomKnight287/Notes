import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Title, Center, Text } from "@mantine/core";
import Image from "next/image";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>PhantomNotes</title>
        <meta
          name="description"
          content="Notes By PhantomKnight287 aka Gurpal Singh"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="PhantomNotes" />
        <meta
          property="og:description"
          content="Notes By PhantomKnight287 aka Gurpal Singh"
        />
        <meta property="og:image" content="/icons/icon.png" />
      </Head>
      <Center>
        <Title order={2} style={{ marginTop: "2rem" }}>
          About Me
        </Title>
      </Center>
      <style jsx>
        {`
          .introHolder {
            margin: 50px 0px;
            width: 50%;
            font-family: Fira Mono;
          }
          .introHolder p {
            font-family: Fira Mono;
            margin-right: 2rem;
            font-size: 1.3rem;
          }
          .contentHolder {
            display: flex;
            flex-direction: row;
            align-items:center;
            justify-content:center;
          }
          .contentHolder img {
            border-radius: 15px;
            height: 250px;
            width: 250px;
          }
          @media only screen and (max-width:650px){
            .contentHolder{
              flex-direction: column-reverse;
            }
            .introHolder {
              width:100%;
            }
          }
        `}
      </style>
      <div className="contentHolder">
        <div className="introHolder">
          <h2>Hello 👋</h2>
          <p>
            I am Gurpal Singh aka PhantomKnight287. I am from India and I am a
            full stack Web Developer. I&apos;ve made this project to help others with
            my notes and keep them organised at one place.
          </p>
          <p>
            This site contains all the notes I made while learning things like Reactjs, Nextjs etc.
          </p>
        </div>
        <img
          src="https://blogverse.vercel.app/images/common/myself.jpg"
          alt="myself"
        />
      </div>
    </div>
  );
}
