"use client";
// import { API } from "@/lib/API.js";
import { useRouter } from "next/navigation.js";
import { useState } from "react";
export default function Edit({ post, setIsEdit }) {
	const [textEdit, setTextEdit] = useState(post.text); //edit.text to appear text you want to edit
	const router = useRouter();

	async function handleEdit(e) {
		e.preventDefault();
		//condition to make sure you type something
		if (!textEdit) {
			setTextEdit("Enter edit");
		} else {
			//PUT-Update
			const response = await fetch(`/api/posts/${post.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					text: `${textEdit}`,
				}),
			});
			// can comment const info and it worked
			const info = await response.json();

			setIsEdit(false);
			router.refresh();
		}
	}

	async function handleCancel() {
		setIsEdit(false);
	}

	return (
		<div>
			<form>
				<textarea
					className="editBox"
					type="text"
					value={textEdit}
					onChange={(e) => setTextEdit(e.target.value)}
				/>
				<div className="edit-comment-btnCon">
					<span className="edit-btn" onClick={handleEdit} type="button">
						Edit
					</span>
					<span className="edit-btn" onClick={handleCancel} type="button">
						Cancel
					</span>
				</div>
			</form>
		</div>
	);
}
