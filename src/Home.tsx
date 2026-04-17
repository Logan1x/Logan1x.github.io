import { useState, useMemo, useLayoutEffect } from "react";
import FaceTracker from "./components/FaceTracker";
import FloatingArtifact from "./components/FloatingArtifact";

type BioType = "short" | "long";
type LinkType = {
  name: string;
  url: string;
  color: string;
};

import { Link } from "react-router-dom";
import Cal from "@calcom/embed-react";

const colors = ["#24d05a", "#eb4888", "#10a2f5", "#e9bc3f"];

function getRandomColor(excludeColor?: string) {
  const availableColors = excludeColor
    ? colors.filter((c) => c !== excludeColor)
    : colors;
  return availableColors[Math.floor(Math.random() * availableColors.length)];
}

function Home() {
  const [activeBio, setActiveBio] = useState<BioType>("short");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [circleColor, setCircleColor] = useState(colors[0]);
  const [showAnimation] = useState(false);

  const initialLinks: LinkType[] = useMemo(
    () => [
      {
        name: "email",
        url: "sharmakhushal78@gmail.com",
        color: getRandomColor(),
      },
      {
        name: "calender",
        url: "",
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
        name: "linkedin",
        url: "https://linkedin.com/in/logan1x",
        color: getRandomColor(),
      },
      {
        name: "resume",
        url: "https://pub-40cc422904f1445784b2e67bb8a2cb64.r2.dev/Resume_Khushal_5YOE.pdf",
        color: getRandomColor(),
      },
    ],
    []
  );

  const [links, setLinks] = useState<LinkType[]>(initialLinks);
  useLayoutEffect(() => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => ({
        ...link,
        color: getRandomColor(),
      }))
    );

    const intervalId = setInterval(() => {
      setLinks((prevLinks) =>
        prevLinks.map((link) => ({
          ...link,
          color: getRandomColor(link.color),
        }))
      );
      setCircleColor((prev) => getRandomColor(prev));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="max-w-4xl mx-auto min-h-screen flex items-center relative">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-50"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(75, 85, 99, 0.08) 79px, rgba(75, 85, 99, 0.08) 80px, transparent 80px, transparent 159px, rgba(75, 85, 99, 0.08) 159px, rgba(75, 85, 99, 0.08) 160px),
            repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(75, 85, 99, 0.08) 79px, rgba(75, 85, 99, 0.08) 80px, transparent 80px, transparent 159px, rgba(75, 85, 99, 0.08) 159px, rgba(75, 85, 99, 0.08) 160px),
            radial-gradient(circle at 80px 80px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
            radial-gradient(circle at 160px 160px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
          `,
          backgroundSize: "160px 160px, 160px 160px, 160px 160px, 160px 160px",
        }}
      />
      <FloatingArtifact />
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 w-full relative z-10 border-2 border-[#eeeeec]">
        <div className="flex flex-col items-center justify-between w-full gap-4">
          <FaceTracker />
          <div className="text-center">
            <h1 className="text-3xl tracking-tight leading-tight font-medium mb-2">
              Khushal Sharma
            </h1>
            <h2 className="text-lg text-gray-500 tracking-tight leading-snug">
              <span className="block">Turning ideas into websites.</span>
              <span className="block">
                Ready for <span className="text-gray-900">yours</span>.
              </span>
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-lg mt-8">
          {links.map((link) =>
            link.name === "email" || link.name === "calender" ? (
              <p
                key={link.name}
                className="hover:opacity-90 transition-opacity cursor-pointer hover:text-gray-400"
                style={{
                  textDecorationColor: link.color,
                  textDecorationLine: "underline",
                  textDecorationThickness: 2,
                }}
                onClick={() => {
                  if (link.name === "email") {
                    navigator.clipboard.writeText(link.url);
                    alert("Copied to clipboard!!");
                  } else if (link.name === "calender") {
                    setIsModalOpen(true);
                  }
                }}
              >
                {link.name}
              </p>
            ) : (
              <a
                key={link.name}
                href={link.url}
                target={"_blank"}
                className="hover:opacity-90 transition-opacity hover:text-gray-400"
                style={{
                  textDecorationColor: link.color,
                  textDecorationLine: "underline",
                  textDecorationThickness: 2,
                }}
              >
                {link.name}
              </a>
            )
          )}
        </div>

        <div className="mt-8 w-full">
          <div className="flex justify-center gap-2 flex-wrap ">
            {(["short", "long"] as BioType[]).map((bioType) => (
              <button
                key={bioType}
                onClick={() => setActiveBio(bioType)}
                className={`px-4 py-1 rounded-full border-2 capitalize cursor-pointer ${activeBio === bioType
                  ? "border-pink-500 text-pink-500"
                  : "border-gray-400 text-gray-400 hover:border-pink-500 hover:text-pink-500 transition-colors duration-300"
                  }`}
              >
                {bioType}
              </button>
            ))}
            <Link
              to="/artifacts"
              className="px-4 py-1 rounded-full border-2 capitalize border-gray-400 text-gray-400 hover:border-pink-500 hover:text-pink-500 transition-colors"
            >
              Projects
            </Link>
          </div>

          <div className="text-xl mt-4 ">
            {activeBio === "short" ? (
              <div className="space-y-3 mb-4">
                <p>
                  Hi there! My name is Khushal. I'm a Full Stack Software
                  Engineer at{" "}
                  <a
                    className="hover:text-gray-400"
                    href="https://strandls.com/"
                    target="_blank"
                    style={{
                      textDecorationColor: getRandomColor(),
                      textDecorationLine: "underline",
                    }}
                  >
                    StrandLS
                  </a>
                  . I enjoy building side projects, running, learning and
                  talking about new technologies.
                </p>
                <p>
                  You should{" "}
                  <a
                    className="hover:text-gray-400"
                    href="https://logan1x.hashnode.dev/"
                    target="_blank"
                    style={{
                      textDecorationColor: getRandomColor(),
                      textDecorationLine: "underline",
                    }}
                  >
                    read my blog
                  </a>{" "}
                  ,{" "}
                  <a
                    className="hover:text-gray-400"
                    target="_blank"
                    href="https://www.youtube.com/watch?v=Biak99FOcto&list=PLTDKeEQ2HNZQRlDl3JKfc4VD1yykKSXv8"
                    style={{
                      textDecorationColor: getRandomColor(),
                      textDecorationLine: "underline",
                    }}
                  >
                    watch my talks
                  </a>{" "}
                  or{" "}
                  <span
                    style={{
                      textDecorationColor: getRandomColor(),
                      textDecorationLine: "underline",
                    }}
                    className="cursor-pointer"
                  >
                    <Link
                      to="/artifacts"
                      className="hover:text-gray-400"
                      style={{
                        textDecorationColor: getRandomColor(),
                        textDecorationLine: "underline",
                      }}
                    >
                      check out things I am proud of!
                    </Link>
                  </span>
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
                    className="hover:text-gray-400"
                    target="_blank"
                    style={{
                      textDecorationColor: getRandomColor(),
                      textDecorationLine: "underline",
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
                    target="_blank"
                    className="hover:text-gray-400"
                    style={{
                      textDecorationColor: getRandomColor(),
                      textDecorationLine: "underline",
                    }}
                  >
                    strava
                  </a>
                  , clicking{" "}
                  <a
                    href="https://unsplash.com/@logan1x"
                    target="_blank"
                    className="hover:text-gray-400"
                    style={{
                      textDecorationColor: getRandomColor(),
                      textDecorationLine: "underline",
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
                    className="hover:text-gray-400"
                    target="_blank"
                    style={{
                      textDecorationColor: getRandomColor(),
                      textDecorationLine: "underline",
                    }}
                  >
                    tiny talks
                  </a>{" "}
                  on local/online meetups. If you would like to invite me as
                  speaker, send me an email at{" "}
                  <span
                    className="cursor-pointer hover:text-gray-400"
                    style={{
                      textDecorationColor: getRandomColor(),
                      textDecorationLine: "underline",
                    }}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "sharmakhushal78@gmail.com"
                      );
                      alert("Copied to clipboard!!");
                    }}
                  >
                    sharmakhushal78@gmail.com
                  </span>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAnimation && (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center overflow-hidden z-40">
          <svg
            width="100%"
            height="40"
            viewBox="0 0 2000 40"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            <path stroke="#3f3f46" strokeWidth="2" d="M 0 20 L 2000 20" />
            <circle className="line-traveler" r="8" fill={circleColor} />
          </svg>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0  bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="rounded-lg w-full h-full md:max-h-[90vh] overflow-auto">
            <div className="absolute top-0 right-0 flex justify-end p-4 z-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div className="p-4 mt-8">
              <Cal calLink="khushal/15min" config={{ theme: "light" }}></Cal>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
