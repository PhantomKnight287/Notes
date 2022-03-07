import { Button, Input } from "@mantine/core";
import { useState } from "react";

export default function CreateMessage({ stateUpdate }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <style jsx>{`
          .signInMessageHolder {
            width: 50%;
            padding: 1rem;
          }
          @media only screen and (max-width: 800px) {
            .signInMessageHolder {
              width: auto;
              margin:1rem;
            }
          }
        `}</style>
        <div
          style={{
            textAlign: "center",
            fontFamily: "Fira Mono",
            border: "2px solid #d72121",
            borderRadius: "25px",
            paddingBottom: "1rem",
          }}
          className="signInMessageHolder"
        >
          <h3
            style={{
              textTransform: "capitalize",
            }}
          >
            Share A Message for the visitors of this site.
          </h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await stateUpdate(message, setLoading);
            }}
          >
            <Input
              placeholder="Your Message..."
              required
              style={{
                marginBottom: "1rem",
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              variant="subtle"
              style={{
                border: "2px solid aqua",
                borderRadius: "25px 10px",
                transition: "background-color 0.2s",
              }}
              loading={loading}
              onClick={async () => {
                await stateUpdate(message, setLoading);
              }}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
