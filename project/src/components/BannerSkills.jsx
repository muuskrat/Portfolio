import React from "react";
import {
  MouseParallaxContainer,
  MouseParallaxChild
} from "react-parallax-mouse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faFileCode,
  faTerminal,
  faLaptopCode
} from "@fortawesome/free-solid-svg-icons";
import {
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faNodeJs,
  faJava,
  faPython
} from "@fortawesome/free-brands-svg-icons";

const skills = [
  { name: "C", icon: faTerminal },
  { name: "C++", icon: faTerminal },
  { name: "Java", icon: faJava },
  { name: "Python", icon: faPython },
  { name: "JS", icon: faJs },
  { name: "HTML", icon: faHtml5 },
  { name: "CSS", icon: faCss3Alt },
  { name: "React", icon: faReact },
  { name: "Node.js", icon: faNodeJs }
];

export default function BannerSkills() {
  return (
    <div
      style={{
        height: "200px",
        width: "100%",
        background: "#01011A",
        color: "#fff",
        overflow: "hidden",
        marginBottom: "2rem"
      }}
    >
      <MouseParallaxContainer
        className="parallax"
        containerStyle={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: `repeat(${skills.length}, 1fr)`,
          alignItems: "center",
          justifyItems: "center"
        }}
        globalFactorX={0.3}
        globalFactorY={0.3}
        resetOnLeave
      >
        <MouseParallaxChild
          factorX={0.6}
          factorY={0.1}
          style={{
            background:
              "url(https://images.unsplash.com/photo-1607082352118-afe66a37c41d?auto=format&fit=crop&w=1200&q=80)",
            backgroundSize: "cover",
            position: "absolute",
            width: "100%",
            height: "100%",
            filter: "blur(6px) brightness(0.5)",
            zIndex: 0
          }}
        />

        {skills.map((skill, index) => (
          <MouseParallaxChild
            key={skill.name}
            factorX={0.6 + (index % 3) * 0.2}
            factorY={0.5}
            style={{
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              color: "#ffffff"
            }}
          >
            <FontAwesomeIcon icon={skill.icon} size="2x" />
            <div style={{ marginTop: "8px", fontSize: "0.9rem" }}>
              {skill.name}
            </div>
          </MouseParallaxChild>
        ))}
      </MouseParallaxContainer>
    </div>
  );
}
