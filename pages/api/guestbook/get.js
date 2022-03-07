import { prisma } from "../../../lib/db";
/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function Handler(req, res) {
  const entries = await prisma.guestBook.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.status(200).send({ entries });
}
