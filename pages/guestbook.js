import Head from "next/head";
import { Title, Text } from "@mantine/core";
import { useSession, signIn } from "next-auth/react";
import SignIn from "../layout/SignIn";
import CreateMessage from "../layout/CreateMessage";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { parseISO, format } from "date-fns";

export default function GuestBook() {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const handleSubmit = async (comment, setLoading) => {
    if (!session.user) return;
    const body = {
      comment,
      name: session.user.name,
    };
    if (!comment.length) {
      return toast.error("Please Type something in Comment Box.");
    }
    axios
      .post("/api/guestbook/create", body)
      .then((res) => {
        fetchComments();
        toast.success("Your Message is Posted!");
      })
      .catch((_) => {
        toast.error("An Error Occured");
      });
    setLoading(false);
    return;
  };
  const fetchComments = () => {
    axios
      .get("/api/guestbook/get")
      .then((res) => {
        setComments(res.data.entries);
      })
      .catch((err) => {
        // console.log(err);
        // toast.error("An Error Occured!")
      });
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <>
      <Head>
        <title>Guestbook</title>
        <meta
          name="description"
          content="Sign this Guestbook and share your wisdom."
        />
        <meta property="og:title" content="GuestBook" />
        <meta
          property="og:description"
          content="Sign this Guestbook and share your wisdom."
        />
        <meta property="og:image" content="/icons/icon.png" />
      </Head>
      <div>
        <Title
          order={2}
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontFamily: "Fira Mono",
          }}
        >
          GuestBook
        </Title>
        <Text
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontFamily: "Fira Mono",
          }}
        >
          Leave A Comment Below
        </Text>
        {!session && <SignIn signIn={signIn} />}
        {session && <CreateMessage stateUpdate={handleSubmit} />}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Fira Mono",
            textAlign: "center",
          }}
        >
          {comments &&
            comments.map((comment) => {
              return (
                <div
                  key={comment.id}
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    marginBottom: "1rem",
                    borderBottom: "2px solid grey",
                    borderRadius: "10px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "sans-serif",
                    }}
                  >
                    {comment.comment}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "0.8rem",
                      color: "grey",
                      flexW: "wrap",
                    }}
                  >
                    <span style={{ marginRight: "5px" }}>{comment.name}</span>
                    {" / "}
                    <span
                      style={{
                        marginLeft: "5px",
                      }}
                    >
                      {format(
                        parseISO(comment.createdAt),
                        "LLLL d, yyyy hh:mm:ss"
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
