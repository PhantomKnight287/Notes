import {
  Header,
  Avatar,
  Title,
  Drawer,
  useMantineColorScheme,
  Button,
} from "@mantine/core";
import { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useRouter } from "next/router";

const Routes = [
  {
    name: "Snippets",
    route: "/snippets",
  },
  {
    name: "Notes",
    route: "/notes",
  },
  {
    name:"GuestBook",
    route:"/guestbook"
  }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const router = useRouter();
  const dark = colorScheme === "dark";
  return (
    <>
      <Header
        padding="xs"
        style={{
          paddingLeft: "2rem",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
            onClick={() => {
              if (router) router.push("/");
            }}
          >
            <Avatar
              src="/icons/icon.png"
              alt="Icon"
              size={"lg"}
              radius={"lg"}
            />
            <Title order={3} style={{ paddingLeft: "0.5rem" }}>
              PhantomNotes
            </Title>
          </div>
        </div>
        <TiThMenu
          size={30}
          cursor="pointer"
          onClick={() => {
            setOpen(!open);
          }}
        />
      </Header>
      <Drawer
        opened={open}
        onClose={() => setOpen(false)}
        padding="xl"
        size="xl"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title order={3}>Toggle Theme</Title>
          <Button variant="light" onClick={() => toggleColorScheme()}>
            {dark ? <BsFillSunFill /> : <BsFillMoonFill />}
          </Button>
        </div>
        {Routes &&
          Routes.map((route, index) => {
            return (
              <div
                key={index}
                style={{
                  marginTop: "2rem",
                  border: "2px solid grey",
                  padding: "4px",
                  borderRadius: "25px",
                  textAlign: "center",
                }}
                onClick={() => {
                  setOpen(false)
                  router.push(route.route);
                }}
              >
                <Title
                  style={{
                    cursor: "pointer",
                  }}
                  order={3}
                >
                  {route.name}
                </Title>
              </div>
            );
          })}
      </Drawer>
    </>
  );
}
