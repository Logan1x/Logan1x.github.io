import { useState, useMemo, useLayoutEffect } from "react";
import { projects } from "./data/projects";

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

import { Link } from "react-router-dom";

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(4);
  const [colorizedLinks, setColorizedLinks] = useState<{
    achievements: ArtifactType[];
    talks: TalkType[];
    projects: ProjectType[];
  }>({ achievements: [], talks: [], projects: [] });
  const initialAchievements: ArtifactType[] = useMemo(
    () => [
      {
        title: "Shipping an android app with [10k+ installs]",
        links: [
          {
            text: "10k+ installs",
            link: "https://play.google.com/store/apps/details?id=com.mobisys.android.ibp",
          },
        ],
      },
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

  const initialProjects: ProjectType[] = useMemo(() => projects, []);

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

  const loadMoreProjects = () => {
    setVisibleProjects((prev) => prev + 4);
  };

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
                className="underline hover:text-gray-400"
                target="_blank"
                style={{
                  textDecorationColor: color,
                  textDecorationLine: "underline",
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
    <div className="max-w-6xl mx-auto mb-4 relative">
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
      <Link
        to="/"
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
      </Link>

      <div className="w-full pt-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl">Artifacts</h1>
          <p className="text-lg text-gray-400 my-2">
            Here are things I am proud of.
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border-2 border-[#eeeeec]">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="space-y-8">
              <section className="mb-8">
                <h2 className="text-2xl mb-4 flex items-center gap-2">
                  Achievements
                </h2>
                <ul className="space-y-3">
                  {colorizedLinks.achievements.map((achievement, index) => (
                    <li key={index} className="flex">
                      <span className="mr-2 text-gray-500">-</span>
                      <div className="text-lg">
                        {renderTitleWithLinks(
                          achievement.title,
                          achievement.links
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl mb-4 flex items-center gap-2">Talks</h2>
                <ul className="space-y-3">
                  {colorizedLinks.talks.map((talk, index) => (
                    <li key={index} className="flex">
                      <span className="mr-2 text-gray-500">-</span>
                      <div className="text-lg">
                        {renderTitleWithLinks(talk.title, talk.links)}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section className="lg:h-full lg:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
              <h2 className="text-2xl mb-4">Projects</h2>
              <ul className="space-y-3 pb-4">
                {colorizedLinks.projects
                  .slice(0, visibleProjects)
                  .map((project, index) => (
                    <li key={index} className="flex">
                      <span className="mr-2 text-gray-500">-</span>
                      <div className="text-lg">
                        {renderTitleWithLinks(project.title, project.links)}
                      </div>
                    </li>
                  ))}
              </ul>
              {visibleProjects < colorizedLinks.projects.length && (
                <button
                  onClick={loadMoreProjects}
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-200 cursor-pointer"
                  style={{
                    textDecorationColor: getRandomColor(),
                    textDecorationLine: "underline",
                    textDecorationThickness: 2,
                  }}
                >
                  Load More
                </button>
              )}
            </section>
          </div>

          <p className="text-sm text-center text-gray-400 mt-8">
            For more projects and talks, head over to my{" "}
            <a
              href="https://github.com/logan1x"
              target="_blank"
              className="underline hover:text-white transition-colors"
              style={{
                textDecorationColor: getRandomColor(),
                textDecorationLine: "underline",
              }}
            >
              github
            </a>{" "}
            or{" "}
            <a
              href="https://www.youtube.com/watch?v=Biak99FOcto&list=PLTDKeEQ2HNZQRlDl3JKfc4VD1yykKSXv8"
              target="_blank"
              className="underline hover:text-white transition-colors"
              style={{
                textDecorationColor: getRandomColor(),
                textDecorationLine: "underline",
              }}
            >
              youtube
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
