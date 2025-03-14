import React from "react";

type ArtifactType = {
  title: string;
  url?: string;
  description?: string;
};

type TalkType = {
  title: string;
  url?: string;
  description?: string;
};

type ProjectType = {
  title: string;
  url?: string;
  description?: string;
};

const Projects = ({
  setShowProjects,
}: {
  setShowProjects: (showProjects: boolean) => void;
}) => {
  const achievements: ArtifactType[] = [
    {
      title: "Winning First prize in [MLH Hackathon]",
      url: "https://mlh.io/",
    },
    {
      title: "Solving a real world problem",
      url: "#",
    },
    {
      title: "Publishing a research paper",
      url: "#",
    },
    {
      title: "Maintaining an Open Source Repo",
    },
  ];

  const talks: TalkType[] = [
    {
      title: "Optimizing API Response Time w/ Message Queues",
    },
    {
      title: "How to Scale: Load Balancer",
    },
  ];

  const projects: ProjectType[] = [
    {
      title: "Shipping PWA as Android App",
    },
    {
      title: "SRTify: Generating multilingual subtitles from any video",
    },
    {
      title: "iQuiz: Instantly create and enjoy quizzes using AI",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => setShowProjects(false)}
        className="text-lg text-gray-400 pt-4 flex items-center gap-2"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </span>
        <span>Go back</span>
      </button>

      <div className="w-full pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold">Artifacts</h1>
          <p className="text-lg text-gray-400 my-2">
            Here are things I am proud of.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl mb-4">Achievements</h2>
          <ul className="space-y-3">
            {achievements.map((achievement, index) => (
              <li key={index} className="text-lg">
                {achievement.url ? (
                  <>
                    {achievement.title
                      .split(/(\[[^\]]+\]\([^)]*\))/)
                      .map((part, i) => {
                        if (part.match(/\[([^\]]+)\]\(([^)]*)\)/)) {
                          const [_, text, link] =
                            part.match(/\[([^\]]+)\]\(([^)]*)\)/) || [];
                          return (
                            <a
                              key={i}
                              href={link || achievement.url}
                              className="underline"
                              style={{ textDecorationColor: "#24d05a" }}
                            >
                              {text}
                            </a>
                          );
                        }
                        return part;
                      })}
                  </>
                ) : (
                  achievement.title
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mb-4">Talks</h2>
          <ul className="space-y-3">
            {talks.map((talk, index) => (
              <li key={index} className="text-lg">
                {talk.title}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl mb-4">Projects</h2>
          <ul className="space-y-3">
            {projects.map((project, index) => (
              <li key={index} className="text-lg">
                {project.title}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Projects;
