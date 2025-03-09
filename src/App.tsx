import { useState, useEffect } from "react";
import heroImage from "../public/khushal.jpg";

type BioType = "short" | "long";
type LinkType = {
  name: string;
  url: string;
  color: string;
};

function App(): JSX.Element {
  const [activeBio, setActiveBio] = useState<BioType>("short");
  const colors = ["#24d05a", "#eb4888", "#10a2f5", "#e9bc3f"];

  const initialLinks: LinkType[] = [
    {
      name: "email",
      url: "mailto://reach@khushal.live",
      color: getRandomColor(),
    },
    {
      name: "blog",
      url: "https://logan1x.hashnode.dev/",
      color: getRandomColor(),
    },
    {
      name: "github",
      url: "https://github.com/logan1x",
      color: getRandomColor(),
    },
    {
      name: "twitter",
      url: "https://twitter.com/herkuch",
      color: getRandomColor(),
    },
    {
      name: "bluesky",
      url: "https://bsky.app/profile/logan1x.bsky.social",
      color: getRandomColor(),
    },
    {
      name: "linkedin",
      url: "https://linkedin.com/in/logan1x",
      color: getRandomColor(),
    },
  ];

  const [links, setLinks] = useState<LinkType[]>(initialLinks);

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLinks((prevLinks) =>
        prevLinks.map((link) => ({
          ...link,
          color: getRandomColor(),
        }))
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center min-h-screen px-4 sm:px-6">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-6 pt-20">
        <div className="text-center md:text-left">
          <h1 className="text-3xl">Khushal Sharma</h1>
          <h2 className="text-xl text-gray-400">Software Engineer in India</h2>
        </div>
        <div className="rounded-full w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 overflow-hidden">
          <img
            src={heroImage}
            alt="Profile picture"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-lg mt-8">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            className="hover:opacity-90 transition-opacity"
            style={{
              textDecorationColor: link.color,
              textDecoration: "underline",
              textDecorationThickness: 2,
            }}
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="mt-8 w-full">
        <div className="flex justify-center space-x-2">
          {(["short", "long"] as BioType[]).map((bioType) => (
            <button
              key={bioType}
              onClick={() => setActiveBio(bioType)}
              className={`px-4 py-1 rounded-full border-2 capitalize ${
                activeBio === bioType
                  ? "border-pink-500 text-pink-500"
                  : "border-gray-400 text-gray-400"
              }`}
            >
              {bioType}
            </button>
          ))}
        </div>

        <div className="text-xl mt-4 ">
          {activeBio === "short" ? (
            <div className="space-y-3 mb-4">
              <p>
                Hi there! My name is Khushal. I'm a Software Engineer at{" "}
                <a
                  href="https://strandls.com/"
                  style={{
                    textDecorationColor: getRandomColor(),
                    textDecoration: "underline",
                  }}
                >
                  StrandLS
                </a>
                . I enjoy building side projects, running, learning and talking
                about new technologies.
              </p>
              <p>
                You should{" "}
                <a
                  href="https://logan1x.github.io"
                  style={{
                    textDecorationColor: getRandomColor(),
                    textDecoration: "underline",
                  }}
                >
                  check out my projects
                </a>
                ,{" "}
                <a
                  href="https://logan1x.hashnode.dev/"
                  style={{
                    textDecorationColor: getRandomColor(),
                    textDecoration: "underline",
                  }}
                >
                  read my blog
                </a>{" "}
                or{" "}
                <a
                  href="https://www.youtube.com/watch?v=Biak99FOcto&list=PLTDKeEQ2HNZQRlDl3JKfc4VD1yykKSXv8"
                  style={{
                    textDecorationColor: getRandomColor(),
                    textDecoration: "underline",
                  }}
                >
                  watch my talks!
                </a>{" "}
              </p>
            </div>
          ) : (
            <div className="space-y-3 mb-4">
              <p>
                Well hello there! My name is Khushal Sharma. I'm a frontend
                focused fullstack developer with experience in React, Node.js,
                and Python. Currently, I work at{" "}
                <a
                  href="https://strandls.com/"
                  style={{
                    textDecorationColor: getRandomColor(),
                    textDecoration: "underline",
                  }}
                >
                  Strand Life Sciences
                </a>
                , where I build scalable applications.
              </p>
              <p>
                I love teaching and helping people become better coders. In my
                spare time, you will see me posting my runs on{" "}
                <a
                  href="https://www.strava.com/athletes/111238961"
                  style={{
                    textDecorationColor: getRandomColor(),
                    textDecoration: "underline",
                  }}
                >
                  strava
                </a>
                , clicking{" "}
                <a
                  href="https://unsplash.com/@logan1x"
                  style={{
                    textDecorationColor: getRandomColor(),
                    textDecoration: "underline",
                  }}
                >
                  pictures
                </a>{" "}
                or traveling to remote towns of India.
              </p>
              <p>
                I also give{" "}
                <a
                  href="https://www.youtube.com/watch?v=Biak99FOcto&list=PLTDKeEQ2HNZQRlDl3JKfc4VD1yykKSXv8"
                  style={{
                    textDecorationColor: getRandomColor(),
                    textDecoration: "underline",
                  }}
                >
                  tiny talks
                </a>{" "}
                on local/online meetups. If you would like to invite me as
                speaker, send me an email at{" "}
                <a
                  href="mailto://reach@khushal.live"
                  style={{
                    textDecorationColor: getRandomColor(),
                    textDecoration: "underline",
                  }}
                >
                  reach@khushal.live
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
