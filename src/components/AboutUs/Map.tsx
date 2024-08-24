const Map = () => {
  return (
    <div className="pr-5">
     
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14709.910925608301!2d89.54032675!3d22.821808299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1722003557283!5m2!1sen!2sbd"
        width="100%"
        height="500"
        style={{ border: 0 }}
        // allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default Map;
