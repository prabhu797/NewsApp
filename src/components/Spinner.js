import React from 'react'
import PropTypes from 'prop-types'
import LoadingLight from '../Loading-Light.gif'
import LoadingDark from '../Loading-Dark.gif'

const Spinner = (props) => {

    return (
      <div className='text-center' style={{marginTop: '90px'}}>
        <img src={props.mode? LoadingDark : LoadingLight} alt="loading..." />
      </div>
    )
}

Spinner.defaultProps = {
  mode: false,
}

Spinner.propTypes = {
  mode: PropTypes.bool.isRequired,
}
export default Spinner