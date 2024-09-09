import Slider from 'react-slick';

function ReactSlider({ settings, children }) {
  var defaultSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const updatedSettings = { ...defaultSettings, ...settings };

  return (
    <div className="slider-container sm:container sm:mx-auto">
      <Slider {...updatedSettings}>{children}</Slider>
    </div>
  );
}

export default ReactSlider;