import Head from "next/head";
import { allIntros } from ".contentlayer/generated";
import { useRouter } from "next/router";
import { useMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";

function Links(props) {
  return (
    <Link href={props.href}>
      <a
        style={{
          borderRadius: "10px",
          margin: "10px",
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
          textDecoration: "none",
          boxShadow: "0px 0px 10px #333",
          border: "1px solid #333",
          padding:"1rem 3rem"
        }}
      >
        {props.children}
      </a>
    </Link>
  );
}

export default function NotesIntro() {
  const router = useRouter();
  const Component = useMDXComponent(allIntros[0].body.code);
  return (
    <div className="note-body">
      <Head>
        <title>PhantomNotes</title>
        <meta
          name="description"
          content="PhantomNotes is a collection of Notes."
        />
        <meta property="og:title" content="PhantomNotes" />
        <meta
          property="og:description"
          content="PhantomNotes is a collection of Notes."
        />
      </Head>
      <Component components={{ Link: Links }} />
    </div>
  );
}
