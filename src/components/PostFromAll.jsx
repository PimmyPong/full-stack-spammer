// import { API } from "@/lib/API.js";
import Post from "./Post.jsx";
import { prisma } from "@/lib/prisma.js";

export default async function PostFromAll() {
	// fetch all posts from server
	//GET
	// const response = await fetch(`${API}/api/posts`, { cache: "no-store" });
	// const info = await response.json();

	const posts = await prisma.post.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<div>
			{posts.map((post) => {
				return <Post key={post.id} post={post} />;
			})}
		</div>
	);
}

//map all text
// bc this page will be too big so create new components -Post.jsx -
