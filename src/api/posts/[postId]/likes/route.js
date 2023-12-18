import { NextResponse } from "next/server.js";
import { prisma } from "@/lib/prisma.js";

export default async function POST(request, response) {
	try {
		const { postId } = response.params;

		// Find the post
		const post = await prisma.post.findFirst({ where: { id: postId } });

		// If the post doesn't exist, return an error response
		if (!post) {
			return NextResponse.json({
				success: false,
				error: "The id does not exist",
			});
		}

		// Update the likes count
		const updatedPost = await prisma.post.update({
			where: { id: postId },
			data: { likes: { increment: 1 } },
		});

		// Return a success response
		return NextResponse.json({ success: true, updatedPost });
	} catch (error) {
		// Handle any errors that occurred during the try block
		return NextResponse.json({ success: false, error: error.message });
	}
}
