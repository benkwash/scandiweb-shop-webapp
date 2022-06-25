import { Component } from 'react';

import './ImageCarousal.css';

class ImageCarousal extends Component {
   render() {
      const { gallery } = this.props;
      const image = gallery[0];
      return (
         <div className="carousal-img-container">
            <img className="carousal-img" src={image} alt="current-carousal" />
            <div className="img-overlay"></div>
         </div>
      );
   }
}

export default ImageCarousal;
