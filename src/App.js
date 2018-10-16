import React, { Component } from "react";
import zupage from "zupage";
import { Container, Image, Label } from "semantic-ui-react";
import MediaBody from "react-media-body";
import Slider from "react-slick";
import "./App.css";

class App extends Component {
  state = {
    body: "",
    creator: {},
    colorPalette: [],
    date: "",
    images: [],
    paragraphs: [],
    title: ""
  };

  async componentDidMount() {
    const postResponse = await zupage.getCurrentPost();

    const date = new Date(
      postResponse.published_time * 1000
    ).toLocaleDateString("en-US");

    this.setState({
      body: postResponse.body,
      creator: postResponse.creator,
      colorPalette: postResponse.page.color_palette,
      date: date,
      images: postResponse.images,
      title: postResponse.title,
      slideIndex: 0
    });
  }

  renderTop = () => {
    const { creator, date, images, title } = this.state;

    let topClass = "Top";

    if (images.length === 0) {
      topClass = "Top-Inverse";
    }

    var settings = {
      autoplay: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className={topClass}>
        <Slider className="Slider" {...settings}>
          {this.renderImages()}
        </Slider>
        <div className="Title">{title}</div>
        <div className="Creator">
          <Label style={{ backgroundColor: "white" }} as="a">
            <Image avatar spaced="right" src={creator.profile_image_url} />
            {creator.name}
          </Label>
          <div className="Date">{date}</div>
        </div>
      </div>
    );
  };

  renderImages = () => {
    const { images } = this.state;

    return images.map((image, i) => {
      return (
        <div key={i} className="SliderItem">
          <Image src={image.url} />
        </div>
      );
    });
  };

  render() {
    const { body, images } = this.state;

    return (
      <div className="Template">
        {this.renderTop()}
        <Container text className="Text-Container">
          <MediaBody className="Body-Text">{body}</MediaBody>
        </Container>
      </div>
    );
  }
}

export default App;
