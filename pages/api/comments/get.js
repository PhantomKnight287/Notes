import { prisma } from "../../../lib/db";
export default async function CommentsGrabber(req, res) {
  const { id } = req.body;
  const comments = await prisma.comments
    .findMany({
      where: {
        noteId: id,
      },
    })
    .catch(() => {
      prisma.$disconnect();
      return res
        .status(500)
        .send({ message: "An Error Occured While Fetching Comments!" });
    });
  prisma.$disconnect();

  return res.status(200).send({ comments: comments });
}
