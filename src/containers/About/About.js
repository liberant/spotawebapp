import React, {Component} from 'react'
import FlatButton from 'material-ui/FlatButton'
import { injectIntl, intlShape } from 'react-intl'
import { GitHubIcon } from '../../components/Icons'
import Activity from '../../containers/Activity'
import ReactMarkdown from 'react-markdown'
import Scrollbar from '../../components/Scrollbar/Scrollbar'
import README from './README.md'

require('github-markdown-css')

class About extends Component {
  // Sorry for using setState here but I have to remove 'marked' from the dependencies
  // because of a vulnerability issue
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentWillMount () {
    fetch(README)
    .then(response => response.text())
    .then(text => {
      this.setState({text: text})
    })
  }

  render () {
    const { intl } = this.props

    return (
      <Activity
        iconElementRight={
          <FlatButton
            style={{marginTop: 4}}
            href='https://bitbucket.org/novenpw/spotawebapp'
            target='_blank'
            rel='noopener'
            secondary
            icon={<GitHubIcon />}
          />
        }
        title={intl.formatMessage({id: 'about'})}>

        <Scrollbar>
          <div style={{backgroundColor: 'white', padding: 5}}>
            <ReactMarkdown
              className='markdown-body'
              source={this.state.text}
          />
          </div>
        </Scrollbar>

      </Activity>
    )
  }
}

About.propTypes = {
  intl: intlShape.isRequired
}

export default injectIntl(About)
