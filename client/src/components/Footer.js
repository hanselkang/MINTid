import React from "react";
import styled from "styled-components";

const MainFooter = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  height: 5vh;
  border-top: 0.5vh solid;
  margin-top: 2vh;
  top: 50%;
`;

// This component is perhaps a bit redundant


const Footer = () => {
  return (
    <MainFooter>
     
    </MainFooter>
  );
};

export default Footer;




//  <Developer>
//         <DevProfile href="https://github.com/hanselkang">
//           <DevImage src="https://avatars.githubusercontent.com/u/43307207?v=4" />
//           {/* <p>Hansel</p> */}
//         </DevProfile>
//       </Developer>
//       <Developer>
//         <DevProfile href="https://github.com/Johnstoncam">
//           <DevImage src="https://avatars.githubusercontent.com/u/72796586?v=4" />
//           {/* <p>Cam</p> */}
//         </DevProfile>
//       </Developer>
//       <Developer>
//         <DevProfile href="https://github.com/J-Rozas">
//           <DevImage src="https://avatars.githubusercontent.com/u/67562547?v=4" />
//           {/* <p>Emilio</p> */}
//         </DevProfile>
//       </Developer>