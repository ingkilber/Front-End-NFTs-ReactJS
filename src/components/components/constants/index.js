export const MODES = {
  CREATION: 1,
  EDIT: 2
}

export const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  adaptiveHeight: 300,
  responsive: [
    {
      breakpoint: 1900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
      }
    }
  ]
};

  export const carouselCollection = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  }
  
  export const carouselCollectionSingle = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: 300,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  }
  
  export const carouselNew = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: 300,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  }

export const customSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#2e333c' : 'transparent'
  }),
  input: (provided, state) => ({
    ...provided,
    color: 'white'
  }),
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: '#212428',
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: '#333',
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: 'white',
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'transparent',
    border: 'solid 1px rgba(255, 255, 255, 0.1)',
    color: 'white'
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'
    const color = 'white'
    return { ...provided, opacity, transition, color };
  },
}