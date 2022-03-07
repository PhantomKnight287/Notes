import { prisma } from "../../../lib/db";
import axios from "axios";
export default async function CommentsCreater(req, res) {
  const { noteId, comment, topic } = req.body;
  await prisma.comments
    .create({
      data: {
        comment,
        noteId,
        topic,
      },
    })
    .catch((err) => {
      prisma.$disconnect();
      return res
        .status(500)
        .send({ message: "An Error Occured. Please Try Again Later" });
    });
  prisma.$disconnect();
  axios
    .post(
      `${process.env.webhookUrl}`,
      JSON.stringify({
        username: "PhantomNotes",
        content: "New Comment Posted",
        embeds: [
          {
            title: "New Comment Posted",
            color: 0x1ee0eb,
            fields: [
              {
                name: "Comment",
                value: comment,
              },
              {
                name: "Post Id",
                value: noteId,
                inline: true,
              },
              {
                name: "Topic",
                value: topic,
                inline: true,
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
    )
    .catch((err) => {})
    .then(() => {});
  res.status(200).send({ message: "New Comment Added" });
}
