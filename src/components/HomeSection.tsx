import React from "react";
import Typography from "@material-ui/core/Typography";
import { Element } from "react-scroll";
import Container from "@material-ui/core/Container";

interface HomeSectionProps {
  name?: string;
}

const HomeSection = ({ name }: HomeSectionProps) => {
  return (
    <>
      {name ? <Element name={name} /> : null}
      <Container
        data-aos="zoom-in"
        data-aos-delay="100"
        data-aos-duration="1500"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
        }}
      >
        <Typography variant="h4" color="textPrimary">
          Hello World
        </Typography>
      </Container>
    </>
  );
};

export default HomeSection;

// data-aos="fade-left" data-aos-delay="100" data-aos-duration="1500"
