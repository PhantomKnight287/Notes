import { allSnippets } from ".contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
const Img = (props) => {
  return <Image src={props.src} alt={props.alt} width={500} height={20} />;
};
export default function Test(post) {
  const Component = useMDXComponent(post.post.body.code);
  return (
    <div className="note-body">
      <Component components={{ Image: Img }} />
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: allSnippets.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const post = allSnippets.find((p) => p.slug === params.slug);
  return {
    props: {
      post: post ? post : null,
    },
  };
}
