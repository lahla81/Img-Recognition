import React from 'react';
import Particles from 'react-particles-js';

const ParticlesBg = () => {
    return (
        <Particles  className="particles w-100"
            params={{
                particles: {
                    number: {
                        value:40,
                        density:{
                            enable: true,
                            value_area:130
                        }
                    }
                }
            }}
        />
    )
}
export default ParticlesBg;
