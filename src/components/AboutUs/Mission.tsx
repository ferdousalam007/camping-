import aboutImg from "../../assets/aboutUs.jpg"

const Mission = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="pr-5">
          <div>
            <span className="text-2xl text-[#ff8851] font-bold">
              About Our Company
            </span>
            <h2 className="text-4xl text-[#032e42] font-bold">
              Make Your Dream Come <br />
              True & Grow With Us
            </h2>
            <p className="mt-4">
              At Campers Shop, every adventure begins with a dream. Whether
              you're a novice or a seasoned explorer, we provide top-quality
              gear to turn your outdoor dreams into reality. Join us as we
              innovate and grow, delivering the best in outdoor equipment and
              expertise.
            </p>
          </div>
          <div>
            <h2 className="text-2xl text-[#032e42] font-bold my-5">
              Who Are We?
            </h2>
            <p className="mt-4">
              Since 2005, Campers Shop has offered top camping brands like Jack
              Wolfskin, The North Face, and Black Diamond. We're committed to
              providing quality gear and expert guidance for every adventure.
              Join us and create unforgettable memories.
            </p>
          </div>
          <div>
            <h2 className="text-2xl text-[#032e42] font-bold my-5">
              The Mission & Values of the Company
            </h2>
            <p className="mt-4">
              At Campers Shop, our mission is to fuel your adventure with
              high-quality camping gear that combines functionality, durability,
              and style. We're dedicated to enhancing your outdoor experience.
            </p>
            <p className="mt-4">
              Our values stem from a deep love for nature, a commitment to
              sustainability, and a passion for customer satisfaction. We aim to
              be your trusted companion on every camping journey, ensuring
              you're well-equipped and inspired to explore the great outdoors.
            </p>
          </div>
        </div>
        <div className="w-full pl-8 ">
          <img className="w-full   " src={aboutImg} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Mission