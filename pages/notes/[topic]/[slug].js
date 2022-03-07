import { allNotes } from ".contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import Comments from "../../../layout/Comments";
import Image from "next/image";
import Head from "next/head";

const Img = (props) => {
  return <Image src={props.src} alt={props.alt} width={500} height={20} />;
};
export default function PostComponent({ post }) {
  const Component = useMDXComponent(post.body.code);

  return (
    <div className="note-body">
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.desc} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.desc} />
        <meta property="og:image" content={post.ogImage} />
      </Head>
      <Component components={{ Image: Img }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const post = allNotes.find(
    (note) => note.slug === params.slug && note.topic === params.topic
  );

  return {
    props: {
      post,
    },
  };
}
