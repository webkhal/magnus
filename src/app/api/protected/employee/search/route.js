
import { prisma } from '../../../../../../lib/prisma.js'

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  const employees = query
    ? await prisma.employee.findMany({
        where: {
          OR: [
            {
              firstName: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              lastName: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
      })
    : await prisma.employee.findMany();

  return Response.json(employees);
}
