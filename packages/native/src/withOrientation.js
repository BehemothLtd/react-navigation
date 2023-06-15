import * as React from 'react';
import { Dimensions } from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';

export const isOrientationLandscape = ({ width, height }) => width > height;

export default function (WrappedComponent) {
  class withOrientation extends React.Component {
    constructor() {
      super();

      const isLandscape = isOrientationLandscape(Dimensions.get('window'));
      this.state = { isLandscape, eventListener: null };
    }

    componentDidMount() {
      const eventListener = Dimensions.addEventListener('change', this.handleOrientationChange);
      setState({ eventListener });
    }

    componentWillUnmount() {
      try {
        if (this.state.eventListener) {
          this.state.eventListener.remove();
        }
      } catch (e) {
        console.log("Error happen when remove event listener", e);
      }
  
    }

    handleOrientationChange = ({ window }) => {
      const isLandscape = isOrientationLandscape(window);
      this.setState({ isLandscape });
    };

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  return hoistNonReactStatic(withOrientation, WrappedComponent);
}
