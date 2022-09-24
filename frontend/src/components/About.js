import React, { Fragment }from 'react'

//Forma clasica que aprendi, hay otra forma con fragment
/*export const About = () => {
    return (
        <div className='contenedor1'>
            <h1>About</h1>
            <p>lorem300</p>
        </div>
    );
};*/
export const About = () => {
    return (
        <Fragment>
            <h1>About</h1>
            <p>Dolore esse ipsum officia aliquip consequat ipsum ut irure laboris ex. Velit adipisicing proident dolore fugiat ex. Non quis irure magna quis id anim laboris incididunt cupidatat. Est id nostrud commodo ut occaecat ex velit tempor ea sit occaecat. Incididunt velit eu deserunt quis Lorem qui id. Consectetur laborum adipisicing laboris sit occaecat anim ad proident mollit pariatur dolore do.</p>
        </Fragment>
    );
};
//export default About;