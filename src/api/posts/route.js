import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function GET() {
	const posts = await prisma.post.findMany({
		orderBy: { createdAt: "desc" },
	});
	return NextResponse.json({ success: true, posts });
}

export async function POST(request, response) {
	//It checks if the text is missing, and if so, it returns a JSON response indicating a failure with an error message.
	try {
		const { text } = await request.json();

		if (!text) {
			return NextResponse.json({
				success: false,
				error: "Please Enter Your Post",
			});
		}

		//prevent duplicate post
		const foundText = await prisma.post.findFirst({ where: { text } });
		if (foundText) {
			return NextResponse.json({
				success: false,
				error: "Your post is duplicate. Please provide a new post.",
			});
		}
		//If the text is valid and doesn't already exist, it creates a new post in data base
		const post = await prisma.post.create({ data: { text } });

		return NextResponse.json({ success: true, post });
	} catch (error) {
		return NextResponse.json({ success: false, error: error.message });
	}
}
