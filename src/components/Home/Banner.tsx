import bannerImage from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="bg-custom-bg  bg-contain bg-no-repeat min-h-[700px] w-full flex items-center justify-center">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 items-center py-[180px] ">
          <div className="relative">
            <div className="space-y-4 text-white">
              <h1 className="text-6xl font-bold leading-normal">
                Glamping, Because Therapy is Expensive
              </h1>
              <p className="mt-4 text-lg ">
                Mauris non consec tetur risus. Donec at sagittis lacus, nec
                sceleris en sapien. Donec dolor orci, aliquam sit amet nibh
                amatug.
              </p>
              <button className="mt-6 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div>
            <img
              src={bannerImage}
              alt="Banner"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
