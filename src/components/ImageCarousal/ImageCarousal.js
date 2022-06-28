import { Component } from 'react';

import './ImageCarousal.css';

import arrowLeft from '../../assets/icons/c-left.svg';
import arrowRight from '../../assets/icons/c-right.svg';

class ImageCarousal extends Component {
   constructor(props) {
      super(props);

      this.state = {
         selectedImg: 0
      };
   }

   moveImg = (isLeft) => {
      let imgIndex;
      const { selectedImg } = this.state;
      if (isLeft) {
         imgIndex =
            selectedImg === 0 ? this.props.gallery.length - 1 : selectedImg - 1;
      } else {
         imgIndex =
            selectedImg < this.props.gallery.length - 1 ? selectedImg + 1 : 0;
      }

      this.setState(() => ({
         selectedImg: imgIndex
      }));
   };

   render() {
      const { selectedImg } = this.state;
      return (
         <div className="carousal-img-container">
            <img
               className="carousal-img  element-transition show"
               src={this.props.gallery[selectedImg]}
               alt="current-carousal"
            />
            <div className="img-overlay"></div>
            <div className="arrow-group">
               <img
                  className="arrow-left-icon cursor-pointer hover-effect"
                  src={arrowLeft}
                  alt="arrow left icon"
                  onClick={() => this.moveImg(true)}
               />
               <img
                  className="arrow-right-icon  cursor-pointer hover-effect"
                  src={arrowRight}
                  alt="arrow right icon"
                  onClick={() => this.moveImg(false)}
               />
            </div>
         </div>
      );
   }
}

export default ImageCarousal;
