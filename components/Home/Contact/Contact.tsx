import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="py-10 md:py-16">
      <div className="w-full px-5 sm:w-[90%] sm:px-0 md:w-[80%] lg:w-[70%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
        {/* Text Context */}
        <div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-200">
            Schedule a call with me to see if I can help
          </h1>
          <p className="text-gray-400 mt-6 text-base sm:text-lg">
            Reach out to me today and let&apos;s discuss how I can help you
            achieve your goals.
          </p>

          {/* info */}
          <div className="mt-7">
            <div className="flex items-center space-x-3 mb-4">
              <BiPhone className="w-7 h-7 shrink-0 sm:w-9 sm:h-9 text-cyan-300" />
              <p className="min-w-0 break-words text-base sm:text-xl font-bold text-gray-400">9818009299</p>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <BiEnvelope className="w-7 h-7 shrink-0 sm:w-9 sm:h-9 text-cyan-300" />
              <p className="min-w-0 break-words text-base sm:text-xl font-bold text-gray-400">
                shreeyashofficialpc1@gmail.com
              </p>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <BiMap className="w-7 h-7 shrink-0 sm:w-9 sm:h-9 text-cyan-300" />
              <p className="min-w-0 break-words text-base sm:text-xl font-bold text-gray-400">
                Bhimsengola, Purano Baneshwor, KTM
              </p>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center mt-8 space-x-3">
            <a
              href="https://www.facebook.com/shreeyash.shrestha.7/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-blue-950/60 rounded-full flex items-center justify-center cursor-pointer flex-col hover:bg-blue-800 transition-all duration-300"
            >
              <FaFacebook className="text-white w-6 h-6" />
            </a>
            <a
              href="https://github.com/ShreeyashShrestha"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-blue-950/60 rounded-full flex items-center justify-center cursor-pointer flex-col hover:bg-black transition-all duration-300"
            >
              <FaGithub className="text-white w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/shreeyash-shrestha-169a67367/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-blue-950/60 rounded-full flex items-center justify-center cursor-pointer flex-col hover:bg-blue-700 transition-all duration-300"
            >
              <FaLinkedin className="text-white w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/shreeyashshresthaa/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-blue-950/60 rounded-full flex items-center justify-center cursor-pointer flex-col hover:bg-pink-500 transition-all duration-300"
            >
              <FaInstagram className="text-white w-6 h-6" />
            </a>
          </div>
        </div>

        {/* form */}
        <div
          data-aos="zoom-in"
          data-aos-anchor-placement="top-center"
          data-aos-delay="0"
          className="md:p-10 p-5 bg-[#131332] rounded-lg"
        >
          <input
            type="text"
            placeholder="Name"
            className="px-4 py-3.5 bg-[#363659] text-white outline-none rounded-md w-full placeholder:text-white/70"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="px-4 py-3.5 mt-4 sm:mt-6 bg-[#363659] text-white outline-none rounded-md w-full placeholder:text-white/70"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            className="px-4 py-3.5 mt-4 sm:mt-6 bg-[#363659] text-white outline-none rounded-md w-full placeholder:text-white/70"
          />
          <textarea
            placeholder="Your Message"
            className="px-4 py-3.5 mt-4 sm:mt-6 bg-[#363659] text-white outline-none rounded-md w-full placeholder:text-white/70 h-[10rem]"
          ></textarea>
          <button className="mt-6 w-full sm:mt-8 sm:w-auto px-6 sm:px-12 py-4 bg-blue-950 hover:bg-blue-900 transition-all duration-300 cursor-pointer text-white rounded-full">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
