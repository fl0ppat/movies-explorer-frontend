import { Link } from "react-router-dom";
import profileImg from "../../images/icon__profile.svg";

import "./UserLink.css";

function UserLink() {
  return (
    <Link className='User-link' to='/profile'>
      Аккаунт
      <img className='User-link__pic' src={profileImg} alt='Изображение профиля' />
    </Link>
  );
}

export default UserLink;
