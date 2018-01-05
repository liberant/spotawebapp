import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DrawerHeader } from '../../components/Drawer';
import { setDialogIsOpen } from '../../store/dialogs/actions';

DrawerHeader.propTypes = {
  auth: PropTypes.object
};

var mapStateToProps = function mapStateToProps(state) {
  var auth = state.auth,
      theme = state.theme,
      locale = state.locale,
      dialogs = state.dialogs;


  return {
    auth: auth,
    theme: theme,
    locale: locale,
    dialogs: dialogs
  };
};

export default connect(mapStateToProps, { setDialogIsOpen: setDialogIsOpen })(DrawerHeader);