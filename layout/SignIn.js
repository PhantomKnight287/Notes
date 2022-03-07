import { Button } from "@mantine/core";
export default function SignIn({ signIn }) {
  return (
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
        }
        @media only screen and (max-width: 600px) {
          .signInMessageHolder {
            width: 96%;
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
        <h3>Sign In To Leave a Comment</h3>
        <Button
          variant="subtle"
          style={{
            border: "2px solid aqua",
            borderRadius: "25px 10px",
            transition: "background-color 0.2s",
          }}
          onClick={() => signIn()}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
