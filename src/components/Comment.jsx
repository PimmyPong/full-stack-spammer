"use client";
// import { API } from "@/lib/API.js";
import { useRouter } from "next/navigation.js";
import { useState } from "react";
export default function Comment({ post, setIsComment }) {
	const [textComment, setTextComment] = useState([]);
	// const [isComment, setIsComment] = useState(false);
	const router = useRouter();

	//Comment
	async function handleComment(e) {
		e.preventDefault();

		//POST
		const response = await fetch(
			`/api/posts/${post.id}/comments`,

			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					text: `${textComment}`,
				}),
			}
		);
		const info = await response.json();

		setIsComment(false);
		router.refresh();
	}

	//Cancel
	async function handleCancel() {
		setIsComment(false);
	}

	return (
		<div>
			<form>
				<textarea
					className="editBox"
					value={textComment}
					placeholder="Enter Comment..."
					type="text"
					onChange={(e) => setTextComment(e.target.value)}
				/>
				<div className="edit-comment-btnCon">
					<span className="edit-btn" onClick={handleComment}>
						Comment
					</span>
					<span className="edit-btn" onClick={handleCancel}>
						Cancel
					</span>
				</div>
			</form>
		</div>
	);
}
