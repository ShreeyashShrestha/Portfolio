import CircularCarousel from "../CircularCarousel";

const items = [
  {
    src: "/Images/p1.jpg",
    alt: "Mist drifting through a valley",
    title: "Brand Identity for Startups",
    subtitle: "Branding, UI/UX",
  },
  {
    src: "/Images/p2.jpg",
    alt: "A studio portrait",
    title: "Portrait",
    subtitle: "Studio",
  },
  {
    src: "/Images/p3.jpg",
    alt: "Glass towers from street level",
    title: "Towers",
    subtitle: "Architecture",
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
