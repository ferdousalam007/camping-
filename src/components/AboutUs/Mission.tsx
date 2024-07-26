import aboutImg from "../../assets/aboutUs.jpg"

const Mission = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="pr-5">
          <div>
            <span>About Our Company</span>
            <h2 className="text-4xl text-[#032e42] font-bold">
              Make Your Dream Come <br />
              True & Grow With Us
            </h2>
            <p className="mt-4">
              At Campers Shop, every adventure starts with a dream. Whether
              you're new to camping or an experienced explorer, we provide
              high-quality camping gear and accessories to turn your outdoor
              dreams into reality. Grow with us as we innovate and expand,
              offering the best in outdoor equipment and expertise.
            </p>
          </div>
          <div>
            <h2 className="text-2xl text-[#032e42] font-bold my-5">Who Are We?</h2>
            <p className="mt-4">
              Since 2005, Campers Shop has been a trusted name in camping and
              outdoor adventure retail. We offer top brands like Jack Wolfskin,
              The North Face, and Black Diamond to cater to both novice campers
              and seasoned adventurers. Our commitment to quality and innovation
              ensures you have the best gear for every journey. Led by
              passionate outdoor enthusiasts, we strive to be your trusted
              partner in every adventure. Join us and create unforgettable
              memories with the best gear and guidance.
            </p>
          </div>
          <div>
            <h2 className="text-2xl text-[#032e42] font-bold my-5">
              The Mission & Values of the Company
            </h2>
            <p className="mt-4">
              At Campers Shop, our mission is to ignite the spirit of adventure
              in every camping enthusiast by providing high-quality, essential,
              and fun camping gear. We are dedicated to enhancing the outdoor
              experience by offering a diverse range of products that combine
              functionality, durability, and style.
            </p>
            <p className="mt-4">
              Our values are rooted in a deep appreciation for nature, a
              commitment to sustainability, and a passion for customer
              satisfaction. We strive to be a trusted companion on every camping
              journey, ensuring that our customers are well-equipped and
              inspired to explore the great outdoors.
            </p>
          </div>
        </div>
        <div className="w-full pl-8 ">
          <img className="w-full h-full object-cover " src={aboutImg} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Mission