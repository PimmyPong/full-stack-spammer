"use client";
// import { API } from "@/lib/API.js";
import { useRouter } from "next/navigation.js";
import Edit from "./Edit.jsx";
import { useState } from "react";
import Comment from "./Comment.jsx";
import Comments from "./Comments.jsx";

export default function Post({ post }) {
	const [isEdit, setIsEdit] = useState(false);
	const [isComment, setIsComment] = useState(false);
	const router = useRouter();
	//DELETE
	async function handleDelete() {
		const response = await fetch(`/api/posts/${post.id}`, {
			method: "DELETE",
		});
		router.refresh();
	}

	//LIKE
	async function handleLike() {
		const response = await fetch(`/api/posts/${post.id}/likes`, {
			method: "POST",
			cache: "no-store",
		});
		// number of like wont update if no router.refresh
		router.refresh();
	}
	return (
		<div>
			<div className="post">
				<h2>POSTS:</h2>
				<div key={post.id}>
					<br />

					{isEdit ? (
						<Edit post={post} setIsEdit={setIsEdit} />
					) : (
						<div className="postText">{post.text}</div>
					)}

					{isComment && <Comment post={post} setIsComment={setIsComment} />}

					<div className="btn-con">
						<span className="like">{post.likes}</span>

						<span className="cursor" onClick={handleLike}>
							👍🏻
						</span>

						<span
							className="cursor"
							onClick={() => {
								setIsComment(true);
							}}>
							💬
						</span>

						<span
							className="cursor"
							onClick={() => {
								setIsEdit(true);
							}}>
							✏️
						</span>

						<span className="cursor" onClick={handleDelete}>
							🗑️
						</span>
					</div>
				</div>
			</div>
			<div className="comments">
				<div>
					<Comments post={post} />
				</div>
			</div>
		</div>
	);
}
