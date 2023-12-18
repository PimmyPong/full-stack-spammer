"use client";
// import { API } from "@/lib/API.js";
// import { useRouter } from "next/navigation.js";
import { useEffect, useState } from "react";

export default function Comments({ post }) {
	// const router = useRouter();
	const [displayComments, setDisplayComments] = useState({ comments: [] });

	async function fetchComments() {
		const response = await fetch(`/api/posts/${post.id}/comments`, {
			cache: "no-store",
		});
		const info = await response.json();

		setDisplayComments(info);
		// router.refresh();
	}

	useEffect(() => {
		fetchComments();
	}, [displayComments]);

	return (
		<div>
			<div className="comment-con">
				<h4>COMMENTS:</h4>
				{displayComments.comments.map((displayComment) => (
					<div key={displayComment.id}>
						<ul>
							<li>{displayComment.text}</li>
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
