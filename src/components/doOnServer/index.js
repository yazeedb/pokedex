import { lifecycle } from 'recompose';
import isBrowser from '/helpers/isBrowser';

export default fn => lifecycle({
  componentWillMount() {
    if (!isBrowser()) {
      fn(this.props);
    }
  }
});
