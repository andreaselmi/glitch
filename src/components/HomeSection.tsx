import React from "react";
import Typography from "@material-ui/core/Typography";
import { Element } from "react-scroll";
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

interface HomeSectionProps {
  name?: string;
}

const HomeSection = ({ name }: HomeSectionProps) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {name ? <Element name={name} /> : null}
      <Container
        data-aos={mobile ? "zoom-in" : "fade-left"}
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
