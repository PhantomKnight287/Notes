import { Title, Input } from "@mantine/core";
import { allSnippets } from ".contentlayer/generated";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCode } from "react-icons/fa";
import Head from "next/head";
export default function AllSnippets() {
  const [snippets, setSnippets] = useState(allSnippets);
  const [searched, setSearched] = useState("");
  const filteredCodeSnippets =
    searched.length > 0
      ? snippets.filter((post) =>
          post.title.toLowerCase().includes(searched.toLowerCase())
        )
      : snippets;
  const router = useRouter();
  return (
    <div className="note-body">
      <Head>
        <title>Code Snippets</title>
        <meta
          name="description"
          content="Code Snippets to make your life easier"
        />
        <meta property="og:title" content="Code Snippets" />
        <meta
          property="og:description"
          content="Code Snippets to make your life easier"
        />
        <meta property="og:image" content="/data/snippets/hook.jpg" />
      </Head>
      <style jsx>
        {`
          .infoHolder {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: Fira Mono;
            cursor: pointer;
            width: 50%;
            border-radius: 25px;
            border: 2px solid yellow;
            padding: 2rem;
            margin-top:2rem;
          }
          .align {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          @media only screen and (max-width:600px){
            .infoHolder{
              width:96%
            }
          }
        `}
      </style>
      <div className="align">
        {snippets && (
          <Input
            icon={<FaCode />}
            variant="filled"
            placeholder="Search Snippets"
            radius="xl"
            size="lg"
            style={{
              marginBottom: "2rem",
            }}
            onChange={(e) => setSearched(e.target.value)}
          />
        )}
        {filteredCodeSnippets && filteredCodeSnippets.length > 0 ? (
          filteredCodeSnippets.map((snippet, index) => {
            return (
              <div
                className={"infoHolder"}
                onClick={() => {
                  router.push(`/snippets/${snippet.slug}`);
                }}
                key={index}
              >
                <Title order={2}>{snippet.title}</Title>
                {snippet.description}
              </div>
            );
          })
        ) : (
          <>
            <Title order={3}>No Snippets Found</Title>
          </>
        )}
      </div>
    </div>
  );
}
