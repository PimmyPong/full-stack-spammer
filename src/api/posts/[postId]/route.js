import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
//PUT update post
export async function PUT(request, response) {
	try {
		const { postId } = response.params;
		const { text } = await request.json();
		//find post with specific id - postID
		const post = await prisma.post.findFirst({ where: { id: postId } });
		//if no post is found, it returns false with error message
		if (!post) {
			return NextResponse.json({
				success: false,
				error: "No post found with that ID .",
			});
		}
		// if post is found, it updates a post in date base
		const textUpdate = await prisma.post.update({
			where: { id: postId },
			data: { text: text },
		});

		return NextResponse.json({
			success: true,
			posts: textUpdate,
		});
	} catch (error) {
		return NextResponse.json({ success: false, error: error.message });
	}
}

export async function DELETE(request, response) {
	try {
		const { postId } = response.params;

		const post = await prisma.post.findFirst({
			where: {
				id: postId,
			},
		});
		//If no post is found, it returns a false
		if (!post) {
			return NextResponse.json({
				success: false,
				error: "No post found with that ID .",
			});
		}
		//If a post is found, it deletes the post
		const deletedPost = await prisma.post.delete({
			where: {
				id: postId,
			},
		});

		return NextResponse.json({ success: true, post: deletedPost });
	} catch (error) {
		return NextResponse.json({ success: false, error: error.message });
	}
}
