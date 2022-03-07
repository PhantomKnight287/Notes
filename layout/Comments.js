import { Drawer, Button, Modal, useMantineTheme, Title } from "@mantine/core";
import { useState, useEffect } from "react";
import { CommentForm } from "./CommentForm";
import Axios from "axios";
import { toast } from "react-toastify";
import { parseISO, format } from "date-fns";
import Link from "next/link";

export default function CommentLayout({ id, topic }) {
  const [opened, setOpened] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const theme = useMantineTheme();
  const submitHandler = () => {
    if (!comment.length > 0) {
      return toast.error("Please Type Your Comment!");
    }
    const obj = {
      noteId: id,
      topic,
      comment,
    };
    Axios.post("/api/comments/create", obj)
      .then((_) => {
        fetchComments();
        toast.success("Thanks for Your Comment!");
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("An Error Occured");
        }
      });
  };
  const fetchComments = () => {
    if (!drawerOpened) return;
    Axios.post("/api/comments/get", { id })
      .then((data) => {
        setComments(data.data.comments);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("An Error Occured");
        }
      });
  };
  useEffect(() => {
    fetchComments();
  }, [drawerOpened]);
  return (
    <>
      <Button variant="outline" onClick={() => setOpened(true)}>
        Post A Comment
      </Button>
      <Button variant="outline" onClick={() => setDrawerOpened(true)}>
        View Comments
      </Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.95}
        size="md"
        centered
      >
        <CommentForm
          comment={comment}
          setComment={setComment}
          submitHandler={submitHandler}
        />
      </Modal>
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        padding="xl"
        size="xl"
        title="Comments"
      >
        {comments ? (
          comments.map((comment) => {
            return (
              <>
                <div
                  key={comment.id}
                  style={{
                    border: "2px solid yellow",
                    borderRadius: "25px 20px",
                    textAlign: "center",
                    padding: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {comment.comment}
                  <p
                    style={{
                      marginBottom: "0.2rem",
                      color: "grey",
                    }}
                  >
                    Created At{" "}
                    {format(parseISO(comments[0].createdAt), "LLLL d, yyyy")}
                  </p>
                </div>
              </>
            );
          })
        ) : (
          <Title order={4}>No Comments Found</Title>
        )}
      </Drawer>
    </>
  );
}
