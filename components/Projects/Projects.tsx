import CircularCarousel from "../CircularCarousel";

const items = [
  {
    src: "/Images/Converso.png",
    alt: "converso project",
    title: "Converso SaaS App",
    objectFit: "contain" as const,
    subtitle:
      "Converso is a real-time AI teaching platform. Browse learning companions, create a tutor for a subject and topic, and practice through a voice session with a live transcript. Sign in to track your companions and completed sessions.",
  },
  {
    src: "/Images/MovieFlix.png",
    alt: "Movieflix app",
    title: "MovieFlix",
    objectFit: "contain" as const,
    subtitle:
      "MovieFlix is a movie-browsing web app built with Next.js. Browse movies by category, preview available clips from the movie cards, and open a movie page for its trailer and details.",
  },
  {
    src: "/Images/Note app MERN.png",
    alt: "Note app MERN",
    title: "Note App",
    objectFit: "contain" as const,
    subtitle:
      "NoteApp is a full-stack note-taking app built with React and Vite on the frontend and Express, MongoDB, and Node.js on the backend. Create, browse, edit, and delete notes from a responsive interface.",
  },
];

const Projects = () => {
  return (
    <>
      <div className="pt-10 pb-10">
        <h1 className="text-center text-2xl md:text-4xl xl:text-5xl font-bold text-white">
          A small selection of recent <br />{" "}
          <span className="text-cyan-300">projects</span>
        </h1>
        <div style={{ width: "100%", height: "700px", position: "relative" }}>
          <CircularCarousel
            items={items}
            preset="panorama"
            intro="rise"
            cardWidth={420}
            aspectRatio={1.1}
            speed={14}
            captions
            gap={25}
            tilt={0}
            curve={0}
            perspective={1800}
            autoplay="drift"
            interval={3}
            direction="left"
            momentum={0.6}
            snap
            pauseOnHover
            focusOnClick
            draggable
            parallax={0.3}
            stretch={0.5}
            fadeColor="#000000"
            depthFade={0.55}
            innerShade={0.6}
            cornerRadius={12}
          />
        </div>
      </div>
    </>
  );
};

export default Projects;
