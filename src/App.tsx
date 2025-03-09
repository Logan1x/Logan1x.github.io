import { useState } from "react";

type BioType = "short" | "long";
type LinkType = {
	name: string;
	url: string;
};

function App(): JSX.Element {
	const [activeBio, setActiveBio] = useState<BioType>("short");

	const links: LinkType[] = [
		{
			name: "blog",
			url: "https://logan1x.hashnode.dev/",
		},
		{
			name: "github",
			url: "https://github.com/logan1x",
		},
		{
			name: "twitter",
			url: "https://twitter.com/herkuch",
		},
		{
			name: "bluesky",
			url: "https://bsky.app/profile/logan1x.bsky.social",
		},
		{
			name: "linkedin",
			url: "https://linkedin.com/in/logan1x",
		},
	];

	return (
		<div className="max-w-2xl mx-auto flex flex-col items-center min-h-screen">
			<div className="flex flex-wrap gap-4 items-start justify-between w-full">
				<div className="pt-28">
					<h1 className="text-3xl">Khushal Sharma</h1>
					<h2 className="text-xl">Software Engineer in India</h2>
				</div>
				<div className="rounded-full w-96 h-96 overflow-hidden">
					<img
						src="https://web.archive.org/web/20231228110427im_/https://cassidoo.co/img/face6.jpg"
						alt="Profile picture"
						className="w-full h-full object-cover"
					/>
				</div>
			</div>

			<div className="flex flex-wrap justify-center gap-4 text-lg mt-12">
				{links.map((link) => (
					<a
						key={link.name}
						href={link.url}
						className=" hover:opacity-90 transition-opacity"
					>
						{link.name}
					</a>
				))}
			</div>

			<div>
				<div className="flex justify-center space-x-2 m-4">
					{(["short", "long"] as BioType[]).map((bioType) => (
						<button
							key={bioType}
							onClick={() => setActiveBio(bioType)}
							className={`px-4 rounded-full ${
								activeBio === bioType
									? "border-pink-500 border-2 text-pink-500"
									: "border-gray-500 border-2 text-gray-500"
							} capitalize`}
						>
							{bioType}
						</button>
					))}
				</div>
				<div className=" text-xl">
					{activeBio === "short" && (
						<div>
							<p>
								Hi there! My name is Your Name. I'm a Software Engineer at{" "}
								<a href="#" className="text-indigo-600 underline">
									Company Name
								</a>
								. I enjoy building web applications, learning new technologies,
								and contributing to open source. In my free time, I like hiking,
								reading, and playing the guitar.
							</p>
							<p className="mt-4">
								You should{" "}
								<a href="#" className="text-pink-600 underline">
									check out my projects
								</a>{" "}
								or{" "}
								<a href="#" className="text-green-600 underline">
									read my blog!
								</a>
							</p>
						</div>
					)}

					{activeBio === "long" && (
						<div>
							<p>
								Well hello there! My name is Your Name. I'm a Software Engineer
								with experience in React, Node.js, and cloud technologies.
							</p>

							<p className="mt-4">
								I currently work at{" "}
								<a href="#" className="text-blue-600 underline">
									Company Name
								</a>
								, where I build scalable applications and contribute to our
								design system. Before this, I worked at Previous Company and
								graduated from University Name.
							</p>

							<p className="mt-4">
								I'm passionate about web performance, accessibility, and
								creating great user experiences. In my spare time, I contribute
								to open source projects like{" "}
								<a href="#" className="text-yellow-600 underline">
									Project One
								</a>{" "}
								and{" "}
								<a href="#" className="text-green-600 underline">
									Project Two
								</a>
								.
							</p>

							<p className="mt-4">
								When I'm not coding, you'll find me hiking the trails around my
								city, playing the guitar, or experimenting with new recipes. I
								also run a small{" "}
								<a href="#" className="text-pink-600 underline">
									tech meetup
								</a>{" "}
								in my community.
							</p>

							<p className="mt-4">
								Thanks for stopping by! Here's a joke for you: Why don't
								programmers like nature? It has too many bugs.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
