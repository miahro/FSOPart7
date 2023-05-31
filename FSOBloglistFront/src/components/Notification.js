import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  // const style = {
  //   border: 'solid',
  //   padding: 10,
  //   borderWidth: 1,
  //   marginBottom: 5,
  // }

  console.log(notification)

  if (!notification) return null
  else if (notification[1]) {
    return <div className="success">{notification[0]}</div>
  } else {
    return <div className="error">{notification[0]}</div>
  }
}

export default Notification
