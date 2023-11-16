import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minutes: 25,
      seconds: 25 * 60,
      isTimerStarted: false,
      setTime: 25,
    }
  }

  startOrStopTimer = () => {
    const {isTimerStarted} = this.state
    this.setState(prevState => ({isTimerStarted: !prevState.isTimerStarted}))
    if (!isTimerStarted) {
      this.timerId = setInterval(this.tick, 1000)
    }
  }

  tick = () => {
    const {isTimerStarted, seconds} = this.state
    if (isTimerStarted) {
      if (seconds === 0) {
        clearInterval(this.timerId)
        this.setState(prevState => ({
          isTimerStarted: !prevState.isTimerStarted,
        }))
      } else {
        this.setState(prevState => ({
          seconds: prevState.seconds - 1,
        }))
      }
    } else {
      clearInterval(this.timerId)
    }
  }

  resetEvething = () => {
    clearInterval(this.timerId)
    this.setState(prevState => ({
      minutes: 25,
      seconds: 25 * 60 || 60,
      isTimerStarted: false,
      setTime: 25,
    }))
  }

  decrementTimer = () => {
    const {isTimerStarted, minutes, setTime} = this.state
    if (!isTimerStarted && minutes > 0 && setTime > 0) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
        setTime: prevState.setTime - 1,
        seconds: (prevState.setTime - 1) * 60,
      }))
    }
  }

  incrementTimer = () => {
    const {isTimerStarted} = this.state
    if (!isTimerStarted) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        setTime: prevState.setTime + 1,
        seconds: (prevState.setTime + 1) * 60 || 60,
      }))
    }
  }

  render() {
    const {minutes, seconds, isTimerStarted, setTime} = this.state

    const iconImage = isTimerStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '

    const iconText = isTimerStarted ? 'Pause' : 'Start'
    const altText = isTimerStarted ? 'pause icon' : ' play icon'
    const statusText = isTimerStarted ? 'Running' : 'Paused'
    const modifiedSeconds = seconds % 60
    const modifiedMinutes = Math.floor(seconds / 60)
    const stringifiedMinutes =
      modifiedMinutes > 9 ? modifiedMinutes : `0${modifiedMinutes}`
    const stringfiedSeconds =
      modifiedSeconds > 9 ? modifiedSeconds : `0${modifiedSeconds}`

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="time-container">
          <div className="countdown-container">
            <div className="timer">
              <h1 className="countdown">
                {stringifiedMinutes}:{stringfiedSeconds}
              </h1>
              <p className="status">{statusText}</p>
            </div>
          </div>
          <div className="controller-container">
            <div className="button-container">
              <button
                className="button"
                type="button"
                onClick={this.startOrStopTimer}
              >
                <img src={iconImage} alt={altText} className="image" />
                <p className="button-text">{iconText}</p>
              </button>
              <button
                className="button"
                type="button"
                onClick={this.resetEvething}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                  alt="reset icon"
                  className="image"
                />
                <p className="button-text">Reset</p>
              </button>
            </div>
            <div className="limit-controller">
              <p className="limit">Set Timer Limit</p>
              <div className="increment-container">
                <button
                  className="set-limit"
                  type="button"
                  onClick={this.decrementTimer}
                >
                  -
                </button>
                <p className="minutes">{setTime}</p>
                <button
                  className="set-limit"
                  type="button"
                  onClick={this.incrementTimer}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
