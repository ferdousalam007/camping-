const Banner = () => {
  return (
    <div className="container ">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl">
            Welcome to the <span className="text-blue-600">Online Shop</span>
          </h1>
          <p className="text-lg text-gray-600 md:text-xl">
            We are a team of professional Shopify experts. We have been
            providing Shopify development services for over 10 years.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
