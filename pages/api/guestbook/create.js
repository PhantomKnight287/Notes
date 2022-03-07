import { prisma } from "../../../lib/db";
import axios from "axios";
/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function Handler(req, res) {
  const { comment, name } = req.body;
  let replied = false;
  try {
    await prisma.guestBook
      .create({
        data: {
          comment,
          name,
        },
      })
      .catch(async (err) => {
        console.log(err);
        replied = true;
        return res.status(500).send({ message: "An Error Occured" });
      });

    await axios.post(
      `${process.env.webhookUrl}`,
      JSON.stringify({
        username: "PhantomNotes Guestbook",
        content: "New Guestbook Comment Added",
        embeds: [
          {
            title: "New GuestBook Message",
            color: 0xff00ff,
            fields: [
              {
                name: "Content",
                value: `\`${comment}\``,
              },
              {
                name: "Name",
                value: `\`${name}\``,
              },
            ],
          },
        ],
      }),
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!replied) {
      return res.status(200).send({ message: "Comment Added Successfully!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
}
