import { useState, useMemo, useLayoutEffect } from "react";

const colors = ["#24d05a", "#eb4888", "#10a2f5", "#e9bc3f"];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

type LinkItem = {
  text: string;
  link: string;
  color?: string;
};

type ArtifactType = {
  title: string;
  links?: LinkItem[];
};

type TalkType = {
  title: string;
  links?: LinkItem[];
};

type ProjectType = {
  title: string;
  links?: LinkItem[];
};

const Artifacts = ({
  setShowArtifacts,
}: {
  setShowArtifacts: (showArtifacts: boolean) => void;
}) => {
  const [colorizedLinks, setColorizedLinks] = useState<{
    achievements: ArtifactType[];
    talks: TalkType[];
    projects: ProjectType[];
  }>({ achievements: [], talks: [], projects: [] });
  const initialAchievements: ArtifactType[] = useMemo(
    () => [
      {
        title: "Winning First prize in [MLH Hackathon]",
        links: [
          {
            text: "MLH Hackathon",
            link: "https://devpost.com/software/retricia",
          },
        ],
      },
      {
        title: "Solving a [real world problem]",
        links: [
          {
            text: "real world problem",
            link: "https://logan1x.hashnode.dev/solving-a-real-world-problem",
          },
        ],
      },
      {
        title: "Publishing a [research paper]",
        links: [
          {
            text: "research paper",
            link: "https://www.microbiologyresearch.org/content/journal/jgv/10.1099/jgv.0.001802",
          },
        ],
      },
      {
        title: "Maintaining an [Open-Source Repo]",
        links: [
          {
            text: "Open-Source Repo",
            link: "https://github.com/Logan1x/Python-Scripts",
          },
        ],
      },
    ],
    []
  );

  const initialTalks: TalkType[] = useMemo(
    () => [
      {
        title: "Optimizing API Response Time w/ [Message Queues]",
        links: [
          {
            text: "Message Queues",
            link: "https://youtu.be/3DGeL_ujf6U?si=eWZpor7HzoIk5HVU",
          },
        ],
      },
      {
        title: "How to Scale: [Load Balancer]",
        links: [
          {
            text: "Load Balancer",
            link: "https://youtu.be/asiwWv8RNXQ?si=KfApD-APNc3nN_su",
          },
        ],
      },
      {
        title: "Shipping [PWA as Android App]",
        links: [
          {
            text: "PWA as Android App",
            link: "https://www.youtube.com/watch?v=d2hhAlmB0Wg",
          },
        ],
      },
    ],
    []
  );

  const initialProjects: ProjectType[] = useMemo(
    () => [
      {
        title: "[SRTify]: Generating multilingual subtitles from any video",
        links: [{ text: "SRTify", link: "https://github.com/Logan1x/SRTify" }],
      },
      {
        title: "[iQuiz]: Instantly create and enjoy quizzes using AI",
        links: [{ text: "iQuiz", link: "https://iquiz-ai.vercel.app/" }],
      },
    ],
    []
  );

  useLayoutEffect(() => {
    const colorizeLinks = () => {
      const colorizedAchievements = initialAchievements.map((item) => ({
        ...item,
        links: item.links?.map((link) => ({
          ...link,
          color: getRandomColor(),
        })),
      }));

      const colorizedTalks = initialTalks.map((item) => ({
        ...item,
        links: item.links?.map((link) => ({
          ...link,
          color: getRandomColor(),
        })),
      }));

      const colorizedProjects = initialProjects.map((item) => ({
        ...item,
        links: item.links?.map((link) => ({
          ...link,
          color: getRandomColor(),
        })),
      }));

      setColorizedLinks({
        achievements: colorizedAchievements,
        talks: colorizedTalks,
        projects: colorizedProjects,
      });
    };

    colorizeLinks();

    const intervalId = setInterval(colorizeLinks, 5000);

    return () => clearInterval(intervalId);
  }, [initialAchievements, initialTalks, initialProjects]);

  const renderTitleWithLinks = (title: string, links?: LinkItem[]) => {
    if (!links || links.length === 0) return title;

    let processedTitle = title;
    links.forEach((linkItem) => {
      const linkColor = getRandomColor(); // Use assigned color or default
      processedTitle = processedTitle.replace(
        `[${linkItem.text}]`,
        `<a href="${linkItem.link}" target="_blank" class="underline" style="text-decoration-color: ${linkColor}">${linkItem.text}</a>`
      );
    });

    const parts = processedTitle.split(/(<a.*?<\/a>)/);
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith("<a")) {
            const hrefMatch = part.match(/href="([^"]+)"/);
            const textMatch = part.match(/>([^<]+)</);
            const colorMatch = part.match(/text-decoration-color: ([^"]+)"/);
            const href = hrefMatch ? hrefMatch[1] : "#";
            const text = textMatch ? textMatch[1] : "";
            const color = colorMatch ? colorMatch[1] : "#24d05a";

            return (
              <a
                key={i}
                href={href}
                target="_blank"
                style={{
                  textDecorationColor: color,
                  textDecoration: "underline",
                  textDecorationThickness: 2,
                }}
              >
                {text}
              </a>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </>
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => setShowArtifacts(false)}
        className="text-lg text-gray-400 pt-4 flex items-center gap-2 cursor-pointer"
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
          <h1 className="text-3xl ">Artifacts</h1>
          <p className="text-lg text-gray-400 my-2">
            Here are things I am proud of.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl  mb-4">Achievements</h2>
          <ul className="space-y-3">
            {colorizedLinks.achievements.map((achievement, index) => (
              <li key={index} className="flex">
                <span className="mr-2">-</span>
                <div className="text-lg">
                  {renderTitleWithLinks(achievement.title, achievement.links)}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl  mb-4">Talks</h2>
          <ul className="space-y-3">
            {colorizedLinks.talks.map((talk, index) => (
              <li key={index} className="flex">
                <span className="mr-2">-</span>
                <div className="text-lg">
                  {renderTitleWithLinks(talk.title, talk.links)}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl  mb-4">Projects</h2>
          <ul className="space-y-3">
            {colorizedLinks.projects.map((project, index) => (
              <li key={index} className="flex">
                <span className="mr-2">-</span>
                <div className="text-lg">
                  {renderTitleWithLinks(project.title, project.links)}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-sm text-center text-gray-400">
          For more projects and talks, head over to my{" "}
          <a
            href="https://github.com/logan1x"
            target="_blank"
            style={{
              textDecorationColor: getRandomColor(),
              textDecoration: "underline",
            }}
          >
            github
          </a>{" "}
          or{" "}
          <a
            href="https://www.youtube.com/watch?v=Biak99FOcto&list=PLTDKeEQ2HNZQRlDl3JKfc4VD1yykKSXv8"
            target="_blank"
            style={{
              textDecorationColor: getRandomColor(),
              textDecoration: "underline",
            }}
          >
            youtube
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Artifacts;
