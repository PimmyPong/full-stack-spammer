import NewPost from "@/components/NewPost.jsx";
import PostFromAll from "@/components/PostFromAll.jsx";

export const dynamic = "force-dynamic";

export default function Home() {
	return (
		<div>
			<h1 className="header">⁛ SpammeR ⁛</h1>
			<NewPost />
			<PostFromAll />
		</div>
	);
}
