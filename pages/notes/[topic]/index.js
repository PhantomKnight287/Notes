import { allNotes as allNote } from ".contentlayer/generated";
import { Title, Input } from "@mantine/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaCode } from "react-icons/fa";
import { useState } from "react";

export default function Types({ allNotes, topic }) {
  const filteredNotes = allNotes.sort((a, b) => (a.id > b.id ? 1 : -1));
  const [searched, setSearched] = useState("");
  const router = useRouter();
  const filteredNotesForSearch =
    searched.length > 0
      ? filteredNotes.filter((note) =>
          note.title.toLowerCase().includes(searched.toLowerCase())
        )
      : filteredNotes;
  return (
    <>
      <Head>
        <title>{`Notes on ${topic}`}</title>
        <meta name="description" content={`Notes on ${topic}`} />
        <meta property="og:title" content={`Notes on ${topic}`} />
        <meta property="og:description" content={`Notes on ${topic}`} />
        <meta
          property="og:image"
          content={`/data/notes/${topic}/${topic}.png`}
        />
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Input
          icon={<FaCode />}
          variant="filled"
          placeholder="Search Notes"
          radius="xl"
          size="lg"
          style={{
            margin: "2rem 0rem",
          }}
          onChange={(e) => setSearched(e.target.value)}
        />
        {allNotes && filteredNotesForSearch.length > 0 ? (
          filteredNotesForSearch.map((note, index) => {
            return (
              <div
                className="infoHolder"
                onClick={() => {
                  router.push(`/notes/${note.topic}/${note.slug}`);
                }}
                key={index}
              >
                <h2>{note.title}</h2>
                <p>{note.desc}</p>
              </div>
            );
          })
        ) : (
          <>
            <Title
              order={3}
              style={{
                textAlign: "center",
                fontFamily: "Fira Mono",
                marginTop: "2rem",
              }}
            >
              No Notes Found
            </Title>
          </>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const allNotes = allNote.filter((note) => note.topic === params.topic);
  return {
    props: {
      allNotes: allNotes || [],
      topic: allNotes[0].topic,
    },
  };
}
