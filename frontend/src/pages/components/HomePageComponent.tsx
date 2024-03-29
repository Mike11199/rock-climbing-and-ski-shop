import ProductCarouselComponent from "../../components/ProductCarouselComponent";
import CategoryCardComponent from "../../components/CategoryCardComponent";
import { Row, Container } from "react-bootstrap";
import Skier_Vector from "../../images/skier_vector.png";
import Slope_Background from "../../images/ski_slope_6.png";
import Snowfall from "react-snowfall";
import CloudVector from "../../images/cloud_vector3.png";
import Tree from "../../images/tree.png";
import Ski_Chair from "../../images/ski_chair.png";
import Plant_Tree from "../../images/plant_tree.jpg";
import Land_Sat from "../../images/landsat.png";
import NASA_Logo from "../../images/nasa.png";
import { useEffect, useState } from "react";
import CountUpComponent from "./CountUpComponent";
import axios from "axios";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { BestsellerItem } from "types";

const HomePageComponent = ({ categories, getBestsellers }) => {
  const [mainCategories, setMainCategories] = useState<any>([]);
  const [bestSellers, setBestsellers] = useState<BestsellerItem[]>([]); // Use [] to initialize an empty array
  const [error, setError] = useState<any>("");

  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 7);

  const [startDate, setStartDate] = useState(currentDate);

  console.log("Test retrieving Bestsellers from api v1 - express.js docker container - MongoDB database.");
  console.log(bestSellers);

  // api v2 test
  const testNewAPI = async () => {
    try {
      const { data } = await axios.get("/apiv2/APIStatus");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  testNewAPI();

  // api v2 test - 2
  const testNewAPI2 = async () => {
    try {
      const { data } = await axios.get("/apiv2/products");
      console.log("Test retrieving a product from api v2 .NET app docker container - RDS PostgreSQL database. ");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  testNewAPI2();

  useEffect(() => {
    getBestsellers()
      .then((data) => {
        setBestsellers(data);
      })
      .catch((er) => {
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        );
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        );
      });

    if (Array.isArray(categories)) {
      setMainCategories((cat) =>
        categories.filter((item) => !item.name.includes("/"))
      );
    }

    getSnowCoverData();
  }, [categories, getBestsellers]);

  useEffect(() => {
    getSnowCoverData();
  }, [startDate]);

  // https://nasa-gibs.github.io/gibs-api-docs/access-basics/#map-projections
  // https://nasa-gibs.github.io/gibs-api-docs/access-basics/#service-endpoints
  const getSnowCoverData = async () => {
    const url2 =
      "https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/";
    const format = ".jpg";
    const level = 4;
    const row = 2;
    const col = 3;

    //console.log(startDate);
    const formattedSTARTDate = startDate.toISOString().split("T")[0];
    //console.log(formattedSTARTDate);
    const requestUrl = `${url2}${formattedSTARTDate}/250m/${level}/${row}/${col}.jpg`;
    //console.log(requestUrl);

    try {
      const response = await axios.get(requestUrl, {
        responseType: "arraybuffer",
      });
      const imageBlob = new Blob([response.data], { type: format });
      const imageUrl = URL.createObjectURL(imageBlob);

      // Create an image element and set its source to the generated URL
      const img = document.createElement("img");
      img.src = imageUrl;
      img.classList.add("nasa_sat_image"); // Replace 'your-class-name' with your desired class name

      // Append the image element to a container on your website
      const container = document.getElementById("nasa_image_container");

      // Check if the container already contains an image
      const existingImage = container?.querySelector("img");
      if (existingImage) {
        // If an image element already exists in the container, remove it
        container?.removeChild(existingImage);
      }

      // Append the image element to the container
      container?.appendChild(img);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="banner_box_container">
        <div className="ski_banner_box">
          <Snowfall />
          <img
            className="skier_banner_slope"
            alt="skier_slope"
            src={Slope_Background}
          />
          <img className="tree" alt="tree" src={Tree} />
          <img className="ski_chair" alt="ski_chair" src={Ski_Chair} />
          <img className="ski_chair2" alt="ski_chair2" src={Ski_Chair} />
          <img className="ski_chair3" alt="ski_chair2" src={Ski_Chair} />
          <img className="ski_chair4" alt="ski_chair2" src={Ski_Chair} />
          <img className="ski_chair5" alt="ski_chair2" src={Ski_Chair} />
          <img
            className="cloud_banner_vector"
            alt="cloud_vector"
            src={CloudVector}
          />
          <img
            className="cloud_banner_vector2"
            alt="cloud_vector"
            src={CloudVector}
          />
          <img
            className="cloud_banner_vector3"
            alt="cloud_vector"
            src={CloudVector}
          />
          <img
            className="cloud_banner_vector4"
            alt="cloud_vector"
            src={CloudVector}
          />
          <img
            className="cloud_banner_vector5"
            alt="cloud_vector"
            src={CloudVector}
          />
          <img
            className="cloud_banner_vector6"
            alt="cloud_vector"
            src={CloudVector}
          />
          <img
            className="cloud_banner_vector7"
            alt="cloud_vector"
            src={CloudVector}
          />
          <img
            className="cloud_banner_vector8"
            alt="cloud_vector"
            src={CloudVector}
          />
          <img
            className="cloud_banner_vector9"
            alt="cloud_vector"
            src={CloudVector}
          />
          <img
            className="cloud_banner_vector10"
            alt="cloud_vector"
            src={CloudVector}
          />
          <img
            className="cloud_banner_vector11"
            alt="cloud_vector"
            src={CloudVector}
          />
          <img
            className="cloud_banner_vector12"
            alt="cloud_vector"
            src={CloudVector}
          />
          <img
            className="cloud_banner_vector13"
            alt="cloud_vector"
            src={CloudVector}
          />
          <img
            className="skier_banner_vector"
            alt="skier_vector"
            src={Skier_Vector}
          />
        </div>
      </div>

      <ProductCarouselComponent bestSellers={bestSellers} />
      <Container>
        <Row xs={1} md={2} className="g-4 mt-4">
          {mainCategories.map((category, idx) => (
            <>
              <div className="cardComponentGrid">
                <CategoryCardComponent
                  key={`cardComponentGrid_${idx}`}
                  category={category}
                  idx={idx}
                />
              </div>
            </>
          ))}
        </Row>
        {error}
      </Container>
      <Container>
        <div className="climate_pledge_div">
          <img className="plant_tree" alt="skier_vector" src={Plant_Tree} />
          <div className="climate_text_div">
            <p className="climate_text_paragraph">
              <span style={{ fontWeight: "bold" }}>Giving Back: &nbsp;</span>
              Actions speak louder than words. To offset our carbon footprint
              and protect the environment, we pledge to plant one tree for every
              dollar our store sells. The average tree offsets 48 pounds of CO2
              a year.
            </p>
            <div>
              <CountUpComponent />
            </div>
          </div>
        </div>
      </Container>

      <Container>
        {/* https://nasa-gibs.github.io/gibs-api-docs/access-basics/#map-projections */}
        <h3 className="snow_section_title">Snow Cover Satellite Image</h3>
        <div className="nasa_snow_cover">
          <div className="sat_images">
            <img className="nasa_logo" alt="nasa_logo" src={NASA_Logo}></img>
            <img className="land_sat" alt="land_sat" src={Land_Sat}></img>
          </div>
          <div id="nasa_image_container"></div>
          <div className="date_and_text_nasa">
            <DayPicker
              mode="single"
              selected={startDate}
              onSelect={setStartDate as any}
            />
            <p className="sat_text">
              <ul>
                <li>
                  See latest image for snow cover from the MODIS (Moderate
                  Resolution Imaging SpectroRadiometer) sensor - on the NASA
                  Terra (EOS AM-1) satellite.
                  <li style={{ marginTop: "20px" }}>
                    Terra was launched in 1999 and orbits in a sun-synchronous
                    orbit, meaning it passes over any given point on the earth
                    at the same local solar time. This gives consistent lighting
                    for land imagery. The satellite also boasts a 250m spatial
                    resolution, meaning that one pixel represents an area of 250
                    x 250 meters on the ground. This is about 14 suburban sized
                    houses wide.
                  </li>
                </li>
              </ul>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomePageComponent;
