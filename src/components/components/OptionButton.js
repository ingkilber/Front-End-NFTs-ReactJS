import { Link } from 'react-router-dom';

const OptionButton = ({icon, title, link, row = true}) => {
  return (
    <div className={row ? "col-md-2 col-sm-4 col-6 mb-3" : ""}>
      <Link className="icon-box style-2 rounded" to={link}>
        <i className={icon}></i>
        <span>{title}</span>
      </Link>
    </div>
  )
}

export default OptionButton