import React from "react";
import Typography from "@material-ui/core/Typography";
import { Element } from "react-scroll";

interface HomeSectionProps {
  name?: string;
}

const HomeSection = ({ name }: HomeSectionProps) => {
  return (
    <>
      {name ? <Element name={name} /> : null}
      <div
        data-aos="fade-left"
        data-aos-delay="100"
        data-aos-duration="1500"
        style={{
          minHeight: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" color="textPrimary">
          Hello World
        </Typography>
      </div>
    </>
  );
};

export default HomeSection;
