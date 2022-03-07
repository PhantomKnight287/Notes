import { Title, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { toast } from "react-toastify";
import axios from "axios";
export function CommentForm({ comment, setComment, submitHandler }) {
  return (
    <>
      <Title order={4} style={{ textAlign: "center" }}>
        Post A Comment
        <form onSubmit={submitHandler}>
          <Textarea
            placeholder="Your comment"
            label="Your comment"
            variant="filled"
            radius="lg"
            size="md"
            required
            spellCheck={false}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="outline"
            style={{
              marginTop: "2rem",
            }}
            onClick={submitHandler}
          >
            Post Comment
          </Button>
        </form>
      </Title>
    </>
  );
}
