"use client";
import { API } from "@/lib/API.js";
import { useRouter } from "next/navigation.js";
import { useState } from "react";
export default function NewPost() {
	const [text, setText] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	async function handleSubmit(e) {
		e.preventDefault();
		const res = await fetch(`${API}/api/posts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text, //text is state text
			}),
		});
		const info = await res.json();
		//generating an error!
		if (!info.success) {
			setError(info.error);
		} else {
			setText("");
			router.refresh();
		}
	}
	return (
		<div className="submit">
			{/* <form onSubmit={handleSubmit}> */}
			<textarea
				className="submitBox"
				value={text}
				type="text"
				placeholder="I want the world know..."
				onChange={(e) => setText(e.target.value)}
			/>
			<br />
			<span className="submit-btn" onClick={handleSubmit}>
				Submit Post
			</span>

			<span className="error">{error}</span>
		</div>
	);
}

/*0
create form - input -button
useState text,setText
input onchange - setText
form -onSubmit {handle}
function handleSubmit - e.preventDefault
fetch POST
condition set error
catch:no-store on fetch-in PostFromAll
useRouter refresh (rerun server component)

*/
