import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function GET(request, response) {
	try {
		const { postId } = response.params;
		const comments = await prisma.comment.findMany({
			where: { postId: postId },
		});
		// checks if the returned comments array is empty.
		// If there are no comments, it returns a false response with an error message

		if (comments.length === 0) {
			return NextResponse.json({
				success: false,
				error: "There is no comments in this post.",
			});
		}
		return NextResponse.json({ success: true, comments });
	} catch (error) {
		return NextResponse.json({ success: false, error: error.message });
	}
}

export async function POST(request, response) {
	try {
		const postId = request.params;
		//checks if a post with the specified postId exists
		const post = await prisma.post.findFirst({ where: { postId: postId } });

		if (!post) {
			return NextResponse.json({
				success: false,
				error: "This id is not exist",
			});
		}
		//checks if the text property is present in the JSON body of the request. If not, it returns a failure response with an error message.
		const { text } = await request.json();
		if (!text) {
			return NextResponse.json({
				success: false,
				error: "Please create a text for this post",
			});
		}
		//If the post exists and the text is provided, it creates a new comment
		const comment = await prisma.comment.create({ data: { text, postId } });
		return NextResponse.json({ success: true, comment });
	} catch (error) {
		return NextResponse.json({ success: false, error: error.message });
	}
}
