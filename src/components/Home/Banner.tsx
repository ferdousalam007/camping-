

const Banner = () => {
  return (
    <div className="bg-custom-bg  bg-cover bg-no-repeat min-h-[800px] w-full flex items-center justify-center">
      <div className="container">
        <div className="w-full md:w-3/4 lg:w-1/2 items-center py-[180px] ">
          <div className="relative">
            <div className="space-y-4 text-white px-3">
              <h3 className="text-2xl font-bold leading-none text-[#ff8851] bg-slate-50 rounded inline-block p-2">
                Camping ShopCamping Shop
              </h3>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-normal md:leading-normal lg:leading-normal ">
                Camping, Healty Trip For Every Day Life
              </h1>
              <p className="mt-4 text-base md:text-lg ">
                Experience the perfect blend of luxury and nature with our
                glamping adventures, designed to rejuvenate your mind and body.
                Escape the everyday and embrace wellness in the heart of the
                great outdoors.
              </p>
              <button className="mt-6 px-6 py-3 bg-[#ff8851] text-white rounded-full shadow-lg hover:bg-[#181c20] transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
